function Ship(pieces) {
    prototypeShip.initialize();
    this.x = 0;
    this.y = 0;
    this.vX = 0;
    this.vY = 0;
    this.speed = 100;

    this.addBody(pieces);
};

var prototypeShip = Ship.prototype = new createjs.Container();



prototypeShip.Container_initialize = prototypeShip.initialize;

prototypeShip.initialize = function () {
    this.Container_initialize();
};

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
    var tempX = this.x + this.vX * this.speed * deltaTime;
    var tempY = this.y + this.vY * this.speed * deltaTime;

    this.x = (tempX < 2000 && tempX > -2000)? tempX : (tempX < 0? -2000: 2000);
    this.y = (tempY < 2000 && tempY > -2000)? tempY : (tempY < 0? -2000: 2000);
};

prototypeShip.addBody = function (pieces) {
    for (var i = 0; i < pieces.length; i++) {
        var piece;
        switch (pieces[i].type) {
            case Constants.COMPONENT_TYPE.BASE:
                piece = new Piece(pieces[i].type, pieces[i].x, pieces[i].y);
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
    }
};