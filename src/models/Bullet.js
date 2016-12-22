/**
 * Created by mpnguyen on 21/12/2016.
 */
(function () {
    function Bullet(x ,y, angle) {
        this.Container_constructor();

        this.x0 = x;
        this.y0 = y;

        this.x = x;
        this.y = y;

        this.angle = angle;
        this.rotation = angle;

        this.speed = 0;
        this.firePower = 0;
    }

    var prototypeBullet = createjs.extend(Bullet, createjs.Container);

    prototypeBullet.update = function(event) {
        var deltaTime = event.delta/1000;

        //accelerate
        this.vX = Math.sin(this.angle * (Math.PI/-180));
        this.vY = Math.cos(this.angle * (Math.PI/-180));

        this.x = this.x - this.vX * this.speed * deltaTime;
        this.y = this.y - this.vY * this.speed * deltaTime;
        if (Utils.getDistanceBetweenTwoPoints(this.x, this.y, this.x0, this.y0) > this.firePower) {
            Global.getInstance().listBullet.splice(Global.getInstance().listBullet.indexOf(this), 1);
            Global.getInstance().world.children.splice(Global.getInstance().world.children.indexOf(this), 1);
        }
    };

    window.Bullet = createjs.promote(Bullet, 'Container');
}());
