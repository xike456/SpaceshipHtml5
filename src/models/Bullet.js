/**
 * Created by mpnguyen on 21/12/2016.
 */
(function () {
    function Bullet(x ,y, angle) {
        this.Container_constructor();

        this.x0 = x;
        this.y0 = y;

        this.x = x;
        this.y = y;

        this.angle = angle;
        this.rotation = angle;

        this.speed = 0;
        this.firePower = 0;
    }

    var prototypeBullet = createjs.extend(Bullet, createjs.Container);

    prototypeBullet.update = function(event) {
        var deltaTime = event.delta/1000;

        //accelerate
        this.vX = Math.sin(this.angle * (Math.PI/-180));
        this.vY = Math.cos(this.angle * (Math.PI/-180));
        if (this.vX == 0) {
            console.log('test');
        }

        this.x = this.x - this.vX * this.speed * deltaTime;
        this.y = this.y - this.vY * this.speed * deltaTime;
        if (Utils.getDistanceBetweenTwoPoints(this.x, this.y, this.x0, this.y0) > this.firePower) {
            Global.getInstance().listBullet.splice(Global.getInstance().listBullet.indexOf(this), 1);
            Global.getInstance().world.children.splice(Global.getInstance().world.children.indexOf(this), 1);
        }

        if (Global.getInstance().listTarget.length > 0) {

            for (var i = 0; i < Global.getInstance().listTarget.length; i++) {
                for (var j = 0; j < Global.getInstance().listTarget[i].listPiece.length; j++) {
                    var piece = Global.getInstance().listTarget[i].listPiece[j];
                    var intersection = ndgmr.checkPixelCollision(this.bitmap, piece.bitmap, 0, true);
                    if (intersection) {
                        var explosion = new Explosion(this.x, this.y);
                        Global.getInstance().listTarget[i].listPiece[j].health -= this.damage;
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
