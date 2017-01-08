/**
 * Created by mp_ng on 12/17/2016.
 */
(function () {
    function Gun(piece_type, x ,y) {
        Piece.call(this, piece_type, x ,y);
    }

    Gun.prototype = Object.create(Piece.prototype);
    Gun.prototype.constructor = Piece;

    Gun.prototype.update = function(event) {
        Piece.prototype.update.call(this, event);
        if (Global.getInstance().eTarget) {

            var posE = { x: Global.getInstance().eTarget.x, y: Global.getInstance().eTarget.y }
            var posG = this.gun.localToGlobal(this.gun.x + Constants.PIECE_WIDTH/2, this.gun.y - Constants.PIECE_HEIGHT/4);
            posG = Global.getInstance().world.globalToLocal(posG.x, posG.y);

            var angle = Math.atan2(posE.y - posG.y, posE.x - posG.x);
            angle = angle * 180 / (Math.PI) + 90 - this.parent.rotation;
            this.gun.rotation = angle;

            this.fireDelay += event.delta / 1000;
            this.fire();
        }
    };

    window.Gun = Gun;
}());