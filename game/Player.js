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
        this.kicker = false;

        this.speed = 8;
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

        if (this.moving) {
            return;
        }

        this.moving = true;

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
            if (this.getCollisionWithBomb(oTarget)) {
                if (this.kicker) {
                    game.bombs.find(e => e.x === oTarget.x && e.y === oTarget.y).kick(x, y);
                } else {
                    setTimeout(() => this.moving = false, 1000 / this.speed);
                    return;
                }
            }

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
                this.speed += powerup.speed;
                if (powerup.shield) {
                    this.shield = true;
                } else if (powerup.kicker) {
                    this.kicker = true;
                }
                game.grid[this.x][this.y].powerup = undefined;
            }
        }

        setTimeout(() => this.moving = false, 1000 / this.speed);
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

    getCollisionWithBomb(o) {
        return !!game.bombs.find(e => e.x === o.x && e.y === o.y);
    }

    getPlacedBombs() {
        return game.bombs.filter(e => e.id === this.id).length;
    }
}