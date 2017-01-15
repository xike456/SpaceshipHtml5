(function () {
    function Ship(pieces) {
        this.Container_constructor();
        this.x = 0;
        this.y = 0;
        this.vX = 0;
        this.vY = 0;
        this.listPiece = [];
        this.listTarget = [];
        this.addBody(pieces);
        this.rotation = 0;
        this.speedPower = 0;
        this.shootRange = Constants.SHOOT_RANGE;
        this.speed = Constants.SHIP_SPEED;
        this.maxPower = 0;
        this.matrixPath = undefined;
        this.mainIndex = 0;
        this.pieceInRange = [];
        this.hp = 0;
    };

    var prototypeShip = createjs.extend(Ship, createjs.Container);

    var browserW = $(window).innerWidth()/2;//window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);// $(window).innerWidth();
    var browserH = $(window).innerHeight()/2;//window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);//$(window).innerHeight();

    prototypeShip.update = function (event) {
        this.scanPiece();
        for (var i = this.listPiece.length - 1; i >= 0; i--) {
            if (this.listPiece[i] === undefined) {
                this.listPiece.splice(i, 1);
            }
        }
        this.calculatePower();
        this.calculateMainIndex();
        this.hp = this.mainIndex>=0? this.listPiece[this.mainIndex].health : 0;
    };

    prototypeShip.calculateMainIndex =function () {
        for (var i =0; i< this.listPiece.length; i++) {
            if(this.listPiece[i].type === Constants.COMPONENT_TYPE.CABIN) {
                this.mainIndex = i;
                return;
            }
        }
        this.mainIndex = -1;
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
        this.getMatrixPath();
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
                if(this === Global.getInstance().player) {
                    Global.getInstance().game.zoomScreen(this.listPiece.length);
                    console.log("resize");
                }
                this.shootRange += 30;
                return true;
            }
        };
    };

    prototypeShip.scanPiece = function () {
        this.pieceInRange = [];
        for (var i = 0; i < Global.getInstance().listPiece.length; i++) {
            if(Utils.getDistanceBetweenTwoPoints(this.x, this.y,
                    Global.getInstance().listPiece[i].x, Global.getInstance().listPiece[i].y) < Constants.SHOOT_RANGE){
                this.pieceInRange.push(Global.getInstance().listPiece[i]);
            }
        }
    };

    prototypeShip.isPosEmpty = function (pos) {
        return this.listPiece.filter(function (piece) {
            return (piece.x === pos.x && piece.y === pos.y);
        }).length <= 0;
    };

    prototypeShip.calculatePower = function () {
        this.maxPower = 0;
        for (var i = 0; i < this.listPiece.length; i++) {
            if(this.listPiece[i].type === Constants.COMPONENT_TYPE.PROPULSOR){
                this.maxPower += this.listPiece[i].power;
            }
        }
        if(this.speedPower > this.maxPower) {
            this.speedPower = this.maxPower;
        }
        if(this.speedPower === 0) {
            this.speedPower = this.maxPower;
        }
    };

    prototypeShip.turboBoost = function (deltatime) {
        if(this.speedPower <= 0){
            if(this.speed > Constants.SHIP_SPEED){
                this.speed -= 70 * deltatime;
            }
            console.log("slow down");
            return;
        }
        if(this.speed < Constants.SHIP_MAX_SPEED && this.speedPower > 0) {
            this.speed += 200 * deltatime;
            this.speedPower -= 100 * deltatime;
        }
        else {
            this.speedPower -= 100 * deltatime;
        }
    };

    prototypeShip.regen = function (deltatime) {
        if(this.speed > Constants.SHIP_SPEED) {
            this.speed -= 100 * deltatime;
        }
        if(this.speedPower < this.maxPower) {
            this.speedPower += 50 * deltatime;
        }
    };

    prototypeShip.getMatrixPath = function () {
        var map = new Array(this.listPiece.length);
        for (var i = 0; i < this.listPiece.length; i++) {
            map[i] = new Array(this.listPiece.length);
        }
        this.mainIndex = -1;
        for (var i = 0; i < this.listPiece.length; i++) {
            if (this.listPiece[i] && this.listPiece[i].type === Constants.COMPONENT_TYPE.CABIN) {
                this.mainIndex = i;
            }
            for (var j = i; j < this.listPiece.length; j++) {
                map[i][j] = 0;
                map[j][i] = 0;
                if (!this.listPiece[i] || !this.listPiece[j]) continue;
                if (Utils.getDistanceBetweenTwoPoints(this.listPiece[i].x, this.listPiece[i].y, this.listPiece[j].x, this.listPiece[j].y)
                    < Constants.PIECE_HEIGHT + Constants.PIECE_HEIGHT/4) {
                    map[i][j] = 1;
                    map[j][i] = 1;
                }
            }
        }

        this.matrixPath = map;
    };

    prototypeShip.getPath = function (n, m) {
        if (this.mainIndex == -1)
            return false;
        var map = this.matrixPath;
        if (!map) return;
        var mark = new Array(this.listPiece.length);
        var quence = [];
        quence.push(n);
        while (quence.length > 0) {
            var index = quence.pop();
            mark[index] = true;
            for (var i = 0; i< this.listPiece.length; i++) {
                if (map[index][i] === 1 && !mark[i]) {
                    if (i === m)
                        return true;
                    quence.push(i);
                }
            }
        }
        return false;
    };

    window.Ship = createjs.promote(Ship, 'Container');
}());