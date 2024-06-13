const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('./dbconnection');

const users = []; // This should be replaced with a real database in production

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
  res.json({ token });
};

module.exports = { register, login };
