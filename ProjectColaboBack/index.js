const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./src/functions/users');
const projects = require('./src/functions/projects');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', users.register);
app.post('/login', users.login);
app.get('/projects', projects.getProjects);
app.get('/profile', users.getUserData);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
