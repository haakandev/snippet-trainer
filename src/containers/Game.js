import React, { useState } from 'react';
import { Container, Snippet } from '../components';

const Game = () => {
  const [currentInput, setCurrentInput] = useState('');

  return (
    <Container>
      <Snippet />
      <input
        type="text"
        value={currentInput}
        onChange={event => setCurrentInput(event.target.value)}
      />
    </Container>
  );
};

export default Game;
