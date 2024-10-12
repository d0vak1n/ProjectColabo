import TopMenu from "../../TopMenu"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Typography } from "@mui/material";

export default function Profile() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')).split('=')[1];
        if (token === null) {
            console.log('Token is null');
            return;
        }
        axios.get('http://localhost:5000/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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

    return (
        <>
            <TopMenu />
            <Typography variant="h1">Perfil</Typography>
            <Typography variant="body1">Nombre: {userData.nombre}</Typography>
            <Typography variant="body1">Apellido: {userData.apellido}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Github: <Link href={"" + userData.github} target="_blank" rel="noopener noreferrer">{userData.github}</Link></Typography>
            <Typography variant="body1">LinkedIn: <Link href={"https://www.linkedin.com/in/" + userData.linkedin} target="_blank" rel="noopener noreferrer">{userData.linkedin}</Link></Typography>
        </>
    )
}