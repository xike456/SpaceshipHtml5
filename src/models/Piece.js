/**
 * Created by mp_ng on 12/11/2016.
 */
(function () {
    function Piece(piece_type, x ,y) {
        this.Container_constructor();
        this.bitmap = new createjs.Bitmap("img/Parts/64/SHIP6402.png");
        this.bitmap.x = 0;
        this.bitmap.y = 0;
        this.bitmap.regX = Constants.PIECE_WIDTH/2;
        this.bitmap.regY = Constants.PIECE_HEIGHT/2;
        this.addChild(this.bitmap);
        this.x = x * Constants.RATIO_X * Constants.PIECE_WIDTH/2;
        this.y = y * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2;
        this.aroundPos = this.calculateAroundPos(x, y);

        this.health = Constants.NORMAL_HP;
    }

    var prototypePiece = createjs.extend(Piece, createjs.Container);

    prototypePiece.update = function(event) {
        if (this.health <= 0) {
            var posGlobal = this.parent.localToGlobal(this.x, this.y);
            var posOnWorld = Global.getInstance().world.globalToLocal(posGlobal.x, posGlobal.y);
            var explosion = new Explosion(posOnWorld.x, posOnWorld.y, true);
            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            this.parent.listPiece.splice(this.parent.listPiece.indexOf(this), 1);
            return;
        }

        for (var i = 0; i < Global.getInstance().listPiece.length; i++) {
            var intersection = ndgmr.checkPixelCollision(this.bitmap, Global.getInstance().listPiece[i].bitmap, 0, true);
            if (intersection) {
                var result = this.parent.addPiece(this, Global.getInstance().listPiece[i]);
                if (result) {
                    Global.getInstance().listPiece.splice(i, 1);
                    break;
                }
            }
        }
    };

    prototypePiece.calculateNewAroundPos = function () {
        var listPos = [];
        var x = this.x / (Constants.RATIO_X * Constants.PIECE_WIDTH/2);
        var y = this.y / (Constants.RATIO_Y * Constants.PIECE_HEIGHT/2);
        listPos.push({
            x: x * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y - 2) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: x * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y + 2) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x - 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y - 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x + 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y + 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x - 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y + 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x + 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y - 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        this.aroundPos = listPos;
    };

    prototypePiece.calculateAroundPos = function(x, y) {
        var listPos = [];
        listPos.push({
            x: x * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y - 2) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: x * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y + 2) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x - 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y - 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x + 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y + 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x - 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y + 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        listPos.push({
            x: (x + 2) * Constants.RATIO_X * Constants.PIECE_WIDTH/2,
            y: (y - 1) * Constants.RATIO_Y * Constants.PIECE_HEIGHT/2
        });

        return listPos;
    };

    window.Piece = createjs.promote(Piece, 'Container');
}());
