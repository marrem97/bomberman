class Player {
    constructor(x, y, image, id) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.dead = false;
        this.id = id;
        this.bombs = 1;
        this.range = 1;
        this.shield = false;
    }

    update() {
        if (game.grid[this.x][this.y].state === 3) {
            if (this.shield) {
                this.shieldUsed = true;
            } else {
                this.dead = true;
            }
        }
    }

    move(x, y) {
        if (this.dead) {
            return;
        }

        let oTarget;

        if (x === 1) {
            oTarget = game.grid[this.x + 1][this.y];
        } else if (x === -1) {
            oTarget = game.grid[this.x - 1][this.y];
        } else if (y === 1) {
            oTarget = game.grid[this.x][this.y + 1];
        } else if (y === -1) {
            oTarget = game.grid[this.x][this.y - 1];
        }

        if (!this.getCollision(oTarget)) {
            this.x += x;
            this.y += y;

            if (this.shieldUsed) {
                this.shield = false;
                this.shieldUsed = false;
            }

            const powerup = game.grid[this.x][this.y].powerup;
            if (powerup) {
                this.range += powerup.range;
                this.bombs += powerup.bombs;
                if (powerup.shield) {
                    this.shield = true;
                }
                game.grid[this.x][this.y].powerup = undefined;
            }
        }
    }

    placeBomb() {
        if (this.dead) {
            return;
        }

        if (this.getPlacedBombs() < this.bombs) {
            if (game.bombs.filter(e => e.x === this.x && e.y === this.y).length === 0) {
                const oBomb = new Bomb(this.x, this.y, this.id, this.range);
                game.bombs.push(oBomb);
            }
        }
    }

    getCollision(o) {
        return o.state === 1 || o.state === 2;
    }

    getPlacedBombs() {
        return game.bombs.filter(e => e.id === this.id).length;
    }
}