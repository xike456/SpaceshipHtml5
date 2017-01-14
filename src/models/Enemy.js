(function () {
    function Enemy(pieces) {
        Ship.call(this, pieces);
    };

    Enemy.prototype = Object.create(Ship.prototype);
    Enemy.prototype.constructor = Ship;

    var browserW = $(window).innerWidth()/2;//window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);// $(window).innerWidth();
    var browserH = $(window).innerHeight()/2;//window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);//$(window).innerHeight();

    Enemy.prototype.update = function (event) {
        Ship.prototype.update.call(this, event);

        this.listPiece.forEach(function (piece) {
            piece.update(event);
        });
    };

    window.Enemy = Enemy;
}());