import { useState } from 'react';
import { TextField, Button, Container, Grid, Link, Typography, Box, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprobación de campos vacíos
    if (!email || !password || !firstName || !lastName || !linkedin || !github) {
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

    // Comprobar longitud de contraseña
    if (password.length > 25) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    // Comprobar si la contraseña contiene al menos un número, una mayuscula, una minuscula y un caracter especial
    const numberRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!numberRegex.test(password) || !uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !specialCharRegex.test(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    // Comprobación de campos vacíos
    if (!email || !password || !firstName || !lastName || !linkedin || !github) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    try {
      const userData = { email, password, firstName, lastName, linkedin, github };
      console.log(userData); // Log the user data
      const response = await axios.post('http://localhost:5000/register', userData);
      console.log(response.data); // Log the response data
      alert('Usuario registrado correctamente');
    } catch (error) {
      alert(`¡Error en el registro! ${error.response.data}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Apellido/s"
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                error={emailError}
                helperText={emailError ? 'El email es inválido' : ''}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Contraseña"
                type="password"
                error={passwordError}
                helperText={passwordError ? 'La contraseña debe tener al menos 8 caracteres, una letra mayuscula y minuscula; un número y un caracter especial \n (!@#$%^&*(),.?":{}|<>)' : ''}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Linkedin profile name"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Github profile name"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel required
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto la política de privacidad y los términos de uso."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component="button" onClick={() => { navigate("/login") }} variant="body2">
                ¿Ya tienes una cuenta? Loguéate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Register;