/**
 * Created by mp_ng on 12/17/2016.
 */
(function () {
    function Gun(piece_type, x ,y) {
        Piece.call(this, piece_type, x ,y);
        this.health = Constants.GUN_HP;
        this.sTarget = undefined;
    }

    Gun.prototype = Object.create(Piece.prototype);
    Gun.prototype.constructor = Piece;

    Gun.prototype.update = function(event) {
        Piece.prototype.update.call(this, event);

        this.fireDelay += event.delta / 1000;

        if (Global.getInstance().listTarget.length > 0) {
            var posG = this.parent.localToGlobal(this.x, this.y);
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
            var pieceIndex = -1;
            var minRangePiece = -1;
            for (var i = 0; i < this.sTarget.listPiece.length; i++){
                var piece = this.sTarget.listPiece[i];
                var posP = this.sTarget.localToGlobal(piece.x, piece.y);
                posP = Global.getInstance().world.globalToLocal(posP.x, posP.y);
                var distance = Math.sqrt((posP.x - posG.x)*(posP.x - posG.x) + (posP.y - posG.y)*(posP.y - posG.y));
                if(distance - Constants.PIECE_HEIGHT <= this.shootRange && (minRangePiece > distance || minRangePiece === -1)) {
                    shooting = true;
                    pieceIndex = i;
                    minRangePiece = distance;
                    posE = posP;
                }
            }

            if(shooting && minRangePiece > Constants.PIECE_HEIGHT) {
                var angle = Math.atan2(posE.y - posG.y, posE.x - posG.x);
                angle = angle * 180 / (Math.PI) + 90 - this.parent.rotation;
                this.gun.rotation = angle;

                this.fire();
            }
        }
    };

    window.Gun = Gun;
}());