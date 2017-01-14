var WORLD_SIZE_PIXEL = Constants.WORLD_RANGE;

function World() {
    prototype.initialize();
}

var prototype = World.prototype = new createjs.Container();

prototype.Container_initialize = prototype.initialize;

prototype.initialize = function () {
    this.Container_initialize();
    this.x = 0;
    this.y = 0;

    this.enemy = [];
};

prototype.addShip = function (ship) {
    this.ship=ship;
    this.addChild(ship);
};

prototype.addEnemy = function (enemy) {
    this.enemy.push(enemy);
    this.addChild(enemy);
};

prototype.addWorldGrid = function () {
    var worldLine = new createjs.Shape();

    var g = worldLine.graphics;
    g.clear();
    g.setStrokeStyle(1);
    g.beginStroke("#007300");

    for (var i = -WORLD_SIZE_PIXEL / 2; i <= WORLD_SIZE_PIXEL / 2; i+=500){
        g.moveTo(-WORLD_SIZE_PIXEL / 2, i);	//nose
        g.lineTo(WORLD_SIZE_PIXEL / 2, i);	//rfin

        g.moveTo(i, -WORLD_SIZE_PIXEL / 2);	//nose
        g.lineTo(i, WORLD_SIZE_PIXEL / 2);	//rfin
    }

    g.closePath(); // nose
    this.addChild(worldLine);
    //world.cache(-2000,-2000, 4000, 4000);
};


prototype.initWorld = function () {
    this.addWorldGrid();
};

prototype.makeCameraAroundShip = function (x, y) {
    var browserW = $(window).innerWidth();
    var browserH = $(window).innerHeight();
    if (this.ship.x > -Constants.WORLD_RANGE/2 && this.ship.x < Constants.WORLD_RANGE/2) {
        this.x = -this.ship.x;
    }
    if (this.ship.y > -Constants.WORLD_RANGE/2 && this.ship.y < Constants.WORLD_RANGE/2) {
        this.y = -this.ship.y;
    }
};

prototype.update = function (event) {
     this.makeCameraAroundShip();
     for (var i = 0; i < Global.getInstance().listPiece.length; i++) {
         Global.getInstance().listPiece[i].update(event);
     }
};