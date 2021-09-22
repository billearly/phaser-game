import { useRef } from 'react';
import { useGame } from './hooks';
import { main } from './game/config';
import './App.css';

function App() {
  const gameRef = useRef<HTMLDivElement>(null);

  useGame(main, gameRef);

  return (
    <div className="App-header">
      <div id="game" ref={gameRef}></div>
    </div>
  );
}

export default App;
