import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import MainMenu from './components/MainMenu';
import GameEngine from './components/GameEngine';
import CreatorMode from './components/CreatorMode';
import LevelBrowser from './components/LevelBrowser';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import { builtInTemplates } from './data/levelTemplates';

function App() {
  const [screen, setScreen] = useState('menu'); // 'menu', 'play', 'create', 'browse', 'leaderboard', 'profile'
  const [currentLevel, setCurrentLevel] = useState(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [playingCustom, setPlayingCustom] = useState(false);
  const [profileUser, setProfileUser] = useState(null);

  const gameState = useGameState();

  const handlePlayBuiltIn = () => {
    const template = builtInTemplates[0];
    const level = template.generateLevel();
    setCurrentLevel({ ...level, template });
    setLevelIndex(0);
    setPlayingCustom(false);
    setScreen('play');
  };

  const handleNextLevel = () => {
    const nextIndex = (levelIndex + 1) % builtInTemplates.length;
    const template = builtInTemplates[nextIndex];
    const level = template.generateLevel();
    setCurrentLevel({ ...level, template });
    setLevelIndex(nextIndex);
  };

  const handleRetryLevel = () => {
    if (playingCustom) {
      // For custom levels, just reload the same level
      setCurrentLevel({ ...currentLevel });
    } else {
      // For built-in levels, regenerate with new numbers
      const template = builtInTemplates[levelIndex];
      const level = template.generateLevel();
      setCurrentLevel({ ...level, template });
    }
  };

  const handlePlayCustom = (customLevel, index) => {
    const template = builtInTemplates.find(t => t.type === customLevel.scenarioType) || builtInTemplates[0];
    setCurrentLevel({ ...customLevel, template: { ...template, title: customLevel.title } });
    setLevelIndex(index);
    setPlayingCustom(true);
    setScreen('play');
  };

  const handleBackFromGame = () => {
    if (playingCustom) {
      setScreen('browse');
    } else {
      setScreen('menu');
    }
  };

  const handleViewProfile = (user) => {
    setProfileUser(user);
    setScreen('profile');
  };

  const handleBackToLeaderboard = () => {
    setProfileUser(null);
    setScreen('leaderboard');
  };

  const handleLevelComplete = (levelIdx, solveTime) => {
    // Record fastest time for this level
    if (solveTime > 0) {
      gameState.recordFastestTime(`level_${levelIdx + 1}`, solveTime);
    }
    // Increment levels completed
    gameState.completedLevel();
  };

  return (
    <div className="min-h-screen">
      {screen === 'menu' && (
        <MainMenu
          totalPoints={gameState.totalPoints}
          badges={gameState.badges}
          customLevelCount={gameState.customLevels.length}
          onPlayGame={handlePlayBuiltIn}
          onCreateLevel={() => setScreen('create')}
          onBrowseLevels={() => setScreen('browse')}
          onViewLeaderboard={() => setScreen('leaderboard')}
        />
      )}

      {screen === 'play' && currentLevel && (
        <GameEngine
          level={currentLevel}
          levelIndex={levelIndex}
          playingCustom={playingCustom}
          totalPoints={gameState.totalPoints}
          badges={gameState.badges}
          onAddPoints={gameState.addPoints}
          onAddBadge={gameState.addBadge}
          onLevelComplete={handleLevelComplete}
          onNextLevel={handleNextLevel}
          onRetry={handleRetryLevel}
          onBack={handleBackFromGame}
          builtInTemplates={builtInTemplates}
        />
      )}

      {screen === 'create' && (
        <CreatorMode
          onSave={(level) => {
            gameState.saveCustomLevel(level);
            setScreen('browse');
          }}
          onBack={() => setScreen('menu')}
        />
      )}

      {screen === 'browse' && (
        <LevelBrowser
          customLevels={gameState.customLevels}
          onPlayLevel={handlePlayCustom}
          onDeleteLevel={gameState.deleteCustomLevel}
          onCreateNew={() => setScreen('create')}
          onBack={() => setScreen('menu')}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard
          user={gameState.user}
          onBack={() => setScreen('menu')}
          onViewProfile={handleViewProfile}
        />
      )}

      {screen === 'profile' && (
        <UserProfile
          user={gameState.user}
          profileUser={profileUser}
          onBack={profileUser ? handleBackToLeaderboard : () => setScreen('menu')}
        />
      )}
    </div>
  );
}

export default App;
