import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const CustomChip = ({ score, text, primary, secondary }) => {
  const classes = useStyles();

  let color = 'default';
  if (primary) {
    color = 'primary';
  } else if (secondary) {
    color = 'secondary';
  }

  return (
    <Chip
      avatar={<Avatar>{`${score}`}</Avatar>}
      label={text}
      color={color}
      className={classes.chip}
    />
  );
};

CustomChip.propTypes = {
  score: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

CustomChip.defaultProps = {
  primary: false,
  secondary: false,
};

export default CustomChip;
