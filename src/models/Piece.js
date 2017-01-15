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
        this.vX = 0;
        this.vY = 0;
        this.speed = 0;
        this.canCollect = true;
        this.aroundPos = this.calculateAroundPos(x, y);

        this.regenDelay = 0;
        this.health = Constants.NORMAL_HP;
        this.maxHealth = Constants.NORMAL_HP;
        this.type = Constants.COMPONENT_TYPE.BASE;
    }

    var prototypePiece = createjs.extend(Piece, createjs.Container);

    prototypePiece.clone = function () {
        return new Piece('', this.x, this.y);
    };

    prototypePiece.update = function(event) {
        //floating on world if break from ship
        if (this.speed > 0) {
            this.x -= this.vX * this.speed * event.delta/1000;
            this.y += this.vY * this.speed * event.delta/1000;
            this.speed -= Constants.FLOATING_SPEED * event.delta/1000;
            if (this.speed <= 0) {
                this.canCollect = true;
            }
            return;
        }

        if (this.parent === Global.getInstance().world || !this.parent) {
            return;
        }

        //regen health if not being attacked
        this.regenate(event.delta/1000);
        //check when health < 0, broken
        if (this.health <= 0) {
            var posGlobal = this.parent.localToGlobal(this.x, this.y);
            var posOnWorld = Global.getInstance().world.globalToLocal(posGlobal.x, posGlobal.y);
            var explosion = new Explosion(posOnWorld.x, posOnWorld.y, true);
            var posParent = { x: this.parent.x, y: this.parent.y };
            var rotationParent = this.parent.rotation;
            var parent = this.parent;

            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            this.parent.listPiece[this.parent.listPiece.indexOf(this)] = undefined;
            //break from ship or destroyed
            if (Math.random() < 0.5 && this.type !== Constants.COMPONENT_TYPE.CABIN) {
                this.canCollect = false;
                this.x = posOnWorld.x;
                this.y = posOnWorld.y;
                var angle = Math.atan2(this.x - posParent.x, this.y - posParent.y);
                angle = angle * 180 / (Math.PI) + 90 - rotationParent + ((Math.random()/2 - 0.5) * 60);
                angle = angle * Math.PI / 180;
                var velocity = { vX: Math.cos(angle), vY: Math.sin(angle) };
                this.vX = velocity.vX;
                this.vY = velocity.vY;
                this.speed = Constants.FLOATING_SPEED;
                this.health = this.maxHealth;
                Global.getInstance().world.addChild(this);
                Global.getInstance().listPiece.push(this);
            }
            if (this.type === Constants.COMPONENT_TYPE.CABIN) {
                Utils.playSound(Constants.SOUND.CABIN_BREAK);
            } else {
                Utils.playSound(Constants.SOUND.PIECE_BREAK);
            }

            //check if still connect to cabin
            parent.getMatrixPath();
            if(this.parent.mainIndex === -1) {
                if(Global.getInstance().world.enemy.indexOf(parent))
                    Global.getInstance().world.enemy[Global.getInstance().world.enemy.indexOf(parent)] = undefined;
            }
            for (var i = 0; i < parent.listPiece.length; i++) {
                if (!parent.listPiece[i]) continue;
                if (i != parent.mainIndex && !parent.getPath(i, parent.mainIndex)) {
                    var piece = parent.listPiece[i];
                    parent.children.splice(parent.children.indexOf(piece), 1);
                    parent.listPiece[parent.listPiece.indexOf(piece)] = undefined;

                    piece.canCollect = false;
                    posGlobal = parent.localToGlobal(piece.x, piece.y);
                    posOnWorld = Global.getInstance().world.globalToLocal(posGlobal.x, posGlobal.y);
                    piece.x = posOnWorld.x;
                    piece.y = posOnWorld.y;
                    var angle = Math.atan2(piece.x - posParent.x, piece.y - posParent.y);
                    angle = angle * 180 / (Math.PI) + 90 - rotationParent + (Math.random()/2 - 1) * 60;
                    angle = angle * Math.PI / 180;
                    var velocity = { vX: Math.cos(angle), vY: Math.sin(angle) };
                    piece.vX = velocity.vX;
                    piece.vY = velocity.vY;
                    piece.speed = Constants.FLOATING_SPEED;
                    piece.health = piece.maxHealth;
                    Global.getInstance().world.addChild(piece);
                    Global.getInstance().listPiece.push(piece);
                }
            }
            if(parent === Global.getInstance().player)
                Global.getInstance().game.zoomScreen(Global.getInstance().player.listPiece.length);
            return;
        }
        if(this.parent.pieceInRange)
            for (var i = 0; i < this.parent.pieceInRange.length; i++) {
                if (!this.parent.pieceInRange[i] && !this) continue;
                var intersection = ndgmr.checkPixelCollision(this.bitmap, this.parent.pieceInRange[i].bitmap, 0, true);
                if (intersection && this.parent.pieceInRange[i].canCollect) {
                    var piece = this.parent.pieceInRange[i];
                    this.parent.pieceInRange.splice(i, 1);
                    var result = this.parent.addPiece(this, piece);
                    if (result) {
                        Global.getInstance().listPiece.splice(Global.getInstance().listPiece.indexOf(piece), 1);
                        break;
                    }
                }
            }

        if (this.parent.bombInRange)
            for (var i = 0; i < this.parent.bombInRange.length; i++) {
                if (!this.parent.bombInRange[i] && !this) continue;
                var intersection = ndgmr.checkPixelCollision(this.bitmap, this.parent.bombInRange[i].bomb, 0, true);
                if (intersection) {
                    var bomb = this.parent.bombInRange[i];
                    //this.parent.bombInRange.splice(i, 1);
                    Global.getInstance().world.listBomb.splice(Global.getInstance().world.listBomb.indexOf(bomb), 1);
                    Global.getInstance().world.removeChild(bomb);
                    var explosion = new Explosion(bomb.x, bomb.y, true);
                    for (var j = 0; j < this.parent.listPiece.length; j++) {
                        if (!this.parent.listPiece[j]) continue;
                        var piece = this.parent.listPiece[j];
                        var posGlobal = this.parent.localToGlobal(piece.x, piece.y);
                        var posOnWorld = Global.getInstance().world.globalToLocal(posGlobal.x, posGlobal.y);
                        if (Constants.BOMB_DAMAGE >= Utils.getDistanceBetweenTwoPoints(posOnWorld.x, posOnWorld.y, bomb.x, bomb.y)) {
                            piece.health -= (Constants.BOMB_DAMAGE - Utils.getDistanceBetweenTwoPoints(posOnWorld.x, posOnWorld.y, bomb.x, bomb.y));
                            piece.regenDelay = 3;
                        }
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

    prototypePiece.regenate = function (deltaTime) {
        if(this.regenDelay <= 0 && this.health < this.maxHealth){
            this.health += 20 * deltaTime;
        }
        else {
            this.regenDelay -= deltaTime;
        }
    };

    window.Piece = createjs.promote(Piece, 'Container');
}());
