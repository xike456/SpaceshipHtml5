(function () {
    function Ship(pieces) {
        this.Container_constructor();
        this.x = 0;
        this.y = 0;
        this.vX = 0;
        this.vY = 0;
        this.listPiece = [];
        this.addBody(pieces);
        this.rotation = 0;
    };

    var prototypeShip = createjs.extend(Ship, createjs.Container);

    var browserW = $(window).innerWidth()/2;//window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);// $(window).innerWidth();
    var browserH = $(window).innerHeight()/2;//window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);//$(window).innerHeight();

    prototypeShip.update = function (event) {
        this.listPiece.forEach(function (piece) {
            piece.update(event);
        });
    };

    prototypeShip.addBody = function (pieces) {
        for (var i = 0; i < pieces.length; i++) {
            var piece;
            switch (pieces[i].type) {
                case Constants.COMPONENT_TYPE.CABIN:
                    piece = new Cabin(pieces[i].type, pieces[i].x, pieces[i].y);
                    break;
                case Constants.COMPONENT_TYPE.PROPULSOR:
                    piece = new Propulsor(pieces[i].type, pieces[i].x, pieces[i].y);
                    break;
                case Constants.COMPONENT_TYPE.ARMOR:
                    piece = new Armor(pieces[i].type, pieces[i].x, pieces[i].y);
                    break;
                case Constants.COMPONENT_TYPE.MACHINE_GUN:
                    piece = new MachineGun(pieces[i].type, pieces[i].x, pieces[i].y);
                    break;
                case Constants.COMPONENT_TYPE.CANNON:
                    piece = new Cannon(pieces[i].type, pieces[i].x, pieces[i].y);
                    break;
                default:
                    piece = new Piece(pieces[i].type, pieces[i].x, pieces[i].y);
                    break;
            }
            this.addChild(piece);
            this.listPiece.push(piece);
        }
    };

    prototypeShip.addPiece = function (piece, newPiece) {
        var isFull = true;
        for (var i = 0; i < piece.aroundPos.length; i++) {
            if (this.isPosEmpty(piece.aroundPos[i])) {
                isFull = false;
                break;
            }
        }

        while (!isFull){
            var pos = piece.aroundPos[Math.round(Math.random() * 6 - 0.5)];
            if (this.isPosEmpty(pos)) {
                Global.getInstance().world.children.splice(
                    Global.getInstance().world.children.indexOf(newPiece),1);
                newPiece.x = pos.x;
                newPiece.y = pos.y;
                newPiece.calculateNewAroundPos();
                this.addChild(newPiece);
                this.listPiece.push(newPiece);
                return true;
            }
        };
    };

    prototypeShip.isPosEmpty = function (pos) {
        return this.listPiece.filter(function (piece) {
            return (piece.x === pos.x && piece.y === pos.y);
        }).length <= 0;
    };

    window.Ship = createjs.promote(Ship, 'Container');
}());