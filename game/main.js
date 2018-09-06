window.game = new Game(800,600,50);

window.onload = () => {
    window.game.interval = setInterval(() => window.game.update(), 20);
}
