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
		loadImg("./images/wall.png", "wall"),
		loadImg("./images/broken-wall.png", "broken_wall"),
		loadImg("./images/bomb.png", "bomb")
	]).then(() => {
		window.game = new Game(650, 650, 50);

		window.game.interval = setInterval(() => window.game.update(), 20);
	});
};
