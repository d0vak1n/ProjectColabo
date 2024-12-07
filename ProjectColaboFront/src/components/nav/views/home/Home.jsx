import { useState, useEffect } from 'react';
import CardProject from "../../../content/projects/CardProject";
import TopMenu from "../../TopMenu";
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import FloatingButton from '../../menucomponents/FloatingButton';
import ModalNuevoProyecto from '../../../content/projects/ModalNuevoProyecto';
import { getProjects } from '../../../../utils/endpoints';

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [openModalNuevoProyecto, setOpenModalNuevoProyecto] = useState(false);

    const handleOpen = () => setOpenModalNuevoProyecto(true);
    const handleClose = () => setOpenModalNuevoProyecto(false);

    useEffect(() => {
        getProjects()
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [openModalNuevoProyecto]);

    const abrirModalNuevoProyecto = () => {
        handleOpen();
    }

    return (
        <>
            <TopMenu />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: '20px' }}
            >
                <Grid container columns={{ sm: 12, lg: 10 }} rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 2 }} style={{ marginTop: '20px', width: '90%' }}>
                    {projects.map(project => (
                        <Grid xs={12} sm={6} md={4} lg={2} key={project.id} display='flex' justifyContent='center' >
                            <CardProject title={project.titulo} description={project.descripcion} created_at={project.fecha_creacion} githuburl={project.githubproj} creator_name={project.nombre + " " + project.apellido} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <ModalNuevoProyecto open={openModalNuevoProyecto} handleClose={handleClose} />
            <FloatingButton onClick={abrirModalNuevoProyecto} />
        </>
    )
}