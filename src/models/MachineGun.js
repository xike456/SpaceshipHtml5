/**
 * Created by mp_ng on 12/17/2016.
 */
(function () {
    function MachineGun(piece_type, x ,y) {
        Gun.call(this, piece_type, x ,y);
        this.gun = new createjs.Bitmap("img/Parts/64/SHIP6403.png");
        this.gun.x = 0;
        this.gun.y = 0;
        this.gun.regX = Constants.PIECE_WIDTH/2;
        this.gun.regY = Constants.PIECE_HEIGHT/2 + Constants.PIECE_HEIGHT / 4;
        this.gun.rotation = 0;
        this.addChild(this.gun);

        this.fireDelay = Constants.MACHINE_FIRE_DELAY;
        this.shootRange = Constants.MACHINE_FIREPOWER;
        this.type = Constants.COMPONENT_TYPE.MACHINE_GUN;
    }

    MachineGun.prototype = Object.create(Gun.prototype);
    MachineGun.prototype.constructor = Gun;

    MachineGun.prototype.update = function(event) {
        Gun.prototype.update.call(this, event);
    };

    MachineGun.prototype.fire = function (event) {
        if (this.fireDelay < Constants.MACHINE_FIRE_DELAY) {
            return;
        }
        var posOnShip = this.gun.localToGlobal(this.gun.x + Constants.PIECE_WIDTH / 2, this.gun.y - Constants.PIECE_HEIGHT / 4);
        var posOnWorld = Global.getInstance().world.globalToLocal(posOnShip.x, posOnShip.y);
        var newRotation = this.gun.rotation + (Math.random() - 0.5) * 20;
        var bullet = new BulletMachine(posOnWorld.x, posOnWorld.y, newRotation + this.parent.rotation, this.parent);
        Global.getInstance().listBullet.push(bullet);
        Global.getInstance().world.addChild(bullet);
        Utils.playSound(Constants.SOUND.MACHINE_SHOT);
        this.fireDelay = 0;
    };

    window.MachineGun = MachineGun;
}());