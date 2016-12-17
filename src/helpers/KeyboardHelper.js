function KeyboardHelper() {
    this.currentKeyDown;
    this.isKeyDown = function(keyCode) {
        if(!this.currentKeyDown){
            return false;
        }
        if (keyCode === this.currentKeyDown.keyCode) {
            return true;
        }
        return false;
    };

    this.isKeyUp = function (e) {

    };
}