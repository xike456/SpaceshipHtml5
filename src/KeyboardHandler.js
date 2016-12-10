function KeyboardHandler() {
    var KEYCODE_ENTER = 13;
    var KEYCODE_SPACE = 32;
    var KEYCODE_UP = 38;
    var KEYCODE_LEFT = 37;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_DOWN = 40;
    var KEYCODE_W = 87;
    var KEYCODE_A = 65;
    var KEYCODE_D = 68;
    var KEYCODE_S = 83;

    this.handleKeyUp = function(e) {
        if (!e) return;

        switch(e.keyCode) {
            case KEYCODE_SPACE:
                debugger;
                console.log(KEYCODE_SPACE);
                break;
            case KEYCODE_A:
            case KEYCODE_LEFT:
                console.log(KEYCODE_RIGHT);
                break;
            case KEYCODE_D:
            case KEYCODE_RIGHT:
                console.log(KEYCODE_RIGHT);
                break;
            case KEYCODE_W:
            case KEYCODE_UP:
                console.log(KEYCODE_UP);
                break;
            case KEYCODE_S:
            case KEYCODE_DOWN:
                console.log(KEYCODE_DOWN);
                break;
        }
    };

    this.handleKeyDown = function (e) {

    };


    //document.onkeyup = this.handleKeyUp;
    //document.onkeydown = this.handleKeyDown;
}