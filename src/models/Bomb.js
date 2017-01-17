/**
 * Created by mp_ng on 1/15/2017.
 */
(function () {
    function Bomb(x ,y) {
        this.Container_constructor();

        this.bomb = new createjs.Bitmap("img/Obstacles/bomb.png");
        this.bomb.x = 0;
        this.bomb.y = 0;
        this.bomb.regX = Constants.BOMB_WIDTH/2;
        this.bomb.regY = Constants.BOMB_HEIGHT/2;
        this.bomb.rotation = 0;
        this.scaleX = 0.0;
        this.scaleY = 0.0;
        this.addChild(this.bomb);
        this.changeRotation = 30;
        this.x = x;
        this.y = y;
    }

    var prototypeBomb = createjs.extend(Bomb, createjs.Container);

    prototypeBomb.update = function(event) {
        var deltaTime = event.delta/1000;

        if (this.scaleX < 0.3) {
            this.scaleX += 0.2*deltaTime
            this.scaleY += 0.2*deltaTime
        }
        this.rotation += this.changeRotation * deltaTime;
    };

    window.Bomb = createjs.promote(Bomb, 'Container');
}());
