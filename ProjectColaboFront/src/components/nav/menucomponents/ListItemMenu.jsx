import { ListItemIcon, ListItem, ListItemButton, ListItemText } from "@mui/material"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export default function ListItemMenu({ text, icon, to }) {
    const navigate = useNavigate();
    return (
        <>
            <ListItem key={text} onClick={() => { navigate(to) }} disablePadding>
                <ListItemButton>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        </>
    )
}

ListItemMenu.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
    to: PropTypes.string.isRequired,
}