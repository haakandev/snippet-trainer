import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './Game.module.css';
import { Container, Scoreboard, Snippet } from '../components';
import defaultSnippets from '../defaultSnippets';
import CustomSnackbar from '../components/Snackbar';

const MAX_COMPLETED_SNIPPETS = 10;

const snippetKeys = Object.keys(defaultSnippets);
const snippets = defaultSnippets;

const getRandomSnippetKey = () => snippetKeys[Math.floor(Math.random() * snippetKeys.length)];

const Game = ({ onEnd }) => {
  const inputEl = useRef(null);
  const [currentSnippetKey, setCurrentSnippetKey] = useState(null);
  const [currentScore, setCurrentScore] = useState({ completed: 0, failedAttempts: 0, skipped: 0 });
  const [usedSnippets, setUsedSnippets] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const submit = useCallback(() => {
    if (inputEl.current.value !== '') {
      if (inputEl.current.value === snippets[currentSnippetKey].prefix) {
        setUsedSnippets(k => [...k, currentSnippetKey]);
        setCurrentScore(oldScore => ({ ...oldScore, completed: oldScore.completed + 1 }));
        inputEl.current.value = '';
      } else {
        setCurrentScore(oldScore => ({
          ...oldScore,
          failedAttempts: oldScore.failedAttempts + 1,
        }));
      }
    }
  }, [currentSnippetKey]);

  useEffect(() => {
    const onSubmit = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        submit();
      }
    };
    window.addEventListener('keyup', onSubmit);
    return () => {
      window.removeEventListener('keyup', onSubmit);
    };
  }, [currentSnippetKey, submit]);

  useEffect(() => {
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    let nextSnippetKey = getRandomSnippetKey();
    while (usedSnippets.includes(nextSnippetKey)) {
      nextSnippetKey = getRandomSnippetKey();
    }
    setCurrentSnippetKey(nextSnippetKey);
  }, [usedSnippets]);

  useEffect(() => {
    const remainingSnippets = snippetKeys.length - usedSnippets.length;
    if (currentScore.completed >= MAX_COMPLETED_SNIPPETS || remainingSnippets <= 0) {
      setGameOver(true);
    }
  }, [currentScore, usedSnippets]);

  const skip = () => {
    setUsedSnippets(k => [...k, currentSnippetKey]);
    setCurrentScore(oldScore => ({ ...oldScore, skipped: oldScore.skipped + 1 }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setGameOver(false);
    onEnd();
  };

  return (
    <Container>
      <Scoreboard score={currentScore} time={seconds} />
      {currentSnippetKey && (
        <Snippet snippet={{ [currentSnippetKey]: snippets[currentSnippetKey] }} />
      )}
      <input className={styles.gameInput} ref={inputEl} type="text" disabled={gameOver} />
      <div className={styles.gameInputGroup}>
        <Button onClick={submit} color="primary" variant="contained" disabled={gameOver}>
          Submit
        </Button>
        <Button size="small" onClick={skip} variant="contained" disabled={gameOver}>
          Skip
        </Button>
      </div>
      <CustomSnackbar
        open={gameOver}
        handleClose={handleCloseSnackbar}
        variant="success"
        message={`You've completed the game in ${`${Math.floor(seconds / 3600)}:${`0${Math.floor(
          seconds / 60
        )}`.slice(-2)}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`}!`}
      />
    </Container>
  );
};

Game.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default Game;
