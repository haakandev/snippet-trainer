import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import styles from './Game.module.css';
import { Container, Scoreboard, Snippet } from '../components';
import defaultSnippets from '../defaultSnippets';

const snippetKeys = Object.keys(defaultSnippets);
const snippets = defaultSnippets;

const getRandomSnippetKey = () => snippetKeys[Math.floor(Math.random() * snippetKeys.length)];

const Game = () => {
  const inputEl = useRef(null);
  const [currentSnippetKey, setCurrentSnippetKey] = useState(null);
  const [currentScore, setCurrentScore] = useState({ completed: 0, failedAttempts: 0, skipped: 0 });
  const [usedSnippets, setUsedSnippets] = useState([]);
  const [seconds, setSeconds] = useState(0);

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
    interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let nextSnippetKey = getRandomSnippetKey();
    while (usedSnippets.includes(nextSnippetKey)) {
      nextSnippetKey = getRandomSnippetKey();
    }
    setCurrentSnippetKey(nextSnippetKey);
  }, [usedSnippets]);

  const skip = () => {
    setUsedSnippets(k => [...k, currentSnippetKey]);
    setCurrentScore(oldScore => ({ ...oldScore, skipped: oldScore.skipped + 1 }));
  };

  return (
    <Container>
      <Scoreboard score={currentScore} time={seconds} />
      {currentSnippetKey && (
        <Snippet snippet={{ [currentSnippetKey]: snippets[currentSnippetKey] }} />
      )}
      <input className={styles.gameInput} ref={inputEl} type="text" />
      <div className={styles.gameInputGroup}>
        <Button onClick={submit} color="primary" variant="contained">
          Submit
        </Button>
        <Button size="small" onClick={skip} variant="contained">
          Skip
        </Button>
      </div>
    </Container>
  );
};

export default Game;
