function Ship() {
    prototype.initialize();
//    var speed;

    var sprite = new createjs.Shape();
    sprite.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);

    prototype.addChild(sprite);
}

var prototype = Ship.prototype = new createjs.Container();

//public variable
prototype.speed;
prototype.vX;
prototype.vY;

prototype.Container_initialize = prototype.initialize;

prototype.initialize = function () {
    this.Container_initialize();
    this.x = 0;
    this.y = 0;
    this.vX = 0;
    this.vY = 0;
    this.speed = 100;
};

var browserW = $(window).innerWidth()/2;//window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);// $(window).innerWidth();
var browserH = $(window).innerHeight()/2;//window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);//$(window).innerHeight();


prototype.update = function (event) {
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

//   console.log(angle* 180 / Math.PI);
    //accelerate
    this.vX = Math.cos(angle);
    this.vY = Math.sin(angle);
    //console.log(this.vX + ' ' + this.vY);
    var tempX = prototype.x + this.vX * prototype.speed * deltaTime;
    var tempY = prototype.y + this.vY * prototype.speed * deltaTime;

    prototype.x = (tempX < 2000 && tempX > -2000)? tempX : (tempX < 0? -2000: 2000);
    prototype.y = (tempY < 2000 && tempY > -2000)? tempY : (tempY < 0? -2000: 2000);
};