/**
 * Created by mp_ng on 12/17/2016.
 */
(function () {
    function Gun(piece_type, x ,y) {
        Piece.call(this, piece_type, x ,y);

        this.sTarget = undefined;
    }

    Gun.prototype = Object.create(Piece.prototype);
    Gun.prototype.constructor = Piece;

    Gun.prototype.update = function(event) {
        Piece.prototype.update.call(this, event);

        this.fireDelay += event.delta / 1000;

        if (Global.getInstance().listTarget.length > 0) {
            var posG = this.gun.localToGlobal(this.gun.x + Constants.PIECE_WIDTH/2, this.gun.y - Constants.PIECE_HEIGHT/4);
            posG = Global.getInstance().world.globalToLocal(posG.x, posG.y);

            var distances = [];
            var posE;
            for (var i = 0; i < Global.getInstance().listTarget.length; i++) {
                posE = { x: Global.getInstance().listTarget[i].x, y: Global.getInstance().listTarget[i].y };
                var distance = Math.sqrt((posE.x - posG.x)*(posE.x - posG.x) + (posE.y - posG.y)*(posE.y - posG.y));
                distances.push(distance);
            }

            var minIndex = 0;
            var minValue = distances[minIndex];
            for (var i = 0; i < distances.length; i++) {
                if(minValue > distances[i]){
                    minIndex = i;
                    minValue = distances[minIndex];
                }
            }

            this.sTarget = Global.getInstance().listTarget[minIndex];
            var shooting = false;
            for (var i = 0; i < this.sTarget.listPiece.length; i++){
                var piece = this.sTarget.listPiece[i];
                var posP = piece.localToGlobal(piece.x + Constants.PIECE_WIDTH/2, piece.y - Constants.PIECE_HEIGHT/4);
                posP = Global.getInstance().world.globalToLocal(posP.x, posP.y);

                var distance = Math.sqrt((posP.x - posG.x)*(posP.x - posG.x) + (posP.y - posG.y)*(posP.y - posG.y));
                if(distance <= this.shootRange){
                    shooting = true;
                }
            }

            posE = { x: this.sTarget.x, y: this.sTarget.y };
            if(shooting) {
                var angle = Math.atan2(posE.y - posG.y, posE.x - posG.x);
                angle = angle * 180 / (Math.PI) + 90 - this.parent.rotation;
                this.gun.rotation = angle;

                this.fire();
            }
        }
    };

    window.Gun = Gun;
}());