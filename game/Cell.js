class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.state = this.getState(width, height);
        this.age = 0;
    }

    getState(w, h) {
        if (this.isWall(w, h)) {
            return 1;
        } else if (this.isBrokenWall(w, h)) {
            return 2;
        } else {
            return 0;
        }
    }

    isWall(w, h) {
        return this.x === 0 || this.y === 0 || this.x === w || this.y === h || (this.x % 2 === 0 && this.y % 2 === 0);
    }

    isBrokenWall(w, h) {
        return this.x > 1 && this.y > 1 && Math.random() > 0.4;
    }
}