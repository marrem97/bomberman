class Canvas {
    constructor(res) {
        this.res = res;
    }

    getCtx() {
        return document.getElementById("canvas").getContext("2d");
    }

    drawCell(o) {
        const ctx = this.getCtx();
        const x = o.x * this.res;
        const y = o.y * this.res;

        switch (o.state) {
            case 0:
                ctx.fillStyle = "#b4b4b4";
                ctx.fillRect(x, y, this.res, this.res);
                break;
            case 1:
                ctx.drawImage(game._wall, x, y, this.res, this.res);
                break;
            case 2:
                ctx.drawImage(game._brokenWall, x, y, this.res, this.res);
        }

        // ctx.strokeStyle = "white";
        // ctx.strokeRect(o.x * this.res, o.y * this.res, this.res, this.res);

        // ctx.fillStyle = "white";
        // ctx.fillText(o.x + " " + o.y, o.x * this.res + this.res / 2, o.y * this.res + this.res / 2);
    }

    drawPlayer(o) {
        const ctx = this.getCtx();
        ctx.beginPath();
        ctx.fillStyle = o.color;
        ctx.arc(o.x*this.res+this.res/2,o.y*this.res+this.res/2,this.res/2,0,2*Math.PI);
        ctx.fill();
    }

    drawBomb(o) {
        const x = o.x;
        const y = o.y;
        const get = i => i * this.res;
        const ctx = this.getCtx();

        if (o.exploded) {
            ctx.fillStyle = "red";
            ctx.fillRect(get(x), get(y), this.res, this.res);

            if (game.grid[x+1][y].state === 0) {
                ctx.fillRect(get(x+1), get(y), this.res, this.res);
            }
            if (game.grid[x-1][y].state === 0) {
                ctx.fillRect(get(x-1), get(y), this.res, this.res);
            }
            if (game.grid[x][y+1].state === 0) {
                ctx.fillRect(get(x), get(y+1), this.res, this.res);
            }
            if (game.grid[x][y-1].state === 0) {
                ctx.fillRect(get(x), get(y-1), this.res, this.res);
            }

        } else {
            ctx.drawImage(game._bomb, get(x), get(y), this.res, this.res);
        }
    }
}