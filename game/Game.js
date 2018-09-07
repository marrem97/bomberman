class Game {
    constructor(w, h, res) {
        this.w = w;
        this.h = h;
        this.canvas = new Canvas(res);
        this.grid = this.createGrid(res);
        this.bombCounter = 0;

        this.bombs = [];

        this.initEventListener();

        this._wall = document.getElementById("wall");
        this._brokenWall = document.getElementById("broken_wall");
        this._bomb = document.getElementById("bomb");
        this._powerup_range = document.getElementById("powerup_range");
        this._powerup_bomb = document.getElementById("powerup_bomb");
        this._powerup_speed = document.getElementById("powerup_speed");
        this._powerup_shield = document.getElementById("powerup_shield");
        this._powerup_kicker = document.getElementById("powerup_kicker");
        this._explosion = document.getElementById("explosion");
        this._mew = document.getElementById("mew");
        this._snorlax = document.getElementById("snorlax");

        let oStart1;
        this.grid.find(e => oStart1 = e.find(el => el.state === 0 && Math.random() > 0.8));
        let oStart2;
        this.grid.find(e => oStart2 =  e.find(el => (el.x !== oStart1.x || el.y !== oStart1.y) && el.state === 0));
        this.player1 = new Player(oStart1.x, oStart1.y, this._mew, 1);
        this.player2 = new Player(oStart2.x, oStart2.y, this._snorlax, 2);
    }

    update() {
        this.draw();

        this.controls();

        this.bombs.forEach(e => {
            if (e.time === 0 && !e.exploded) {
                e.explode();
            } else {
                e.time--;
            }
        });

        this.deadBombs = this.bombs.filter(e => e.time === 0 && e.exploded);
        this.deadBombs.forEach(e => e.remove());
        this.bombs = this.bombs.filter(e => e.time !== 0 || !e.exploded);

        this.player1.update();
        this.player2.update();
    }

    draw() {
        // ------- grid ---------------------------------------------
        for (let i = 0; i < this.grid.length; i++) {
            const row = this.grid[i];
            for (let j = 0; j < row.length; j++) {
                const oCell = row[j];
                this.canvas.drawCell(oCell);
            }
        }
        // ------- bombs --------------------------------------------
        this.bombs.forEach(e => this.canvas.drawBomb(e));
        // ------- players ------------------------------------------
        this.canvas.drawPlayer(this.player1);
        this.canvas.drawPlayer(this.player2);
    }

    controls() {
        if (keyState.ArrowLeft) this.player2.move(-1,0);
        if (keyState.ArrowRight) this.player2.move(1,0);
        if (keyState.ArrowUp) this.player2.move(0,-1);
        if (keyState.ArrowDown) this.player2.move(0,1);
        if (keyState.A) this.player1.move(-1,0);
        if (keyState.D) this.player1.move(1,0);
        if (keyState.W) this.player1.move(0,-1);
        if (keyState.S) this.player1.move(0,1);
        if (keyState.ShiftLeft) this.player1.placeBomb();
        if (keyState.Space) this.player2.placeBomb();
    }

    createGrid(res) {
        const grid = [];
        const width = this.w / res;
        const height = this.h / res;
        for (let i = 0; i < width; i++) {
            const row = [];
            for (let j = 0; j < height; j++) {
                row.push(new Cell(i, j, width - 1, height - 1));
            }
            grid.push(row);
        }
        return grid;
    }

    initEventListener() {
        window.keyState = {};
        window.addEventListener('keydown',function(e){
            keyState[e.code] = true;
        },true);
        window.addEventListener('keyup',function(e){
            keyState[e.code] = false;
        },true);
    }
}