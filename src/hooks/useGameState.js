import { useState } from 'react';

export const useGameState = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [customLevels, setCustomLevels] = useState([]);

  const addPoints = (points) => {
    setTotalPoints(prev => prev + points);
  };

  const addBadge = (badgeId) => {
    if (!badges.includes(badgeId)) {
      setBadges(prev => [...prev, badgeId]);
    }
  };

  const saveCustomLevel = (level) => {
    const newLevel = {
      ...level,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString()
    };
    setCustomLevels(prev => [...prev, newLevel]);
    return newLevel;
  };

  const deleteCustomLevel = (id) => {
    setCustomLevels(prev => prev.filter(level => level.id !== id));
  };

  return {
    totalPoints,
    badges,
    customLevels,
    addPoints,
    addBadge,
    saveCustomLevel,
    deleteCustomLevel
  };
};
