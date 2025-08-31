
import { EnemyData } from './Enemy';
import { Player } from './Player';
import { level2 } from './level2';

export interface LevelData {
  playerStart: { x: number; y: number };
  goal: { x: number; y: number; width: number; height: number };
  start: { x: number; y: number; width: number; height: number };
  enemies: EnemyData[];
  obstacles?: { x: number; y: number; width: number; height: number }[];
}

export const levels: LevelData[] = [
  // Level 1
  {
    playerStart: { x: 80, y: 220 },
    start: { x: 60, y: 200, width: 60, height: 60 },
    goal: { x: 600, y: 220, width: 60, height: 60 },
    enemies: [
      { xStart: 200, xEnd: 500, yStart: 250, yEnd: 250, speed: 1.5, radius: 18 },
    ],
  },
  // Level 2 (converted from level2.ts)
  {
    playerStart: level2.playerStart,
    start: level2.startZone,
    goal: level2.goalZone,
    enemies: level2.enemies.map(e => ({
      // Convert EnemyConfig to EnemyData (for straight path movement)
      xStart: e.path.x1,
      xEnd: e.path.x2,
      yStart: e.path.y1,
      yEnd: e.path.y2,
      speed: Math.max(Math.abs(e.speedX), Math.abs(e.speedY)),
      radius: e.radius,
    })),
    obstacles: level2.obstacles,
  },
];

export class Level {
  constructor(public data: LevelData) {}

  draw(ctx: CanvasRenderingContext2D) {
    // Draw start zone
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.data.start.x, this.data.start.y, this.data.start.width, this.data.start.height);
    // Draw goal zone
    ctx.fillStyle = 'green';
    ctx.fillRect(this.data.goal.x, this.data.goal.y, this.data.goal.width, this.data.goal.height);
  }

  isPlayerInGoal(player: Player): boolean {
    const g = this.data.goal;
    return (
      player.x < g.x + g.width &&
      player.x + player.width > g.x &&
      player.y < g.y + g.height &&
      player.y + player.height > g.y
    );
  }
}
