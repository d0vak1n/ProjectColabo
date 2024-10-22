import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './dbconnection';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, linkedin, github } = req.body;

  // Comprobamos si el email ya ha sido registrado
  db.query('SELECT * FROM estudiantes WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al consultar la base de datos');
      return;
    }

    if (results.length > 0) {
      return res.status(409).send('Este email ya ha sido registrado');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO estudiantes SET ?', { email, password: hashedPassword, nombre: firstName, apellido: lastName, github, linkedin }, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Error al insertar el usuario');
        } else {
          console.log(results);
          res.status(201).send('Usuario registrado correctamente');
        }
      });
    }
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  db.query('SELECT * FROM estudiantes WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error al consultar la base de datos');
    }

    if (results.length === 0) {
      return res.status(401).send('Correo y/o contraseña incorrectos');
    }

    const user = results[0];

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Correo y/o contraseña incorrectos');
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET as string);
    res.json({ token });
  });
};

const getUserData = async (req: Request, res: Response): Promise<void> => {
  // Obtén el token del header de la solicitud
  const token = req.headers['authorization'];

    res.status(401).send('Token no proporcionado');
    return;
    return res.status(401).send('Token no proporcionado');
  }

    res.status(401).send('Token inválido');
    return;
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send('Token inválido');
  }

  const extractedToken = tokenParts[1];

  // Verifica el token
  jwt.verify(extractedToken, process.env.SECRET as string, async (err, decoded: any) => {
    if (err) {
      return res.status(401).send('Token inválido');
    }

    // Busca al usuario en la base de datos
    db.query('SELECT * FROM estudiantes WHERE email = ?', [decoded.email], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error al consultar la base de datos');
        res.status(404).send('Usuario no encontrado');
        return;

      if (results.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }

      const user = results[0];

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