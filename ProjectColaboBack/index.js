const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./users');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', users.register);
app.post('/login', users.login);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
