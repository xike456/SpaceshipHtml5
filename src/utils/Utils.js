/**
 * Created by mpnguyen on 21/12/2016.
 */
var Utils = function () {
    return {
        getDistanceBetweenTwoPoints: function (xA, yA, xB, yB) {
            return Math.sqrt((xA - xB)*(xA - xB) + (yA - yB)*(yA - yB));
        },

        initShipData: function (size){
            var piecesData = [];
            var typePiece;
            var arr;
            for (var i = -3; i < 3; i++) {
                for (var j = -3; j < 3; j++) {
                    if (i != 0 || j != 0) {
                        if ((i + j) % 2 == 0) {
                            typePiece = Math.floor(Math.random() * 5) + 1;
                            arr = {'x' : i * 2, 'y' : j, 'type' : typePiece};
                            piecesData.push(arr);
                        }

                    }else {
                        arr = {'x' : i * 2, 'y' : j, 'type' : 6};
                        piecesData.push(arr);
                    }

                }
            }
            return piecesData;
        },

        playSound: function (id) {
            if (id === Constants.SOUND.BACKGROUND && Global.getInstance().isPlayBackgroundSound) {
                createjs.Sound.play(id, { loop: -1 });
                return;
            }

            if (id !== Constants.SOUND.BACKGROUND && Global.getInstance().isPlayEffectSound) {
                var instance = createjs.Sound.play(id);
                instance.volume = 0.5;
            }
        }
    };
}();