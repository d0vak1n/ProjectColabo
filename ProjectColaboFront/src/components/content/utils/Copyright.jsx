import { Typography } from "@mui/material";

export function Copyright(props) {
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