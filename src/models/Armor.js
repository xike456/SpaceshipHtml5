/**
 * Created by mp_ng on 12/17/2016.
 */
(function () {
    function Armor(piece_type, x ,y) {
        Piece.call(this, piece_type, x ,y);
        var bitmap = new createjs.Bitmap("img/Parts/64/SHIP6401.png");
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.regX = Constants.PIECE_WIDTH/2;
        bitmap.regY = Constants.PIECE_HEIGHT/2;
        this.addChild(bitmap);
        this.health = Constants.ARMOR_HP;
    }

    Armor.prototype = Object.create(Piece.prototype);
    Armor.prototype.constructor = Piece;

    Armor.prototype.update = function(event) {
        Piece.prototype.update.call(this, event);
    };

    window.Armor = Armor;
}());