import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { checkGithubLink } from '../../../utils/utils';
import { createProject } from '../../../utils/endpoints';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalNuevoProyecto(props) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [githubproj, setGithubproj] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setTitulo('');
        setDescripcion('');
        setGithubproj('');
        setErrors({});
    }, [props.open]);

    const validate = () => {
        const newErrors = {};
        if (titulo.length > 25) {
            newErrors.titulo = 'El título no puede tener más de 25 caracteres';
        }
        if (descripcion.length < 100) {
            newErrors.descripcion = 'La descripción debe tener al menos 100 caracteres';
        }
        if (!checkGithubLink(githubproj)) {
            newErrors.githubproj = 'El link de GitHub no es válido';
        }
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const projectData = {
                    titulo,
                    descripcion,
                    githubproj,
                    fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '), // TODO chequear si es necesario
                    creador_id: 666 // TODO cambiar a dinámico
                };
                const response = await createProject(projectData);
                console.log(response);
                if (response.status === 201) {
                    console.log('Proyecto insertado correctamente');
                    props.handleClose();
                } else {
                    console.error('Error al insertar el proyecto');
                }
            } catch (error) {
                console.error('Error al insertar el proyecto', error);
            }
        }
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6" component="h2">
                            Añadir nuevo proyecto
                        </Typography>
                        <TextField
                            fullWidth
                            label="Título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            margin="normal"
                            required
                            inputProps={{ maxLength: 25 }}
                            error={!!errors.titulo}
                            helperText={errors.titulo}
                        />
                        <TextField
                            fullWidth
                            label="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            margin="normal"
                            multiline
                            rows={4}
                            required
                            error={!!errors.descripcion}
                            helperText={errors.descripcion}
                        />
                        <TextField
                            fullWidth
                            label="Link de GitHub"
                            value={githubproj}
                            onChange={(e) => setGithubproj(e.target.value)}
                            margin="normal"
                            required
                            error={!!errors.githubproj}
                            helperText={errors.githubproj}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Crear Proyecto
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

ModalNuevoProyecto.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
};
