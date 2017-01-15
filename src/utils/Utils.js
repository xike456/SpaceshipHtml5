/**
 * Created by mpnguyen on 21/12/2016.
 */
var Utils = function () {
    return {
        getDistanceBetweenTwoPoints: function (xA, yA, xB, yB) {
            return Math.sqrt((xA - xB)*(xA - xB) + (yA - yB)*(yA - yB));
        },

        initShipData: function (size){
            var index = Math.sqrt(size) + 2;
            var k = index + (Math.random()-0.5) * 2;
            var l = index + (Math.random()-0.5) * 4;

            l = l < 4 ? 4 : l;
            k = k < 4 ? 4 : k;
            var piecesData = [];
            var typePiece;
            var arr;
            for (var i = Math.round(-k/2); i < Math.round(k/2); i++) {
                for (var j = Math.round(-l/2); j < Math.round(l/2); j++) {
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
        }
    };
}();