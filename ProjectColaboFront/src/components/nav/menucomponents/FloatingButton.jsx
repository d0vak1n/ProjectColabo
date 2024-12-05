import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

export default function FloatingButton(props) {
    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Fab color="primary" aria-label="add" onClick={props.onClick}>
                <AddIcon />
            </Fab>
        </Box>
    );
}

FloatingButton.propTypes = {
    onClick: PropTypes.func.isRequired
}