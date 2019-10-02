import React from 'react';
import PropTypes from 'prop-types';
import ScoreChip from '../ScoreChip';
import styles from './Scoreboard.module.css';

const Scoreboard = ({ score: { completed, failedAttempts, skipped } }) => {
  return (
    <div className={styles.scoreWrapper}>
      <ScoreChip score={completed} text="Completed" primary />
      <ScoreChip score={failedAttempts} text="Failed" secondary />
      <ScoreChip score={skipped} text="Skipped" />
    </div>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    failedAttempts: PropTypes.number.isRequired,
    skipped: PropTypes.number.isRequired,
  }).isRequired,
};

export default Scoreboard;
