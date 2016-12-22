/**
 * Created by mpnguyen on 22/12/2016.
 */
(function () {
    function BulletMachine(x ,y, angle) {
        Bullet.call(this, x ,y, angle);

        var bitmap = new createjs.Bitmap("img/Bullets/bullet_machine.png");
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.scaleX = 0.1;
        bitmap.scaleY = 0.1;
        this.addChild(bitmap);

        this.regX = (bitmap.image.width * bitmap.scaleX) / 2;
        this.regY = (bitmap.image.height * bitmap.scaleY) / 2;

        this.speed = Constants.BULLET_MACHINE_SPEED;
        this.firePower = Constants.MACHINE_FIREPOWER;
    }

    BulletMachine.prototype = Object.create(Bullet.prototype);
    BulletMachine.prototype.constructor = Bullet;

    BulletMachine.prototype.update = function(event) {
        Bullet.prototype.update.call(this, event);
    };

    window.BulletMachine = BulletMachine;
}());