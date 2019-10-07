import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './Game.module.css';
import { Container, Scoreboard, Snippet } from '../components';
import CustomSnackbar from '../components/Snackbar';

const MAX_COMPLETED_SNIPPETS = 10;

const getRandomSnippetKey = keys => keys[Math.floor(Math.random() * keys.length)];

const Game = ({ snippetsFile, onEnd }) => {
  const inputEl = useRef(null);
  const [snippetKeys, setSnippetKeys] = useState(Object.keys(snippetsFile.content));
  const [currentSnippetKey, setCurrentSnippetKey] = useState(null);
  const [currentScore, setCurrentScore] = useState({ completed: 0, failedAttempts: 0, skipped: 0 });
  const [seconds, setSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Submit entered value and adjust score
  const submit = useCallback(() => {
    if (inputEl.current.value !== '') {
      if (inputEl.current.value === snippetsFile.content[currentSnippetKey].prefix) {
        setSnippetKeys(keys => keys.filter(key => key !== currentSnippetKey));
        setCurrentScore(oldScore => ({ ...oldScore, completed: oldScore.completed + 1 }));
        inputEl.current.value = '';
      } else {
        setCurrentScore(oldScore => ({
          ...oldScore,
          failedAttempts: oldScore.failedAttempts + 1,
        }));
      }
    }
  }, [currentSnippetKey, snippetsFile.content]);

  // Skip the current snippet
  const skip = useCallback(() => {
    setSnippetKeys(keys => keys.filter(key => key !== currentSnippetKey));
    setCurrentScore(oldScore => ({ ...oldScore, skipped: oldScore.skipped + 1 }));
    inputEl.current.value = '';
  }, [currentSnippetKey]);

  // Listeners for hitting 'enter' to submit or 'esc' to skip
  useEffect(() => {
    const onSubmit = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        submit();
      }
    };
    const onSkip = event => {
      if (event.keyCode === 27) {
        event.preventDefault();
        skip();
      }
    };
    window.addEventListener('keyup', onSubmit);
    window.addEventListener('keyup', onSkip);
    return () => {
      window.removeEventListener('keyup', onSubmit);
      window.removeEventListener('keyup', onSkip);
    };
  }, [currentSnippetKey, submit, skip]);

  // Handle game time
  useEffect(() => {
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  // Set new snippet when current one is added to usedSnippets
  useEffect(() => {
    if (snippetKeys.length <= 0) {
      setSnippetKeys(Object.keys(snippetsFile.content));
    }
    setCurrentSnippetKey(getRandomSnippetKey(snippetKeys));
  }, [snippetKeys, snippetsFile.content]);

  // End game when the MAX number of completed snippets is reached
  useEffect(() => {
    if (currentScore.completed >= MAX_COMPLETED_SNIPPETS) {
      setGameOver(true);
    }
  }, [currentScore]);

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
        <Snippet snippet={{ [currentSnippetKey]: snippetsFile.content[currentSnippetKey] }} />
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
  snippetsFile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: (props, propName) => {
      Object.values(props[propName]).forEach(value => {
        if (typeof value !== 'object') {
          return new Error('Each property in snippetsFile.content must be an object');
        }
        if (!value.prefix) {
          return new Error('Each object in snippetsFile.content must contain a prefix property');
        }
        if (!value.body) {
          return new Error('Each object in snippetsFile.content must contain a body property');
        }
        return null;
      });
    },
  }).isRequired,
};

export default Game;
