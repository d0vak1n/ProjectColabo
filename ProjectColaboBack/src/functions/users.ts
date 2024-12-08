import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './dbconnection';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { User } from './interface';

dotenv.config();

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, linkedin, github } = req.body;

  console.log(req.body);


  db.query('SELECT * FROM estudiantes WHERE email = ?', [email], async (error: any, results: any) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al consultar la base de datos');
      return;
    }

    const users = results as User[];

    if (users.length > 0) {
      res.status(409).send('Este email ya ha sido registrado');
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO estudiantes SET ?', { email, password: hashedPassword, nombre: firstName, apellido: lastName, github, linkedin }, (error: any, results: any) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error al insertar el usuario');
          return;
        } else {
          console.log(results);
          res.status(201).send('Usuario registrado correctamente');
          return;
        }
      });
    }
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  db.query('SELECT * FROM estudiantes WHERE email = ?', [email], async (error: any, results: any) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al consultar la base de datos');
      return;
    }

    const users = results as User[];

    if (users.length === 0) {
      res.status(401).send('Correo y/o contraseña incorrectos');
      return;
    }

    const user = users[0];

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).send('Correo y/o contraseña incorrectos');
      return;
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET as string);
    res.json({ token });
  });
};

const getUserData = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).send('Token no proporcionado');
    return;
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    res.status(401).send('Token inválido');
    return;
  }

  const extractedToken = tokenParts[1];

  jwt.verify(extractedToken, process.env.SECRET as string, (err: any, decoded: any) => {
    if (err) {
      res.status(401).send('Token inválido');
      return;
    }

    db.query('SELECT * FROM estudiantes WHERE email = ?', [decoded.email], (error: any, results: any) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al consultar la base de datos');
        return;
      }

      const users = results as User[];

      if (users.length === 0) {
        res.status(404).send('Usuario no encontrado');
        return;
      }

      const user = users[0];

      res.json({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        github: user.github,
        linkedin: user.linkedin
      });
    });
  });
};

export { register, login, getUserData };