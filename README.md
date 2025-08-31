# World's Hardest Game (TypeScript + HTML5 Canvas)

A browser-based game inspired by the classic "World's Hardest Game," built with TypeScript, HTML5 Canvas, and Vite. Navigate the yellow player square through challenging levels, avoid moving enemies, and reach the green goal zone!

## Features
- Modular TypeScript codebase
- Responsive HTML5 Canvas rendering
- Multiple challenging levels (with level select)
- Main menu, how-to-play, and quit screens
- Keyboard and mouse controls
- Clean, modern UI overlays
- Play zone with visible barriers

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/ConnorHardin/WorldsHardestGame.git
	cd WorldsHardestGame
	```
2. Install dependencies:
	```sh
	npm install
	```

### Running the Game (Development)
Start the Vite dev server:
```sh
npm run dev
```
Open your browser and navigate to the local server URL (usually `http://localhost:5173`).

### Building for Production
```sh
npm run build
```
The output will be in the `dist/` folder.

## Controls
- **Move:** Arrow keys or WASD
- **Reset Position:** R
- **Menu Navigation:** Arrow keys/WASD or mouse
- **Select/Confirm:** Enter or Space or mouse click
- **Back:** Escape

## Project Structure
```
WorldsHardestGame/
├── src/
│   ├── main.ts         # Entry point
│   ├── Game.ts         # Game loop, UI, state
│   ├── Player.ts       # Player logic
│   ├── Enemy.ts        # Enemy logic
│   ├── Level.ts        # Level data and rendering
│   ├── level2.ts       # Level 2 config
│   ├── level3.ts       # Level 3 config
│   └── ...
├── index.html          # Main HTML file
├── vite.config.ts      # Vite config
├── tsconfig.json       # TypeScript config
└── README.md           # This file
```

## Credits
- Game design and code: [ConnorHardin](https://github.com/ConnorHardin)
- Inspired by the original World's Hardest Game

