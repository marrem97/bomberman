class Player {
    constructor(x, y, color, id) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.dead = false;
        this.id = id;
    }

    move(x, y) {
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
        }
    }

    placeBomb() {
        if (game.bombs.filter(e => e.id === this.id).length < 3 && game.bombs.filter(e => e.x === this.x && e.y === this.y).length === 0) {
            game.bombs.push({x: this.x, y: this.y, time: 50, exploded: false, id: this.id});
        }
    }

    getCollision(o) {
        return o.state !== 0;
    }
}