/**
 * Created by mpnguyen on 21/12/2016.
 */
(function () {
    function Bullet(x ,y, angle, ship) {
        this.Container_constructor();

        this.x0 = x;
        this.y0 = y;

        this.x = x;
        this.y = y;

        this.angle = angle;
        this.rotation = angle;
        this.ship = ship;

        this.speed = 0;
        this.firePower = 0;
    }

    var prototypeBullet = createjs.extend(Bullet, createjs.Container);

    prototypeBullet.update = function(event) {
        var deltaTime = event.delta/1000;

        //accelerate
        this.vX = Math.sin(this.angle * (Math.PI/-180));
        this.vY = Math.cos(this.angle * (Math.PI/-180));

        this.x = this.x - this.vX * this.speed * deltaTime;
        this.y = this.y - this.vY * this.speed * deltaTime;
        if (Utils.getDistanceBetweenTwoPoints(this.x, this.y, this.x0, this.y0) > this.firePower) {
            var explosion = new Explosion(this.x, this.y);
            Global.getInstance().listBullet.splice(Global.getInstance().listBullet.indexOf(this), 1);
            Global.getInstance().world.children.splice(Global.getInstance().world.children.indexOf(this), 1);
        }

        if (this.ship.listTarget.length > 0) {
            for (var i = 0; i < this.ship.listTarget.length; i++) {
                for (var j = 0; j < this.ship.listTarget[i].listPiece.length; j++) {
                    var piece = this.ship.listTarget[i].listPiece[j];
                    if (!piece|| !this) continue;
                    var intersection = ndgmr.checkPixelCollision(this.bitmap, piece.bitmap, 0, true);
                    if (intersection) {
                        var explosion = new Explosion(this.x, this.y);
                        this.ship.listTarget[i].listPiece[j].health -= this.damage;
                        this.ship.listTarget[i].listPiece[j].regenDelay = Constants.REGEN_DELAY;
                        Global.getInstance().world.children.splice(Global.getInstance().world.children.indexOf(this), 1);
                        //Global.getInstance().listBullet.splice(Global.getInstance().listBullet.indexOf(this), 1);
                        Global.getInstance().listBullet[Global.getInstance().listBullet.indexOf(this)] = undefined;
                    }
                }
            }
        }
    };

    window.Bullet = createjs.promote(Bullet, 'Container');
}());
