const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('./functions/dbconnection');

const register = async (req, res) => {
  const { email, password, firstName, lastName, linkedin, github  } = req.body;

  // Comprovamos si el email ya ha sido registrado
  db.query('SELECT * FROM estudiantes WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.status(409).send('Este email ya ha sido registrado');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO estudiantes SET ?', {email: email, password: hashedPassword, nombre: firstName, apellido: lastName, github: github, linkdein: linkedin}, (error, results) => {
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

    const token = jwt.sign({ email: user.email }, 'your_jwt_secret');
    res.json({ token });
  });
};

module.exports = { register, login };
