/**
 * Created by mp_ng on 12/11/2016.
 */
(function () {
    function Piece(piece_type, x ,y) {
        this.Container_constructor();
        var bitmap = new createjs.Bitmap("img/Parts/64/SHIP6402.png");
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.regX = Constants.PIECE_WIDTH/2;
        bitmap.regY = Constants.PIECE_HEIGHT/2;
        this.addChild(bitmap);
        this.x = x * Constants.RATIO_X * Constants.PIECE_WIDTH/2;
        this.y = y * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2;
    }

    var prototypePiece = createjs.extend(Piece, createjs.Container);

    prototypePiece.update = function(event) {

    };

    window.Piece = createjs.promote(Piece, 'Container');
}());
