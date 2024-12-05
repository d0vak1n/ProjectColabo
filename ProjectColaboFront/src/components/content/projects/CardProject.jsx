import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import PropTypes from 'prop-types';
import { Box, Modal } from '@mui/material';

const ReadMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardProject({ title, description, created_at, creator_name, githuburl }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleOpenClick = () => {
    setExpanded(!expanded);
  };

  const shortDescription = description.substring(0, 50);

  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        subheader={formattedDate}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {shortDescription}...
        </Typography>
        <Typography paragraph>
          {creator_name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton href={githuburl} target="_blank" aria-label="github link">
          <GitHubIcon />
        </IconButton>
        <ReadMore
          onClick={handleOpenClick}
          aria-label="show more"
        >
          <ReadMoreIcon />
        </ReadMore>
      </CardActions>
      <Modal
        open={expanded}
        onClose={handleOpenClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Descripcion del proyecto
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}

CardProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  creator_name: PropTypes.string.isRequired,
  githuburl: PropTypes.string.isRequired,
};