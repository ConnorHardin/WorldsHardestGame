// Level 2 configuration for World's Hardest Game clone
// This level features vertical and horizontal moving enemies, a rest area, and obstacles (optional)

export interface EnemyConfig {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  path: { x1: number; y1: number; x2: number; y2: number };
}

export interface ObstacleConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LevelConfig {
  startZone: { x: number; y: number; width: number; height: number };
  goalZone: { x: number; y: number; width: number; height: number };
  playerStart: { x: number; y: number };
  enemies: EnemyConfig[];
  obstacles?: ObstacleConfig[];
}

export const level2: LevelConfig = {
  // Start zone on the left
  startZone: { x: 40, y: 250, width: 60, height: 100 },
  // Goal zone on the far right
  goalZone: { x: 700, y: 500, width: 60, height: 80 },
  // Player starts inside the start zone
  playerStart: { x: 60, y: 290 },
  enemies: [
    // --- Vertical enemies (middle row, move up and down together) ---
    // These force the player to time their crossing
    {
      x: 220, y: 150, radius: 18, speedX: 0, speedY: 2.2,
      path: { x1: 220, y1: 150, x2: 220, y2: 450 }, // Moves vertically
    },
    {
      x: 320, y: 450, radius: 18, speedX: 0, speedY: -2.2,
      path: { x1: 320, y1: 150, x2: 320, y2: 450 }, // Moves vertically, opposite direction
    },
    {
      x: 420, y: 150, radius: 18, speedX: 0, speedY: 2.2,
      path: { x1: 420, y1: 150, x2: 420, y2: 450 }, // Moves vertically
    },
    {
      x: 520, y: 450, radius: 18, speedX: 0, speedY: -2.2,
      path: { x1: 520, y1: 150, x2: 520, y2: 450 }, // Moves vertically, opposite direction
    },
    // --- Horizontal enemies (timing-based, offset) ---
    // These force the player to pause in the rest area
    {
      x: 250, y: 350, radius: 16, speedX: 2.5, speedY: 0,
      path: { x1: 250, y1: 350, x2: 600, y2: 350 }, // Moves horizontally
    },
    {
      x: 600, y: 400, radius: 16, speedX: -2.5, speedY: 0,
      path: { x1: 250, y1: 400, x2: 600, y2: 400 }, // Moves horizontally, opposite direction
    },
    {
      x: 250, y: 500, radius: 16, speedX: 2.5, speedY: 0,
      path: { x1: 250, y1: 500, x2: 600, y2: 500 }, // Moves horizontally
    },
  ],
  // Optional: obstacles (rest area)
  obstacles: [
    // Safe rest area between enemy sections
    { x: 600, y: 250, width: 60, height: 100 }, // Player can pause here
    // Example: add more obstacles if needed
  ],
};
