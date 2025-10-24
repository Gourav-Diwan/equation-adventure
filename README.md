# Equation Adventure 🎮

An interactive game that helps kids learn to solve linear equations through engaging video game-themed challenges.

## Features

- 🎯 **Play Mode**: 4 built-in levels with different gaming scenarios
- 🎨 **Creator Mode**: Design custom equation challenges
- 📊 **Visual Learning**: Interactive graphs showing equation solutions
- 🏆 **Badges & Points**: Earn rewards for solving equations
- 💡 **Hints & Solutions**: Learn strategies when stuck

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd equation-adventure
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically deploy your app.

## Project Structure

```
src/
├── components/          # React components
│   ├── MainMenu.jsx    # Main navigation
│   ├── GameEngine.jsx  # Play mode
│   ├── CreatorMode.jsx # Level creation
│   ├── LevelBrowser.jsx # Custom levels
│   └── Graph.jsx       # Visual graph component
├── data/
│   └── levelTemplates.js # Built-in level definitions
├── hooks/
│   └── useGameState.js   # Shared state management
├── App.jsx              # Main app component
└── main.jsx            # Entry point
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Graph visualization
- **Lucide React** - Icons

## Future Enhancements (Option B)

- 🔐 User authentication
- ☁️ Cloud storage for custom levels
- 🔗 Share level codes with friends
- 🏅 Leaderboards
- 🎮 More equation types (quadratic, exponential)

## Contributing

This is a family project! Feel free to add new features and levels.

## License

MIT

## Created By

A father-son team learning math and coding together! 🚀
