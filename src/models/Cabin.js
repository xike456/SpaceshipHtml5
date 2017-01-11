/**
 * Created by mp_ng on 12/17/2016.
 */
(function () {
    function Cabin(piece_type, x ,y) {
        Piece.call(this, piece_type, x ,y);
        var bitmap = new createjs.Bitmap("img/Parts/64/SHIP6406.png");
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.regX = Constants.PIECE_WIDTH/2;
        bitmap.regY = Constants.PIECE_HEIGHT/2;
        this.addChild(bitmap);

        this.health = Constants.CABIN_HP;
    }

    Cabin.prototype = Object.create(Piece.prototype);
    Cabin.prototype.constructor = Piece;

    window.Cabin = Cabin;
}());