(function () {
    function Player(pieces) {
        Ship.call(this, pieces);
    };

    Player.prototype = Object.create(Ship.prototype);
    Player.prototype.constructor = Ship;

    var browserW = $(window).innerWidth()/2;//window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);// $(window).innerWidth();
    var browserH = $(window).innerHeight()/2;//window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);//$(window).innerHeight();

    Player.prototype.update = function (event) {
        Ship.prototype.update.call(this, event);
        var deltaTime = event.delta/1000;
        var mousePos = Global.getInstance().mouseHelper.getMousePos();
        var lenghX = Math.sqrt((mousePos.x - browserW)*(mousePos.x - browserW) + (mousePos.y - browserH)*(mousePos.y - browserH));
        var lenghX0 = Math.sqrt((mousePos.x - browserW)*(mousePos.x - browserW));

        //Check enemy in range:
        Global.getInstance().listTarget = [];
        for (var i = 0; i< Global.getInstance().world.enemy.length; i++) {
            var xe = Global.getInstance().world.enemy[i].x;
            var ye = Global.getInstance().world.enemy[i].y;

            var distance = Math.sqrt((this.x - xe)*(this.x - xe) + (this.y - ye)*(this.y - ye));
            if(distance < Constants.SHOOT_RANGE) {
                Global.getInstance().listTarget.push(Global.getInstance().world.enemy[i]);
            }
        }

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

        if (lenghX > Constants.PIECE_WIDTH/2) {
            this.x = (tempX < 2000 && tempX > -2000)? tempX : (tempX < 0? -2000: 2000);
            this.y = (tempY < 2000 && tempY > -2000)? tempY : (tempY < 0? -2000: 2000);
        }

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

    window.Player = Player;
}());