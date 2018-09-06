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
        // ctx.fillRect(o.x * this.res, o.y * this.res, this.res, this.res);
        ctx.arc(o.x*this.res+this.res/2,o.y*this.res+this.res/2,this.res/2,0,2*Math.PI);
        ctx.fill();
        ctx.fillStyle = "white";
    }
}