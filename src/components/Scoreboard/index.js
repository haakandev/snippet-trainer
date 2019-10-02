import React from 'react';
import PropTypes from 'prop-types';
import ScoreChip from '../ScoreChip';
import styles from './Scoreboard.module.css';

const Scoreboard = ({ score: { completed, failedAttempts, skipped }, time }) => {
  console.log('seconds', time);
  return (
    <div className={styles.scoreWrapper}>
      <div>
        <ScoreChip score={completed} text="Completed" primary />
        <ScoreChip score={failedAttempts} text="Failed" secondary />
        <ScoreChip score={skipped} text="Skipped" />
      </div>
      <h4 style={{ fontVariantNumeric: 'tabular-nums' }}>{`${Math.floor(
        time / 3600
      )}:${`0${Math.floor(time / 60)}`.slice(-2)}:${`0${Math.floor(time % 60)}`.slice(-2)}`}</h4>
    </div>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    failedAttempts: PropTypes.number.isRequired,
    skipped: PropTypes.number.isRequired,
  }).isRequired,
  time: PropTypes.number.isRequired,
};

export default Scoreboard;
