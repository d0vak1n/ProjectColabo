import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material"
import PropTypes from 'prop-types';


export default function UserBadge(props) {
    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={props.menu}
            aria-haspopup="true"
            onClick={props.handle}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    );
}

UserBadge.propTypes = {
    menu: PropTypes.string.isRequired,
    handle: PropTypes.func.isRequired
}