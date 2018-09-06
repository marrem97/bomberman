class Canvas {
    constructor(res) {
        this.res = res;
    }

    getCtx() {
        return document.getElementById("canvas").getContext("2d");
    }

    drawCell(o) {
        const ctx = this.getCtx();
        ctx.fillStyle = o.wall ? "black" : "gray";
        ctx.fillRect(o.x*this.res,o.y*this.res,this.res,this.res);
        ctx.strokeStyle = "white";
        ctx.strokeRect(o.x*this.res,o.y*this.res,this.res,this.res);

        ctx.fillStyle = "white";
        ctx.fillText(o.x+" "+o.y,o.x*this.res+this.res/2,o.y*this.res+this.res/2);
    }

    drawPlayer() {

    }
}