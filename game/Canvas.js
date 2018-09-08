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
                o.age = 0;
                ctx.fillStyle = "#81a3b4";
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
                ctx.drawImage(game._explosion, x, y, this.res, this.res);
                // ctx.fillStyle = "rgba(255,0,0,0.8)";
                // ctx.fillRect(x, y, this.res, this.res);
                o.age++;
                if (o.age > 15) {
                    o.state = 0;
                }
        }

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
            if (!o.animation) o.animation = 0;
            o.animation = o.animation > 10 ? -10 : o.animation + 1;
            let offset = 0;
            if (o.animation < 0) {
                offset = this.res/20;
            } else {
                offset = this.res/10;
            }
            ctx.drawImage(game._bomb, x+offset, y+offset, this.res-offset*2, this.res-offset*2);
        }
    }
}