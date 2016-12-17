function KeyboardHelper() {

    this.isKeyDown = function(e, keyCode) {
        if (!e) return false;

        if (e.keyCode === keyCode) {
            return true;
        }
        return false;
    };

    this.isKeyUp = function (e) {

    };
}