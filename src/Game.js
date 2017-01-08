// Main type of the game
function Game() {
    var stage;
    var contentManager;
    var game;
    var mouseHelper;
    var player;
    var enemy;
    var world;
    var gameStage;

    if(game === undefined || game === null) {
        game = this;
    }

    Game.prototype.resizeToFullWidthCanvas_ = function () {
        var browserW = $(window).width();
        var browserH = $(window).height();

        console.log('Width: ' + browserW + '  Height: ' + browserH);

        stage.canvas.width = browserW;
        stage.canvas.height = browserH;

        gameStage.x = browserW/2;
        gameStage.y = browserH/2;

        var zoom = browserH/900;
        gameStage.scaleX = zoom;
        gameStage.scaleY = zoom;

        gameStage.calcLocalPosition = function (stageX, stageY){
            x = (stageX - this.x) / this.scaleX;
            y = (stageY - this.y) / this.scaleY;
            return {"x":x, "y":y};
        };
    };

    var resizeTimeout = null;
    Game.prototype.resizeToFullWidthCanvas = function () {
        if (resizeTimeout)
            clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout("game.resizeToFullWidthCanvas_()", 100);
    };

    Game.prototype.init = function () {
        var canvas = document.getElementById('gameCanvas');
        stage = new createjs.Stage(canvas);
        keyboardHelper = new KeyboardHelper();
        mouseHelper = new MouseHelper(canvas);

        Global.getInstance().stage = stage;
        Global.getInstance().mouseHelper = mouseHelper;
        Global.getInstance().keyboardHelper = keyboardHelper;

        //init gamestage
        gameStage = new createjs.Container();
        stage.addChild(gameStage);


        //init world
        world = new World();
        gameStage.addChild(world);

        world.initWorld();
        Global.getInstance().world = world;
        Global.getInstance().listBullet = [];
        game.resizeToFullWidthCanvas_();
        game.resizeToFullWidthCanvas();
        window.addEventListener('resize', game.resizeToFullWidthCanvas, false);

        kd.A.down(function () {
            Global.getInstance().keyboardHelper.currentKeyDown = kd.A;
        });
        kd.D.down(function () {
            Global.getInstance().keyboardHelper.currentKeyDown = kd.D;
        });
        kd.W.down(function () {
            Global.getInstance().keyboardHelper.currentKeyDown = kd.W;
        });

        kd.A.up(function () {
            Global.getInstance().keyboardHelper.currentKeyDown = undefined;
        });
        kd.D.up(function () {
            Global.getInstance().keyboardHelper.currentKeyDown = undefined;
        });
        kd.W.up(function () {
            Global.getInstance().keyboardHelper.currentKeyDown = undefined;
        });

        contentManager = new ContentManager(stage, 800, 480);
        contentManager.SetDownloadCompleted(game.StartGame);
        contentManager.StartDownload();
    };


    window.oncontextmenu = function () {
        return false;     // cancel default menu
    };

    //Equivalent of Update() methods of XNA
    Game.prototype.update = function (event){
        kd.tick();
        player.update(event);
        enemy.update(event);
        world.update(event);
        stage.update();
        for (var i = 0; i < Global.getInstance().listBullet.length; i++) {
            Global.getInstance().listBullet[i].update(event);
        }
    };

    //Starting of the game
    Game.prototype.generatePieces = function() {
        for (var i = 0; i < 10; i ++) {
            var typePiece = Math.floor(Math.random() * 5) + 1;
            var x = (Math.random() - 0.5)*(4000/(Constants.PIECE_WIDTH * Constants.RATIO_X));
            var y = (Math.random() - 0.5)*(4000/(Constants.PIECE_HEIGHT * Constants.RATIO_Y));
            var piece;
            switch (typePiece) {
                case Constants.COMPONENT_TYPE.CABIN:
                    piece = new Cabin(typePiece, x, y);
                    break;
                case Constants.COMPONENT_TYPE.PROPULSOR:
                    piece = new Propulsor(typePiece, x, y);
                    break;
                case Constants.COMPONENT_TYPE.ARMOR:
                    piece = new Armor(typePiece, x, y);
                    break;
                case Constants.COMPONENT_TYPE.MACHINE_GUN:
                    piece = new MachineGun(typePiece, x, y);
                    break;
                case Constants.COMPONENT_TYPE.CANNON:
                    piece = new Cannon(typePiece, x, y);
                    break;
                default:
                    piece = new Piece(typePiece, x, y);
                    break;
            }
            world.addChild(piece);
            Global.getInstance().listPiece.push(piece);
        }
    };

    Game.prototype.StartGame = function () {
        console.log('game start');
        Global.getInstance().listPiece = [];
        var pieceData = initShipData();
        player = new Player(pieceData);
        enemy = new Ship(pieceData);
        world.addEnemy(enemy);
        world.addShip(player);

        game.generatePieces();
        createjs.Ticker.addEventListener('tick', game.update);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
    };

    function initShipData() {
        var piecesData = [];
        var typePiece;
        var arr;
        for (var i = -3; i < 3; i++) {
            for (var j = -2; j < 2; j++) {
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
}