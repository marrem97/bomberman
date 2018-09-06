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

        if (o.wall) {
			ctx.drawImage(game._wall, x, y, this.res, this.res);
        } else {
			ctx.fillStyle = "gray";
			ctx.fillRect(x, y, this.res, this.res);
			// ctx.drawImage(game._brokenWall, x, y, this.res, this.res);
        }

        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, this.res, this.res);

        ctx.fillStyle = "white";
        ctx.fillText(o.x + " " + o.y, o.x * this.res + this.res/2, o.y * this.res + this.res/2);
    }

    drawPlayer() {

    }
}