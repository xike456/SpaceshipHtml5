/**
 * Created by mp_ng on 12/17/2016.
 */
function MachineGun(piece_type, x ,y) {
    Gun.call(this, piece_type, x ,y);
    var bitmap = new createjs.Bitmap("img/Parts/64/SHIP6403.png");
    bitmap.x = -Constants.PIECE_WIDTH/2;
    bitmap.y = -Constants.PIECE_HEIGHT/2 - Constants.PIECE_HEIGHT / 4;
    this.addChild(bitmap);
}

MachineGun.prototype = Object.create(Gun.prototype);
MachineGun.prototype.constructor = Gun;