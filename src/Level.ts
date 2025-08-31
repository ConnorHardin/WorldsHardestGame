
import { EnemyData } from './Enemy';
import { Player } from './Player';
import { level2 } from './level2';
import { level3 } from './level3';

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
  // Level 2 (converted from level2.ts, paths now span full play zone)
  {
    playerStart: level2.playerStart,
    start: level2.startZone,
    goal: level2.goalZone,
    enemies: level2.enemies.map(e => {
      if (e.speedY !== 0) {
        return {
          xStart: e.x,
          xEnd: e.x,
          yStart: 0,
          yEnd: 600,
          speed: Math.abs(e.speedY),
          radius: e.radius,
        };
      } else {
        return {
          xStart: 0,
          xEnd: 800,
          yStart: e.y,
          yEnd: e.y,
          speed: Math.abs(e.speedX),
          radius: e.radius,
        };
      }
    }),
    obstacles: level2.obstacles,
  },
  // Level 3 (from level3.ts, converted to LevelData)
  {
    playerStart: level3.playerStart,
    start: level3.startZone,
    goal: level3.goalZone,
    enemies: level3.enemies.map(e => {
      if (e.speedX !== 0) {
        return {
          xStart: e.path.x1,
          xEnd: e.path.x2,
          yStart: e.y,
          yEnd: e.y,
          speed: Math.abs(e.speedX),
          radius: e.radius,
        };
      } else {
        return {
          xStart: e.x,
          xEnd: e.x,
          yStart: e.path.y1,
          yEnd: e.path.y2,
          speed: Math.abs(e.speedY),
          radius: e.radius,
        };
      }
    }),
    obstacles: level3.obstacles?.map(o => ({
      x: o.x,
      y: o.y,
      width: o.width,
      height: o.height,
    })),
  },
// ...existing code...
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
