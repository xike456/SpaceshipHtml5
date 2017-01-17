'use strict'
var Global = function () {
    var instance;
    function createInstance() {
        var object = new Object('I am the instance');
        return object;
    }

    return{
        getInstance: function () {
        if(!instance){
            instance = createInstance();
            instance.isPlayBackgroundSound = true;
            instance.isPlayEffectSound = true;
            instance.isPlayingBackgroundSound = false;
        }
        return instance;
    }}
}();