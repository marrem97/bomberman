class Cell {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.wall = this.isWall(width, height);
    }

    isWall(w,h) {
        return this.x === 0 || this.y === 0 || this.x === w || this.y === h;
    }
}