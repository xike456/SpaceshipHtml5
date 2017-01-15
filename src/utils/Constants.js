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

        //Speed
        SHIP_ROTATION_SPEED: 180,
        SHIP_SPEED: 180,
        SHIP_MAX_SPEED: 400,
        BULLET_CANNON_SPEED: 550,
        BULLET_MACHINE_SPEED: 750,
        FLOATING_SPEED: 500,

        CANNON_FIREPOWER: 580,
        MACHINE_FIREPOWER: 380,

        CANNON_FIRE_DELAY: 0.5,
        MACHINE_FIRE_DELAY: 0.15,

        SHOOT_RANGE: 1000,

        //Health point
        ARMOR_HP: 300,
        GUN_HP: 120,
        NORMAL_HP: 125,
        PROPULSOR_HP: 100,
        CABIN_HP: 500,

        REGEN_DELAY: 3,

        //Damage
        MACHINE_DAMAGE: 5,
        CANNON_DAMAGE: 20,

        //Propulsor power
        PROPULSOR_POWER: 100,

        NUMBER_OF_ENEMY: 10,
        WORLD_RANGE: 20000
    };
}();