/**
 * Created by mp_ng on 12/11/2016.
 */
var Constants = function () {
    return {
        COMPONENT_TYPE: {
            BASE  : 1,
            ARMOR : 2,
            MACHINE_GUN : 3,
            CANNON : 4,
            PROPULSOR : 5,
            CABIN : 6
        },
        RATIO_X: 0.75,
        RATIO_Y: 0.866,
        PIECE_WIDTH: 64,
        PIECE_HEIGHT: 64,
        KEYCODE_ENTER: 13,
        KEYCODE_SPACE: 32,
        KEYCODE_UP: 38,
        KEYCODE_LEFT: 37,
        KEYCODE_RIGHT: 39,
        KEYCODE_DOWN: 40,
        KEYCODE_W: 87,
        KEYCODE_A: 65,
        KEYCODE_D: 68,
        KEYCODE_S: 83,
        SHIP_ROTATION_SPEED: 180,
        SHIP_SPEED: 180
    };
}();