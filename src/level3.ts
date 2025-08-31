// Level 3: The Crossroads
// Canvas: 800x600
// Cross-shaped gauntlet, rest area, and funneling obstacles

import { EnemyData } from './Enemy';

export interface Level3Enemy {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  path: { x1: number; y1: number; x2: number; y2: number };
}

export interface Level3Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface Level3Config {
  startZone: { x: number; y: number; width: number; height: number };
  goalZone: { x: number; y: number; width: number; height: number };
  playerStart: { x: number; y: number };
  enemies: Level3Enemy[];
  obstacles: Level3Obstacle[];
}

export const level3: Level3Config = {
  startZone: { x: 50, y: 500, width: 80, height: 80 },
  goalZone: { x: 670, y: 20, width: 100, height: 100 },
  playerStart: { x: 90, y: 540 },
  enemies: [
    // Vertical corridor (left side) - span full height
    { x: 250, y: 100, radius: 15, speedX: 0, speedY: 2, path: { x1: 250, y1: 0, x2: 250, y2: 600 } },
    { x: 300, y: 200, radius: 15, speedX: 0, speedY: 2, path: { x1: 300, y1: 0, x2: 300, y2: 600 } },
    { x: 350, y: 300, radius: 15, speedX: 0, speedY: 2, path: { x1: 350, y1: 0, x2: 350, y2: 600 } },
    // Horizontal corridor (top side) - span full width
    { x: 100, y: 150, radius: 15, speedX: 2, speedY: 0, path: { x1: 0, y1: 150, x2: 800, y2: 150 } },
    { x: 200, y: 170, radius: 15, speedX: 2.3, speedY: 0, path: { x1: 0, y1: 170, x2: 800, y2: 170 } },
    { x: 300, y: 190, radius: 15, speedX: 2.6, speedY: 0, path: { x1: 0, y1: 190, x2: 800, y2: 190 } },
    { x: 400, y: 210, radius: 15, speedX: 2.9, speedY: 0, path: { x1: 0, y1: 210, x2: 800, y2: 210 } },
    // Cross intersection (center) - span full height/width
    { x: 400, y: 250, radius: 16, speedX: 0, speedY: 2.5, path: { x1: 400, y1: 0, x2: 400, y2: 600 } },
    { x: 450, y: 500, radius: 16, speedX: 0, speedY: -2.5, path: { x1: 450, y1: 0, x2: 450, y2: 600 } },
    { x: 350, y: 400, radius: 16, speedX: 2.5, speedY: 0, path: { x1: 0, y1: 400, x2: 800, y2: 400 } },
    { x: 550, y: 450, radius: 16, speedX: -2.5, speedY: 0, path: { x1: 0, y1: 450, x2: 800, y2: 450 } },
  ],
  obstacles: [
    // Rest area (gray)
    { x: 400, y: 400, width: 100, height: 100, color: '#888' },
    // Funnel walls (black, thin)
    { x: 200, y: 100, width: 10, height: 400, color: 'black' }, // left vertical
    { x: 390, y: 100, width: 10, height: 300, color: 'black' }, // center vertical
    { x: 600, y: 100, width: 10, height: 400, color: 'black' }, // right vertical
    { x: 100, y: 240, width: 300, height: 10, color: 'black' }, // top horizontal
    { x: 400, y: 240, width: 300, height: 10, color: 'black' }, // top horizontal right
    { x: 100, y: 500, width: 300, height: 10, color: 'black' }, // bottom horizontal
    { x: 400, y: 500, width: 300, height: 10, color: 'black' }, // bottom horizontal right
  ],
};
