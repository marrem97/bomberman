class PowerUp {
    constructor() {
        this.bombs = 0;
        this.range = 0;
        this.speed = 0;
        this.shield = false;

        const iType = Math.floor(Math.random() * 5);

        switch (iType) {
            case 0:
                this.image = window.game._powerup_range;
                this.range = 1;
                break;
            case 1:
                this.image = window.game._powerup_bomb;
                this.bombs = 1;
                break;
            case 2:
                this.image = window.game._powerup_shield;
                this.shield = true;
                break;
            case 3:
                this.image = window.game._powerup_speed;
                this.speed = 4;
                break;
            case 4:
                this.image = window.game._powerup_kicker;
                this.kicker = true;
                break;
        }
    }
}