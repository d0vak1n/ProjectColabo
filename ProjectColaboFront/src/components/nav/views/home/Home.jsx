import { useState, useEffect } from 'react';
import axios from 'axios';
import CardProject from "../../../content/projects/CardProject";
import TopMenu from "../../TopMenu";
import { Grid } from '@mui/material';

export default function Home() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <TopMenu />
            <Grid container spacing={3}>
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                        <CardProject title={project.titulo} description={project.descripcion} created_at={project.fecha_creacion} githuburl={project.githubproj} creator_name={project.nombre + " " + project.apellido} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}