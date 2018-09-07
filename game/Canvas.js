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
                ctx.fillStyle = "#86acb4";
                ctx.fillRect(x, y, this.res, this.res);
                if (o.powerup) {
                    ctx.drawImage(o.powerup.image, x+this.res/6, y+this.res/6, this.res-this.res/3, this.res-this.res/3);
                }
                break;
            case 1:
                ctx.drawImage(game._wall, x, y, this.res, this.res);
                break;
            case 2:
                ctx.drawImage(game._brokenWall, x, y, this.res, this.res);
                break;
            case 3:
                ctx.fillStyle = "rgba(255,0,0,0.8)";
                ctx.fillRect(x, y, this.res, this.res);
        }

        // ctx.strokeStyle = "white";
        // ctx.strokeRect(o.x * this.res, o.y * this.res, this.res, this.res);

        // ctx.fillStyle = "white";
        // ctx.fillText(o.x + " " + o.y, o.x * this.res + this.res / 2, o.y * this.res + this.res / 2);
    }

    drawPlayer(o) {
        if (!o.dead) {
            const ctx = this.getCtx();
            const x = o.x * this.res;
            const y = o.y * this.res;
            ctx.drawImage(o.image, x, y, this.res, this.res);
            if (o.shield && !o.shieldUsed) {
                ctx.drawImage(game._powerup_shield, x+this.res/1.5, y, this.res/2, this.res/2);
            }
        }
    }

    drawBomb(o) {
        const x = o.x * this.res;
        const y = o.y * this.res;
        const ctx = this.getCtx();

        if (!o.exploded) {
            ctx.drawImage(game._bomb, x+this.res/20, y+this.res/20, this.res-this.res/10, this.res-this.res/10);
        }
    }
}