import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

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


    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
        console.log({ titulo, descripcion, githubproj });
        props.handleClose();
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
                        />
                        <TextField
                            fullWidth
                            label="Link de GitHub"
                            value={githubproj}
                            onChange={(e) => setGithubproj(e.target.value)}
                            margin="normal"
                            required
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
