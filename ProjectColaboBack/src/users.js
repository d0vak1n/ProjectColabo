const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('./dbconnection');

const users = []; // This should be replaced with a real database in production

const register = async (req, res) => {
  const { email, password, firstName, lastName, linkedin, github  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  console.log(users);
  res.status(201).send('User registered');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ email: user.email }, 'your_jwt_secret');
  res.json({ token });
};

module.exports = { register, login };
