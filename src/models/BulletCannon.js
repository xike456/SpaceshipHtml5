/**
 * Created by mpnguyen on 22/12/2016.
 */
(function () {
    function BulletCannon(x ,y, angle, ship) {
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
    }

    BulletCannon.prototype = Object.create(Bullet.prototype);
    BulletCannon.prototype.constructor = Bullet;

    BulletCannon.prototype.update = function(event) {
        Bullet.prototype.update.call(this, event);
    };

    window.BulletCannon = BulletCannon;
}());
