import { Player } from './Player';
import { Enemy } from './Enemy';
import { Level, LevelData, levels } from './Level';



type MenuState = 'main' | 'levelselect' | 'quit' | 'game' | 'howto';

export class Game {
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
  private levelIndex = 0;
  private level: Level;
  private running = false;
  private deaths = 0;
  private ui: HTMLDivElement;
  private menuState: MenuState = 'main';
  private menuOptions = ['Play', 'Level Select', 'How to Play', 'Quit'];
  private menuSelected = 0;
  private levelSelectIndex = 0;

  constructor(private canvas: HTMLCanvasElement, ui: HTMLDivElement) {
    this.ctx = canvas.getContext('2d')!;
    this.ui = ui;
    this.level = new Level(levels[this.levelIndex]);
    this.player = new Player(
      this.level.data.playerStart.x,
      this.level.data.playerStart.y
    );
    this.loadEnemies();
    this.setupInput();
  }

  start() {
    this.menuState = 'main';
    this.running = true;
    this.loop();
  }

  private loadEnemies() {
    this.enemies = this.level.data.enemies.map((e: import('./Enemy').EnemyData) => new Enemy(e));
  }

  private setupInput() {
    window.addEventListener('keydown', (e) => {
      if (!this.running) return;
      if (this.menuState === 'main') {
        if (e.key === 'ArrowUp' || e.key === 'w') {
          this.menuSelected = (this.menuSelected + this.menuOptions.length - 1) % this.menuOptions.length;
        } else if (e.key === 'ArrowDown' || e.key === 's') {
          this.menuSelected = (this.menuSelected + 1) % this.menuOptions.length;
        } else if (e.key === ' ' || e.key === 'Enter') {
          this.handleMenuSelect(this.menuSelected);
        }
        return;
      }
      if (this.menuState === 'levelselect') {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
          this.levelSelectIndex = (this.levelSelectIndex + levels.length - 1) % levels.length;
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
          this.levelSelectIndex = (this.levelSelectIndex + 1) % levels.length;
        } else if (e.key === ' ' || e.key === 'Enter') {
          this.handleLevelSelect(this.levelSelectIndex);
        } else if (e.key === 'Escape') {
          this.menuState = 'main';
        }
        return;
      }
      if (this.menuState === 'howto') {
        if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
          this.menuState = 'main';
        }
        return;
      }
      if (this.menuState === 'quit') {
        // No input in quit
        return;
      }
      if (this.menuState === 'game') {
        if (e.key === 'r' || e.key === 'R') {
          this.resetPlayer();
        } else if (e.key === 'Escape') {
          this.menuState = 'main';
        }
      }
    });

    // Mouse support for menu and level select
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (this.menuState === 'main') {
        // Calculate button positions
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2 - 20;
        for (let i = 0; i < this.menuOptions.length; i++) {
          const by = cy + i * 40;
          if (mx > cx - 100 && mx < cx + 100 && my > by - 24 && my < by + 8) {
            this.menuSelected = i;
            this.handleMenuSelect(i);
            return;
          }
        }
      } else if (this.menuState === 'levelselect') {
        // Level select: levels are horizontally spaced
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        for (let i = 0; i < levels.length; i++) {
          const lx = cx + (i - this.levelSelectIndex) * 120;
          if (mx > lx - 60 && mx < lx + 60 && my > cy - 30 && my < cy + 10) {
            this.levelSelectIndex = i;
            this.handleLevelSelect(i);
            return;
          }
        }
        // Click below for 'back' (Esc)
        if (my > cy + 60 && my < cy + 100) {
          this.menuState = 'main';
        }
      } else if (this.menuState === 'howto') {
        // Click anywhere to go back
        this.menuState = 'main';
      }
    });
  }

  private handleMenuSelect(index: number) {
    const selected = this.menuOptions[index];
    if (selected === 'Play') {
      this.menuState = 'game';
    } else if (selected === 'Level Select') {
      this.menuState = 'levelselect';
      this.levelSelectIndex = 0;
    } else if (selected === 'How to Play') {
      this.menuState = 'howto';
    } else if (selected === 'Quit') {
      this.menuState = 'quit';
    }
  }
  private drawHowTo() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ui.innerHTML = '';
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 36px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('How to Play', this.canvas.width / 2, this.canvas.height / 2 - 120);
    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = '#eee';
    const lines = [
      'Move the yellow square (player) to the green goal zone.',
      'Avoid the red circles (enemies) or you will be reset to the start.',
      'Use Arrow Keys or WASD to move.',
      'Press R to reset your position.',
      'Press Escape to return to the menu during a level.',
      'Each time you hit an enemy, your death counter increases.',
      '',
      'Click anywhere or press Escape to return to the main menu.'
    ];
    for (let i = 0; i < lines.length; i++) {
      this.ctx.fillText(lines[i], this.canvas.width / 2, this.canvas.height / 2 - 60 + i * 32);
    }
    this.ctx.restore();
  }

  private handleLevelSelect(index: number) {
    this.levelIndex = index;
    this.level = new Level(levels[this.levelIndex]);
    this.player.reset(
      this.level.data.playerStart.x,
      this.level.data.playerStart.y
    );
    this.loadEnemies();
    this.menuState = 'game';
  }

  private resetPlayer() {
    this.player.reset(
      this.level.data.playerStart.x,
      this.level.data.playerStart.y
    );
    this.deaths++;
  }

  private nextLevel() {
    this.levelIndex = (this.levelIndex + 1) % levels.length;
    this.level = new Level(levels[this.levelIndex]);
    this.player.reset(
      this.level.data.playerStart.x,
      this.level.data.playerStart.y
    );
    this.loadEnemies();
  }

  private loop = () => {
    if (!this.running) return;
    if (this.menuState === 'main') {
      this.drawMainMenu();
      requestAnimationFrame(this.loop);
      return;
    }
    if (this.menuState === 'levelselect') {
      this.drawLevelSelect();
      requestAnimationFrame(this.loop);
      return;
    }
    if (this.menuState === 'howto') {
      this.drawHowTo();
      requestAnimationFrame(this.loop);
      return;
    }
    if (this.menuState === 'quit') {
      this.drawQuit();
      return;
    }
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  };

  private update() {
    this.player.update();
    // Restrict player to play zone (0,0)-(800,600)
    this.player.x = Math.max(0, Math.min(this.player.x, 800 - this.player.width));
    this.player.y = Math.max(0, Math.min(this.player.y, 600 - this.player.height));
    for (const enemy of this.enemies) {
      enemy.update();
      if (enemy.collidesWith(this.player)) {
        this.resetPlayer();
      }
    }
    // Check goal
    if (this.level.isPlayerInGoal(this.player)) {
      this.nextLevel();
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw play zone (black background)
    const px = (this.canvas.width - 800) / 2;
    const py = (this.canvas.height - 600) / 2;
    this.ctx.save();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(px, py, 800, 600);
    // Draw white barriers
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 6;
    this.ctx.strokeRect(px, py, 800, 600);
    // Translate to play zone for all game objects
    this.ctx.translate(px, py);
    this.level.draw(this.ctx);
    for (const enemy of this.enemies) enemy.draw(this.ctx);
    this.player.draw(this.ctx);
    this.ctx.restore();
    this.ui.innerHTML = `<h2>Level ${this.levelIndex + 1}</h2><div>Deaths: ${this.deaths}</div>`;
  }

  private drawMainMenu() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ui.innerHTML = '';
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 48px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("World's Hardest Game", this.canvas.width / 2, this.canvas.height / 2 - 100);
    this.ctx.font = '24px sans-serif';
    for (let i = 0; i < this.menuOptions.length; i++) {
      // Draw button background
      const bx = this.canvas.width / 2 - 100;
      const by = this.canvas.height / 2 - 20 + i * 40 - 24;
      this.ctx.fillStyle = i === this.menuSelected ? 'rgba(255,255,0,0.25)' : 'rgba(100,100,100,0.15)';
      this.ctx.fillRect(bx, by, 200, 32);
      // Draw button text
      this.ctx.fillStyle = i === this.menuSelected ? '#ff0' : '#aaa';
      this.ctx.fillText(this.menuOptions[i], this.canvas.width / 2, this.canvas.height / 2 - 20 + i * 40);
    }
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = '#ccc';
    this.ctx.restore();
  }

  private drawLevelSelect() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ui.innerHTML = '';
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 36px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Select Level', this.canvas.width / 2, this.canvas.height / 2 - 80);
    this.ctx.font = '28px sans-serif';
    for (let i = 0; i < levels.length; i++) {
      const lx = this.canvas.width / 2 + (i - this.levelSelectIndex) * 120;
      // Draw button background
      this.ctx.fillStyle = i === this.levelSelectIndex ? 'rgba(0,255,0,0.18)' : 'rgba(100,100,100,0.10)';
      this.ctx.fillRect(lx - 60, this.canvas.height / 2 - 30, 120, 40);
      // Draw text
      this.ctx.fillStyle = i === this.levelSelectIndex ? '#0f0' : '#aaa';
      this.ctx.fillText(`Level ${i + 1}`, lx, this.canvas.height / 2);
    }
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = '#ccc';
    // Draw 'Back' clickable area
    this.ctx.fillStyle = 'rgba(255,255,255,0.08)';
    this.ctx.fillRect(this.canvas.width / 2 - 80, this.canvas.height / 2 + 60, 160, 32);
    this.ctx.fillStyle = '#ccc';
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText('Back', this.canvas.width / 2, this.canvas.height / 2 + 84);
    this.ctx.restore();
  }

  private drawQuit() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ui.innerHTML = '';
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 48px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Thanks for playing!', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.font = '24px sans-serif';
    this.ctx.fillStyle = '#aaa';
    this.ctx.fillText('You may now close this tab.', this.canvas.width / 2, this.canvas.height / 2 + 40);
    this.ctx.restore();
    this.running = false;
  }
}
