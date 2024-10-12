const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('./dbconnection');
require('dotenv').config()

const register = async (req, res) => {
  const { email, password, firstName, lastName, linkedin, github } = req.body;

  // Comprovamos si el email ya ha sido registrado
  db.query('SELECT * FROM estudiantes WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.status(409).send('Este email ya ha sido registrado');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO estudiantes SET ?', { email: email, password: hashedPassword, nombre: firstName, apellido: lastName, github: github, linkedin: linkedin }, (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
          res.status(201).send('Usuario registrado correctamente');
        }
      });
    }
  });
};

const login = async (req, res) => {
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

    const token = jwt.sign({ email: user.email }, process.env.SECRET);
    res.json({ token });
  });
};

const getUserData = async (req, res) => {
  // Obtén el token del header de la solicitud
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Token no proporcionado');
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send('Token inválido');
  }

  const extractedToken = tokenParts[1];

  // Verifica el token
  jwt.verify(extractedToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Token inválido');
    }

    // Busca al usuario en la base de datos
    db.query('SELECT * FROM estudiantes WHERE email = ?', [decoded.email], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error al consultar la base de datos');
      }

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

module.exports = { register, login, getUserData };
