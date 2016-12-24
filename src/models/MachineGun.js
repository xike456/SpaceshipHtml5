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
    }

    MachineGun.prototype = Object.create(Gun.prototype);
    MachineGun.prototype.constructor = Gun;

    MachineGun.prototype.update = function(event) {
        Gun.prototype.update.call(this, event);

        var browserW = $(window).innerWidth()/2;
        var browserH = $(window).innerHeight()/2;

        var mousePos = Global.getInstance().mouseHelper.getMousePos();
        var lenghX = Math.sqrt((mousePos.x - browserW)*(mousePos.x - browserW) + (mousePos.y - browserH)*(mousePos.y - browserH));
        var lenghX0 = Math.sqrt((mousePos.x - browserW)*(mousePos.x - browserW));

        var angle = Math.acos(lenghX0/lenghX);
        if (mousePos.x < browserW) {
            if (mousePos.y < browserH) {
                angle = angle +  Math.PI;
            } else {
                angle = Math.PI - angle;
            }
        } else {
            if (mousePos.y < browserH) {
                angle = Math.PI*2 - angle;
            } else {

            }
        }
        angle = angle * 180 / (Math.PI) + 90 - this.parent.rotation;
        this.gun.rotation = angle;

        this.fireDelay += event.delta/1000;
        if (Global.getInstance().keyboardHelper.isKeyDown(Constants.KEYCODE_W)) {
            this.fire();
        }
    };

    MachineGun.prototype.fire = function (event) {
        if (this.fireDelay < Constants.MACHINE_FIRE_DELAY) {
            return;
        }
        var posOnShip = this.gun.localToGlobal(this.gun.x + Constants.PIECE_WIDTH / 2, this.gun.y - Constants.PIECE_HEIGHT / 4);
        var posOnWorld = Global.getInstance().world.globalToLocal(posOnShip.x, posOnShip.y);
        var bullet = new BulletMachine(posOnWorld.x, posOnWorld.y, this.gun.rotation + this.parent.rotation);
        Global.getInstance().listBullet.push(bullet);
        Global.getInstance().world.addChild(bullet);
        this.fireDelay = 0;
    };

    window.MachineGun = MachineGun;
}());