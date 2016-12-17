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
        var deltaTime = event.delta/1000;
        var mousePos = Global.getInstance().mouseHelper.getMousePos();
        var lenghX = Math.sqrt((mousePos.x - browserW)*(mousePos.x - browserW) + (mousePos.y - browserH)*(mousePos.y - browserH));
        var lenghX0 = Math.sqrt((mousePos.x - browserW)*(mousePos.x - browserW));

        var angle = Math.acos(lenghX0/lenghX);
        if (mousePos.x < browserW) {
            if (mousePos.y < browserH) {
                angle = angle +  Math.PI;
            } else {
                angle = Math.PI - angle;
            }
        } else {
            if (mousePos.y < browserH) {
                angle = Math.PI*2 - angle;
            } else {

            }
        }

        //accelerate
        this.vX = Math.cos(angle);
        this.vY = Math.sin(angle);
        var tempX = this.x + this.vX * Constants.SHIP_SPEED * deltaTime;
        var tempY = this.y + this.vY * Constants.SHIP_SPEED * deltaTime;

        this.x = (tempX < 2000 && tempX > -2000)? tempX : (tempX < 0? -2000: 2000);
        this.y = (tempY < 2000 && tempY > -2000)? tempY : (tempY < 0? -2000: 2000);

        this.listPiece.forEach(function (piece) {
            piece.update(event);
        });

        if (Global.getInstance().keyboardHelper.isKeyDown(Constants.KEYCODE_A)) {
            this.rotation -= Constants.SHIP_ROTATION_SPEED * deltaTime;
        }

        if (Global.getInstance().keyboardHelper.isKeyDown(Constants.KEYCODE_D)) {
            this.rotation += Constants.SHIP_ROTATION_SPEED * deltaTime;
        }
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

    window.Ship = createjs.promote(Ship, 'Container');
}());