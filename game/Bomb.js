class Bomb {
    constructor(x,y,id,range) {
        this.range = 2;
        this.id = id;
        this.x = x;
        this.y = y;
        this.exploded = false;
        this.time = 50;
        this.count = game.bombCounter++;
    }

    explode() {
        this.exploded = true;
        this.time = 10;
        this.getNeighbors().forEach(e => {
            if (e.state === 0) {
                e.lastChangedFrom = this.count;
                const d = Math.sqrt(Math.pow((e.x-this.x),2)+Math.pow((e.y-this.y),2));
                setTimeout(() => {
                    e.state = 3;
                }, d*25);
            } else if (e.state === 2) {
                e.state = 0;
            }
        });
    }

    remove() {
        this.getNeighbors().forEach(e => {
            if (e.lastChangedFrom === this.count && e.state === 3) {
                e.state = 0;
            }
        });
    }

    getNeighbors() {
        const arr = [];
        let b1 = true;
        let b2 = true;
        let b3 = true;
        let b4 = true;
        let oCell;
        for(let i = 0; i <= this.range; i++) {
            if (b1) oCell = this.getCell(this.x+i,this.y);
            if (oCell && (oCell.state === 1 || oCell.state === 2)) b1 = false;
            arr.push(oCell);
            if (b2) oCell = this.getCell(this.x-i,this.y);
            if (oCell && (oCell.state === 1 || oCell.state === 2)) b2 = false;
            arr.push(oCell);
            if (b3) oCell = this.getCell(this.x,this.y+i);
            if (oCell && (oCell.state === 1 || oCell.state === 2)) b3 = false;
            arr.push(oCell);
            if (b4) oCell = this.getCell(this.x,this.y-i);
            if (oCell && (oCell.state === 1 || oCell.state === 2)) b4 = false;
            arr.push(oCell);
        }
        const temp = arr.filter(e => !!e);
        return temp;
    }

    getCell(x,y) {
        if (game.grid[x]) {
            if (game.grid[x][y]) {
                return game.grid[x][y];
            }
        }
    }
}