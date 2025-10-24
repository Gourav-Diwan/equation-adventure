import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { saveLevel as saveLevelToFirebase, getUserLevels, deleteLevel as deleteLevelFromFirebase } from '../lib/firebase';

export const useGameState = () => {
  const { user } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [customLevels, setCustomLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load user's levels when they sign in
  useEffect(() => {
    if (user) {
      loadUserLevels();
    } else {
      // Clear levels when signed out
      setCustomLevels([]);
    }
  }, [user]);

  const loadUserLevels = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const levels = await getUserLevels(user.uid);
      setCustomLevels(levels);
    } catch (error) {
      console.error('Error loading levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPoints = (points) => {
    setTotalPoints(prev => prev + points);
  };

  const addBadge = (badgeId) => {
    if (!badges.includes(badgeId)) {
      setBadges(prev => [...prev, badgeId]);
    }
  };

  const saveCustomLevel = async (level) => {
    if (!user) {
      alert('Please sign in to save custom levels!');
      return null;
    }

    try {
      const savedLevel = await saveLevelToFirebase(user.uid, level);
      setCustomLevels(prev => [savedLevel, ...prev]);
      return savedLevel;
    } catch (error) {
      console.error('Error saving level:', error);
      alert('Failed to save level. Please try again.');
      return null;
    }
  };

  const deleteCustomLevel = async (id) => {
    if (!user) return;

    try {
      await deleteLevelFromFirebase(id);
      setCustomLevels(prev => prev.filter(level => level.id !== id));
    } catch (error) {
      console.error('Error deleting level:', error);
      alert('Failed to delete level. Please try again.');
    }
  };

  return {
    totalPoints,
    badges,
    customLevels,
    loading,
    addPoints,
    addBadge,
    saveCustomLevel,
    deleteCustomLevel,
    user
  };
};