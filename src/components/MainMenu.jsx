import { Play, Wand2, Trophy, Sparkles, Zap } from 'lucide-react';
import AuthButton from './AuthButton';

const MainMenu = ({ totalPoints, badges, customLevelCount, onPlayGame, onCreateLevel, onBrowseLevels }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Auth Button at Top */}
        <div className="flex justify-end mb-4">
          <AuthButton />
        </div>

        <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-3xl p-12 border-2 border-purple-500 shadow-2xl text-center">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4 animate-pulse">
            Equation Adventure
          </h1>
          <p className="text-purple-200 text-xl mb-12">Master equations through gaming! 🎮</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={onPlayGame}
              className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl"
            >
              <Play className="mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-2">Play Game</h2>
              <p className="text-purple-100 text-sm">Solve built-in levels</p>
            </button>
            
            <button
              onClick={onCreateLevel}
              className="bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl"
            >
              <Wand2 className="mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-2">Create Level</h2>
              <p className="text-green-100 text-sm">Design your own challenge</p>
            </button>
            
            <button
              onClick={onBrowseLevels}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl"
            >
              <Trophy className="mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-2">My Levels</h2>
              <p className="text-blue-100 text-sm">{customLevelCount} custom levels</p>
            </button>
          </div>

          {totalPoints > 0 && (
            <div className="mt-8 bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-xl">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="text-yellow-200" size={32} />
                <div>
                  <p className="text-yellow-100 text-sm">Total Score</p>
                  <p className="text-white font-bold text-2xl">{totalPoints} points</p>
                </div>
              </div>
            </div>
          )}

          {badges.length > 0 && (
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              {badges.includes('first-try') && (
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-200" />
                  <span className="text-white font-semibold text-sm">First Try Legend</span>
                </div>
              )}
              {badges.includes('quick-solver') && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Zap size={16} className="text-purple-200" />
                  <span className="text-white font-semibold text-sm">Speed Demon</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;