import { ListItemIcon, ListItem, ListItemButton, ListItemText} from "@mui/material"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

ListItemMenu.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    to: PropTypes.string.isRequired,
}

export default function ListItemMenu( {text, icon, to} ) {
    const navigate = useNavigate();
    return (
        <>
            <ListItem key={text} onClick={() => {navigate(to)}} disablePadding>
                <ListItemButton>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        </>
    )
}