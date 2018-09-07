window.loadImg = (src, id) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.setAttribute("id", id);
		img.classList.add("hidden");
		document.body.appendChild(img);

		img.onload = () => {
			resolve();
		};

		img.onerror = () => {
			reject();
		};

		img.src = src;
	});
};

window.onload = () => {
	Promise.all([
		loadImg("./images/brickwall.png", "wall"),
		loadImg("./images/brickwall_2.png", "broken_wall"),
		loadImg("./images/bomb.png", "bomb"),
		loadImg("./images/powerup_range.png", "powerup_range"),
		loadImg("./images/powerup_bomb.png", "powerup_bomb"),
		loadImg("./images/powerup_shield.png", "powerup_shield"),
		loadImg("./images/powerup_speed.png", "powerup_speed"),
		loadImg("./images/powerup_kicker.png", "powerup_kicker"),
		loadImg("./images/explosion.png", "explosion"),
		loadImg("./images/mew.png", "mew"),
		loadImg("./images/snorlax.png", "snorlax"),
	]).then(() => {
		window.game = new Game(650, 650, 50);

		window.game.interval = setInterval(() => window.game.update(), 20);
	});
};
