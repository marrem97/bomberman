class Game {
    constructor(w,h,res) {
        this.w = w;
        this.h = h;
        this.canvas = new Canvas(res);
        this.grid = this.createGrid(res);
    }

    update() {
        this.draw();
    }

    draw() {
       for (let i = 0; i < this.grid.length; i++) {
           const row = this.grid[i];
           for (let j = 0; j < row.length; j++) {
               const oCell = row[j];
               this.canvas.drawCell(oCell);
           }
       }
    }

    createGrid(res) {
        const grid = [];
        const width = this.w / res;
        const height = this.h / res;
        for (let i = 0; i < width; i++) {
            const row = [];
            for (let j = 0; j < height; j++) {
                row.push(new Cell(i,j,width-1,height-1));
            }
            grid.push(row);
        }
        return grid;
    }
}