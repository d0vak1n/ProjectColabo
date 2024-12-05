import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import PropTypes from 'prop-types';

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardProject({ title, description, created_at, creator_name, githuburl }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
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
        <IconButton href={githuburl} target="_blank" aria-label="add to favorites">
          <GitHubIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descripción del proyecto:</Typography>
          {description}
        </CardContent>
      </Collapse>
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