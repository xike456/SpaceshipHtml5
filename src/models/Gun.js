/**
 * Created by mp_ng on 12/17/2016.
 */
function Gun(piece_type, x ,y) {
    Piece.call(this, piece_type, x ,y);
}

Gun.prototype = Object.create(Piece.prototype);
Gun.prototype.constructor = Piece;