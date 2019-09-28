import React, { useState } from 'react';
import Game from './containers/Game';
import Home from './containers/Home';

const App = () => {
  const [isGameActive, setGameActive] = useState(false);

  if (!isGameActive) {
    return <Home onStart={() => setGameActive(true)} />;
  }

  return <Game />;
};

export default App;
