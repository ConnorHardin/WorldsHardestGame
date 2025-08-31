export class Player {
  x: number;
  y: number;
  width = 24;
  height = 24;
  speed = 4;
  private vx = 0;
  private vy = 0;
  private keys: Record<string, boolean> = {};
  private startX: number;
  private startY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    window.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
  }

  update() {
    this.vx = 0;
    this.vy = 0;
    if (this.keys['arrowleft'] || this.keys['a']) this.vx = -this.speed;
    if (this.keys['arrowright'] || this.keys['d']) this.vx = this.speed;
    if (this.keys['arrowup'] || this.keys['w']) this.vy = -this.speed;
    if (this.keys['arrowdown'] || this.keys['s']) this.vy = this.speed;
    this.x += this.vx;
    this.y += this.vy;
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
