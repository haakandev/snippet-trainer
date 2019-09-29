import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = ({ score: { completed, failedAttempts } }) => {
  return (
    <div>
      Completed: {completed} - Failed: {failedAttempts}
    </div>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    failedAttempts: PropTypes.number.isRequired,
  }).isRequired,
};

export default Scoreboard;
