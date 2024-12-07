import { Box, Grid, Typography } from "@mui/material";
import CardProject from "./CardProject";
import { useEffect, useState } from "react";
import { getProjects } from "../../../utils/endpoints";
import PropTypes from 'prop-types';

export default function MisProyectos(props) {
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        getProjects()
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


    return (
        <>
            <Typography style={{ marginTop: '20px' }} variant='h4'>Mis Proyectos</Typography>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: '20px' }}
            >
                <Grid container columns={{ sm: 12, lg: 10 }} rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }} style={{ marginTop: '20px', width: '100%' }}>
                    {projects.filter(project => project.creador_id === props.currentId).map(project => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={project.id} display='flex' justifyContent='center' >
                            <CardProject title={project.titulo} description={project.descripcion} created_at={project.fecha_creacion} githuburl={project.githubproj} creator_name={project.nombre + " " + project.apellido} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

MisProyectos.propTypes = {
    currentId: PropTypes.number.isRequired
}