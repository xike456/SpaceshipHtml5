/**
 * Created by mpnguyen on 22/12/2016.
 */
(function () {
    function BulletCannon(x ,y, angle, ship, target) {
        Bullet.call(this, x ,y, angle, ship);

        this.bitmap = new createjs.Bitmap("img/Bullets/bullet_cannon.png");
        this.bitmap.x = 0;
        this.bitmap.y = 0;
        this.bitmap.scaleX = 0.1;
        this.bitmap.scaleY = 0.1;
        this.addChild(this.bitmap);

        this.regX = (this.bitmap.image.width * this.bitmap.scaleX) / 2;
        this.regY = (this.bitmap.image.height * this.bitmap.scaleY) / 2;

        this.damage = Constants.CANNON_DAMAGE;
        this.speed = Constants.BULLET_CANNON_SPEED;
        this.firePower = Constants.CANNON_FIREPOWER;

        if (target) {
            this.target = target;
        }
    }

    BulletCannon.prototype = Object.create(Bullet.prototype);
    BulletCannon.prototype.constructor = Bullet;

    BulletCannon.prototype.update = function(event) {
        Bullet.prototype.update.call(this, event);

        if (this.target) {
            var deltaTime = event.delta/1000;
            var posGlobal = this.target.parent.localToGlobal(this.target.x, this.target.y);
            var posE = Global.getInstance().world.globalToLocal(posGlobal.x, posGlobal.y);
            var angle = Math.atan2(posE.y - this.y, posE.x - this.x);
            angle = angle * 180 / (Math.PI) + 90;
            this.rotation = angle;
            this.vX = Math.sin(angle * (Math.PI/-180));
            this.vY = Math.cos(angle * (Math.PI/-180));
            this.x = this.x - this.vX * this.speed * deltaTime;
            this.y = this.y - this.vY * this.speed * deltaTime;

            if (Math.round(this.x) === Math.round(posE.x) && Math.round(this.y) === Math.round(posE.y)) {
                var explosion = new Explosion(this.x, this.y);
                Global.getInstance().listBullet.splice(Global.getInstance().listBullet.indexOf(this), 1);
                Global.getInstance().world.children.splice(Global.getInstance().world.children.indexOf(this), 1);
            }
        }
    };

    window.BulletCannon = BulletCannon;
}());
