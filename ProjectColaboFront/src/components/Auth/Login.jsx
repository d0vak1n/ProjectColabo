import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.token);
            navigate('/');
        } catch (error) {
            alert('There was an error logging in!', error);
        }
    };

    return (
        <Container>
            <h2>Login</h2>
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
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <Button type="button" variant="outlined" color="primary" onClick={() => {navigate("/register")}}>Register</Button>
            </form>
        </Container>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;
