/**
 * Created by mp_ng on 12/11/2016.
 */
function Piece(piece_type, x ,y) {
    prototypePiece.initialize(piece_type,x ,y);
    var bitmap = new createjs.Bitmap("img/Parts/64/SHIP6401.png");
    bitmap.x = 0;
    bitmap.y = 0;
    this.addChild(bitmap);
    this.x = x * Constants.RATIO_X * Constants.PIECE_WIDTH/2;
    this.y = y * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2;
}

var prototypePiece = Piece.prototype = new createjs.Container();

prototypePiece.Container_initialize = prototypePiece.initialize;

prototypePiece.initialize = function () {
    this.Container_initialize();
};
