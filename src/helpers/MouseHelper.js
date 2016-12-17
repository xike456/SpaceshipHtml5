function MouseHelper(canvas) {
    var canvas = canvas;
    var mousePos = {x: 0, y: 0};
    canvas.addEventListener('mousemove', function (evt) {
        var rect = canvas.getBoundingClientRect();
        mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        }
    });

    this.getMousePos = function() {
        return mousePos;
    }
}