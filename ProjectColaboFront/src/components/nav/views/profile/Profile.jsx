import TopMenu from "../../TopMenu"
import { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { getProfile } from "../../../../utils/endpoints";
import MisProyectos from "../../../content/projects/MisProyectos";

export default function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).split('=')[1];
        if (token === null) {
            console.log('Token is null');
            return;
        }
        getProfile(token)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió ninguna respuesta
                    console.log(error.request);
                } else {
                    // Algo sucedió en la configuración de la solicitud que provocó un error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }, []);

    if (!userData) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <TopMenu />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    minHeight: '86vh',
                    padding: 3
                }}
            >
                <Card
                    sx={{
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: 3,
                        padding: 3,
                        borderRadius: 2,
                        backgroundColor: 'white',
                    }}
                >
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <Avatar
                                alt={userData.nombre}
                                src={`https://ui-avatars.com/api/?name=${userData.nombre}+${userData.apellido}&background=random`}
                                sx={{ width: 80, height: 80 }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5" fontWeight="bold" textAlign="center">
                                {userData.nombre} {userData.apellido}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" textAlign="center">
                                {userData.email}
                            </Typography>
                        </Grid>
                    </Grid>

                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Información de Contacto
                        </Typography>
                        <Typography variant="body1">
                            <strong>Github:</strong>{' '}
                            <Link href={`https://github.com/${userData.github}`} target="_blank" rel="noopener noreferrer">
                                {userData.github}
                            </Link>
                        </Typography>
                        <Typography variant="body1">
                            <strong>LinkedIn:</strong>{' '}
                            <Link href={`https://www.linkedin.com/in/${userData.linkedin}`} target="_blank" rel="noopener noreferrer">
                                {userData.linkedin}
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
                {userData.id && (
                    <MisProyectos currentId={userData.id} />
                )}
            </Box>

        </>
    )
}