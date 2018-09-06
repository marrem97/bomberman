class Player {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    move(x, y) {
        let oTarget;

        if (x === 1) {
            oTarget = game.grid[this.x+1][this.y];
        } else if (x === -1) {
            oTarget = game.grid[this.x-1][this.y];
        } else if (y === 1) {
            oTarget = game.grid[this.x][this.y+1];
        } else if (y === -1) {
            oTarget = game.grid[this.x][this.y-1];
        }

        if (!this.getCollision(oTarget)) {
            this.x += x;
            this.y += y;
        }
    }

    getCollision(o) {
        return o.state !== 0;
    }
}