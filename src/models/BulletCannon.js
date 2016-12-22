/**
 * Created by mpnguyen on 22/12/2016.
 */
(function () {
    function BulletCannon(x ,y, angle) {
        Bullet.call(this, x ,y, angle);

        var bitmap = new createjs.Bitmap("img/Bullets/bullet_cannon.png");
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.scaleX = 0.1;
        bitmap.scaleY = 0.1;
        this.addChild(bitmap);

        this.regX = (bitmap.image.width * bitmap.scaleX) / 2;
        this.regY = (bitmap.image.height * bitmap.scaleY) / 2;

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
