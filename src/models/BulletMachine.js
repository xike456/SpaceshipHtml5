/**
 * Created by mpnguyen on 22/12/2016.
 */
(function () {
    function BulletMachine(x ,y, angle) {
        Bullet.call(this, x ,y, angle);

        this.bitmap = new createjs.Bitmap("img/Bullets/bullet_machine.png");
        this.bitmap.x = 0;
        this.bitmap.y = 0;
        this.bitmap.scaleX = 0.1;
        this.bitmap.scaleY = 0.1;
        this.addChild(this.bitmap);

        this.regX = (this.bitmap.image.width * this.bitmap.scaleX) / 2;
        this.regY = (this.bitmap.image.height * this.bitmap.scaleY) / 2;

        this.damage = Constants.MACHINE_DAMAGE;
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