import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MainMenu } from './components/MainMenu';
import { Bomb31 } from './components/Bomb31';
import { NunchiTap } from './components/NunchiTap';
import { VibeVote } from './components/VibeVote';

function App() {
  const [activeGame, setActiveGame] = useState('menu');

  const renderGame = () => {
    switch (activeGame) {
      case 'bomb31':
        return <Bomb31 key="bomb31" onBack={() => setActiveGame('menu')} />;
      case 'nunchitap':
        return <NunchiTap key="nunchitap" onBack={() => setActiveGame('menu')} />;
      case 'vibevote':
        return <VibeVote key="vibevote" onBack={() => setActiveGame('menu')} />;
      default:
        return <MainMenu key="menu" onSelectGame={setActiveGame} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderGame()}
    </AnimatePresence>
  );
}

export default App;
