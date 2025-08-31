export interface EnemyData {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  speed: number;
  radius: number;
}

import { Player } from './Player';

export class Enemy {
  private t = 0;
  private dir = 1;
  private x: number;
  private y: number;
  constructor(private data: EnemyData) {
    this.x = data.xStart;
    this.y = data.yStart;
  }

  update() {
    // Move along straight path (linear interpolation)
    this.t += this.dir * this.data.speed;
    if (this.t > 100) { this.t = 100; this.dir = -1; }
    if (this.t < 0) { this.t = 0; this.dir = 1; }
    this.x = this.data.xStart + (this.data.xEnd - this.data.xStart) * (this.t / 100);
    this.y = this.data.yStart + (this.data.yEnd - this.data.yStart) * (this.t / 100);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.data.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  collidesWith(player: Player): boolean {
    // Circle-rectangle collision
    const closestX = Math.max(player.x, Math.min(this.x, player.x + player.width));
    const closestY = Math.max(player.y, Math.min(this.y, player.y + player.height));
    const dx = this.x - closestX;
    const dy = this.y - closestY;
    return (dx * dx + dy * dy) < (this.data.radius * this.data.radius);
  }
}
