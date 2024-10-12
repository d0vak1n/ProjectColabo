import { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import backgroundImage from '../../assets/loginbackground.jpg';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      ProjectColabo
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Comprobación de campos vacíos
    if (!email || !password) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    //Comprobar patron de email correcto
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const token = response.data.token;
      document.cookie = `token=${token}; path=/`;
      setToken(token)
      navigate('/');
    } catch (error) {
      alert(`Ha habido un error: ${error.response.data}`);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '98vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText={emailError ? 'El email es inválido' : ''}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ maxLength: 30 }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Contraseña olvidada
                </Link>
              </Grid>
              <Grid item>
                <Link component="button" onClick={(event) => { event.preventDefault(); navigate("/register") }} variant="body2">
                  ¿No tienes cuenta? Regístrate
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
