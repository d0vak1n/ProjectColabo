import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('There was an error registering!', error);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">Register</Button>
        <Button type="button" variant="outlined" color="primary" onClick={() => {navigate("/login")}}>Login</Button>
      </form>
    </Container>
  );
};

export default Register;