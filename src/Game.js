// Main type of the game
function Game() {
    var stage;
    var contentManager;
    var game;
    var mouseHelper;
    var player;
    var world;
    var gameStage;
    var hpLabel;
    var msLabel;
    var fpsLabel;
    var clickToStart;

    if(game === undefined || game === null) {
        game = this;
    }

    Game.prototype.resizeToFullWidthCanvas_ = function () {
        var browserW = $(window).width();
        var browserH = $(window).height();

        stage.canvas.width = browserW;
        stage.canvas.height = browserH;

        gameStage.x = browserW/2;
        gameStage.y = browserH/2;

        game.zoomScreen();

        gameStage.calcLocalPosition = function (stageX, stageY){
            x = (stageX - this.x) / this.scaleX;
            y = (stageY - this.y) / this.scaleY;
            return {"x":x, "y":y};
        };
    };

    Game.prototype.zoomScreen = function (pieceSize) {
        if(!pieceSize){
            pieceSize = 5;
        }

        var browserW = $(window).width();
        var browserH = $(window).height();

        var zoom = browserH/(1100 + pieceSize * 5);
        gameStage.scaleX = zoom;
        gameStage.scaleY = zoom;
    };

    var resizeTimeout = null;
    Game.prototype.resizeToFullWidthCanvas = function () {
        if (resizeTimeout)
            clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout("game.resizeToFullWidthCanvas_()", 100);
    };

    Game.prototype.init = function () {
        var browserW = $(window).width();
        var browserH = $(window).height();

        var canvas = document.getElementById('gameCanvas');
        stage = new createjs.Stage(canvas);
        keyboardHelper = new KeyboardHelper();
        mouseHelper = new MouseHelper(canvas);
        Global.getInstance().listTarget = [];
        Global.getInstance().game = game;
        Global.getInstance().stage = stage;
        Global.getInstance().mouseHelper = mouseHelper;
        Global.getInstance().keyboardHelper = keyboardHelper;

        //init gamestage
        gameStage = new createjs.Container();
        stage.addChild(gameStage);

        sound = new createjs.Text("Music: On", "bold 18px Arial", "#FFF");
        stage.addChild(sound);
        sound.x = browserW - 100;
        sound.y = 20;
        sound.on('click', function () {
            Global.getInstance().isPlayBackgroundSound = !Global.getInstance().isPlayBackgroundSound;
            sound.text = Global.getInstance().isPlayBackgroundSound? 'Music: On' : 'Music: Off';
            Utils.playSound(Constants.SOUND.BACKGROUND);
            stage.update();
        });

        effect = new createjs.Text("Sound: On", "bold 18px Arial", "#FFF");
        stage.addChild(effect);
        effect.x = browserW - 100;
        effect.y = 50;
        effect.on('click', function () {
            Global.getInstance().isPlayEffectSound = !Global.getInstance().isPlayEffectSound;
            effect.text = Global.getInstance().isPlayEffectSound? 'Sound: On' : 'Sound: Off';
            stage.update();
        });

        //FPS indicator
        fpsLabel = new createjs.Text("", "bold 18px Arial", "#FFF");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 80;

        //Player HP indicator
        hpLabel = new createjs.Text("", "bold 18px Arial", "#FFF");
        stage.addChild(hpLabel);
        hpLabel.y = 20;
        hpLabel.x = 10;

        msLabel = new createjs.Text("", "bold 18px Arial", "#FFF");
        stage.addChild(msLabel);
        msLabel.y = 50;
        msLabel.x = 10;

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

        contentManager = new ContentManager(stage, browserW, browserH);
        contentManager.SetDownloadCompleted(game.StartGame);
        contentManager.StartDownload();
    };


    window.oncontextmenu = function () {
        return false;     // cancel default menu
    };

    Game.prototype.updateInfo = function () {
        hpLabel.text = "      HP: ";
        for (var i = 0; i< Math.round(Global.getInstance().player.hp/20); i++) {
            hpLabel.text += "|";
        }
        msLabel.text = "Power: ";
        for (var i = 0; i < Math.round(Global.getInstance().player.speedPower / (Global.getInstance().player.maxPower/25)); i++) {
            msLabel.text += "|";
        }
    };

    //Equivalent of Update() methods of XNA
    Game.prototype.update = function (event){
        if(Global.getInstance().player.mainIndex === -1){
            Global.getInstance().player.mainIndex = -2;
            console.log("restart")
            Global.getInstance().game.restartGame();
            return;
        }
        if(Global.getInstance().player.mainIndex === -2) {
            return;
        }

        //fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        kd.tick();

        game.updateInfo();

        game.generatePieces();
        game.generateBomb();
        player.update(event);
        world.update(event);
        stage.update();

        for (var i = Global.getInstance().listBullet.length - 1; i >=0; i--) {
            if (!Global.getInstance().listBullet[i])
                Global.getInstance().listBullet.splice(i, 1);
        }

        for (var i = Global.getInstance().listBullet.length - 1; i >=0; i--) {
            if (Global.getInstance().listBullet[i])
                Global.getInstance().listBullet[i].update(event);
        }
    };

    game.generateBomb = function () {
        while (world.listBomb.length < 5) {
            var x = (Math.random() - 0.5)*(Constants.WORLD_RANGE/2);
            var y = (Math.random() - 0.5)*(Constants.WORLD_RANGE/2);

            var bomb = new Bomb(x, y);
            world.addChild(bomb);
            world.listBomb.push(bomb)
        }
    };

    Game.prototype.generatePieces = function() {
        while (Global.getInstance().listPiece.length < 50) {
            var typePiece = Math.floor(Math.random() * 5) + 1;
            var x = (Math.random() - 0.5)*(Constants.WORLD_RANGE*2/(Constants.RATIO_X * Constants.PIECE_WIDTH));
            var y = (Math.random() - 0.5)*(Constants.WORLD_RANGE*2/(Constants.RATIO_X * Constants.PIECE_WIDTH));
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
            Global.getInstance().listPiece.push(piece);
            world.addChild(piece);
        }
    };

    Game.prototype.restartGame = function () {
        var browserW = $(window).width();
        var browserH = $(window).height();
        var clickToRestart = new createjs.Text('Click To Replay!', 'bold 24px Arial', '#FFF');
        clickToRestart.x = (browserW/2) - 100;
        clickToRestart.y = browserH/2;
        stage.addChild(clickToRestart);
        var canvas = document.getElementById('gameCanvas');
        clickToRestart.on("click", function () {
            var browserW = $(window).width();
            var browserH = $(window).height();

            var canvas = document.getElementById('gameCanvas');
            stage = new createjs.Stage(canvas);
            keyboardHelper = new KeyboardHelper();
            mouseHelper = new MouseHelper(canvas);
            Global.getInstance().listTarget = [];
            Global.getInstance().game = game;
            Global.getInstance().stage = stage;
            Global.getInstance().mouseHelper = mouseHelper;
            Global.getInstance().keyboardHelper = keyboardHelper;

            //init gamestage
            gameStage = new createjs.Container();
            stage.addChild(gameStage);

            sound = new createjs.Text("Music: On", "bold 18px Arial", "#FFF");
            stage.addChild(sound);
            sound.x = browserW - 100;
            sound.y = 20;
            sound.on('click', function () {
                Global.getInstance().isPlayBackgroundSound = !Global.getInstance().isPlayBackgroundSound;
                sound.text = Global.getInstance().isPlayBackgroundSound? 'Music: On' : 'Music: Off';
                Utils.playSound(Constants.SOUND.BACKGROUND);
                stage.update();
            });

            effect = new createjs.Text("Sound: On", "bold 18px Arial", "#FFF");
            stage.addChild(effect);
            effect.x = browserW - 100;
            effect.y = 50;
            effect.on('click', function () {
                Global.getInstance().isPlayEffectSound = !Global.getInstance().isPlayEffectSound;
                effect.text = Global.getInstance().isPlayEffectSound? 'Sound: On' : 'Sound: Off';
                stage.update();
            });

            //FPS indicator
            fpsLabel = new createjs.Text("", "bold 18px Arial", "#FFF");
            stage.addChild(fpsLabel);
            fpsLabel.x = 10;
            fpsLabel.y = 80;

            //Player HP indicator
            hpLabel = new createjs.Text("", "bold 18px Arial", "#FFF");
            stage.addChild(hpLabel);
            hpLabel.y = 20;
            hpLabel.x = 10;

            msLabel = new createjs.Text("", "bold 18px Arial", "#FFF");
            stage.addChild(msLabel);
            msLabel.y = 50;
            msLabel.x = 10;

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

            canvas.onclick = null;

            stage.removeChild(clickToRestart);
            Global.getInstance().listPiece = [];
            var pieceData = initShipData();
            player = new Player(pieceData);
            game.zoomScreen(player.listPiece.length);
            world.addShip(player);
            Global.getInstance().player = player;
            Utils.playSound(Constants.SOUND.BACKGROUND);
        });
        stage.update();
    };

    //Starting of the game
    Game.prototype.StartGame = function () {
        var browserW = $(window).width();
        var browserH = $(window).height();
        Utils.playSound(Constants.SOUND.BACKGROUND);
        clickToStart = new createjs.Text('Welcome: Click To Play!', 'bold 24px Arial', '#FFF');
        clickToStart.x = (browserW/2) - 150;
        clickToStart.y = browserH/2;
        stage.addChild(clickToStart);
        var canvas = document.getElementById('gameCanvas');
        clickToStart.on('click', function () {
            canvas.onclick = null;
            stage.removeChild(clickToStart);
            Global.getInstance().listPiece = [];
            var pieceData = initShipData();
            player = new Player(pieceData);
            game.zoomScreen(player.listPiece.length);
            world.addShip(player);
            Global.getInstance().player = player;
            Utils.playSound(Constants.SOUND.BACKGROUND);
            createjs.Ticker.addEventListener('tick', game.update);
            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(60);
        });

        // Global.getInstance().listPiece = [];
        // var pieceData = initShipData();
        // player = new Player(pieceData);
        // game.zoomScreen(player.listPiece.length);
        // world.addShip(player);
        // Global.getInstance().player = player;
        // Utils.playSound(Constants.SOUND.BACKGROUND);
        // createjs.Ticker.addEventListener('tick', game.update);
        // createjs.Ticker.useRAF = true;
        // createjs.Ticker.setFPS(60);
    };

    function initShipData() {
        var piecesData = [];
        var typePiece;
        var arr;
        for (var i = -2; i < 3; i++) {
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
    }
}