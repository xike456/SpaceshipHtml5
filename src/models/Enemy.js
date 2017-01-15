(function () {
    function Enemy(pieces) {
        Ship.call(this, pieces);
        this.botAngle;
        this.velocity;
    };

    Enemy.prototype = Object.create(Ship.prototype);
    Enemy.prototype.constructor = Ship;

    var browserW = $(window).innerWidth()/2;//window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);// $(window).innerWidth();
    var browserH = $(window).innerHeight()/2;//window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);//$(window).innerHeight();

    Enemy.prototype.update = function (event) {
        Ship.prototype.update.call(this, event);
        this.listTarget = [];
        var pos = {x: this.x, y: this.y};
        if(Global.getInstance().player && Utils.getDistanceBetweenTwoPoints(pos.x, pos.y, Global.getInstance().player.x, Global.getInstance().player.y)< this.shootRange) {
            this.listTarget.push(Global.getInstance().player);
        }

        this.listPiece.forEach(function (piece) {
            if (piece)
                piece.update(event);
        });
        this.move(event);
    };

    Enemy.prototype.move = function (event) {
        if(!this.botAngle){
            this.botAngle = Math.random() * 360;
            this.botAngle = this.botAngle * Math.PI / 180;
        }
        if(!this.velocity)
            this.velocity = { vX: Math.cos(this.botAngle), vY: Math.sin(this.botAngle) };
        this.x -= this.velocity.vX * this.speed * event.delta/1000;
        this.y += this.velocity.vY * this.speed * event.delta/1000;
    };

    window.Enemy = Enemy;
}());