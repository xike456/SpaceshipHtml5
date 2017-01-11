/**
 * Created by mp_ng on 1/11/2017.
 */
(function () {
    function Explosion(x, y, isBigBang) {
        this.showExplosion(x, y, isBigBang);
    }

    Explosion.prototype.showExplosion = function (x, y, isBigBang) {
        var ssExplosion = new createjs.SpriteSheet({
            "images": ["img/Explosion/explosion.png"],
            "frames":
                {
                    "height": 516,
                    "width":514.5,
                    "regX": 257,
                    "regY": 258,
                    "count": 5
                },
            "animations": { "explosion": [0, 4, "fire", 0.3] }
        });

        var explosion = new createjs.Sprite(ssExplosion, "explosion");

        explosion.x = x;
        explosion.y = y;

        if (isBigBang) {
            explosion.scaleX = 0.2;
            explosion.scaleY = 0.2;
        } else {
            explosion.scaleX = 0.05;
            explosion.scaleY = 0.05;
        }

        explosion.framerate = 1;

        explosion.on("animationend", this.handleExplosionAnimationEnd, explosion);
        Global.getInstance().world.addChild(explosion);
    };

    Explosion.prototype.handleExplosionAnimationEnd = function (event) {
        if (event.name == "explosion") {
            event.remove();
            Global.getInstance().world.removeChild(this);
        }
    };

    Explosion.prototype.tick = function (event) {

    };

    window.Explosion = Explosion;
}());
