import React, { useEffect, useRef, useState } from 'react';
import { Container, Scoreboard, Snippet } from '../components';
import defaultSnippets from '../defaultSnippets';

const snippetKeys = Object.keys(defaultSnippets);
const snippets = defaultSnippets;

const getRandomSnippetKey = () => snippetKeys[Math.floor(Math.random() * snippetKeys.length)];

const Game = () => {
  const inputEl = useRef(null);
  const [currentSnippetKey, setCurrentSnippetKey] = useState(null);
  const [currentScore, setCurrentScore] = useState({ completed: 0, failedAttempts: 0 });
  const [usedSnippets, setUsedSnippets] = useState([]);

  useEffect(() => {
    const onSubmit = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
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
    };
    window.addEventListener('keyup', onSubmit);
    return () => {
      window.removeEventListener('keyup', onSubmit);
    };
  }, [currentSnippetKey]);

  useEffect(() => {
    let nextSnippetKey = getRandomSnippetKey();
    while (usedSnippets.includes(nextSnippetKey)) {
      nextSnippetKey = getRandomSnippetKey();
    }
    setCurrentSnippetKey(nextSnippetKey);
  }, [usedSnippets]);

  return (
    <Container>
      <Scoreboard score={currentScore} />
      {currentSnippetKey && (
        <Snippet snippet={{ [currentSnippetKey]: snippets[currentSnippetKey] }} />
      )}
      <input ref={inputEl} type="text" />
    </Container>
  );
};

export default Game;
