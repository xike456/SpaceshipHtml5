/**
 * Created by mpnguyen on 21/12/2016.
 */
var Utils = function () {
    return {
        getDistanceBetweenTwoPoints: function (xA, yA, xB, yB) {
            return Math.sqrt((xA - xB)*(xA - xB) + (yA - yB)*(yA - yB));
        }
    };
}();