// Main type of the game

function Game() {
    var stage;
    var contentManager;
    var game;
    var keyboardHandler;
    var mouseHelper;
    var event;

    var ship;

    if(game === undefined || game === null)
    {
        game = this;
    }

    Game.prototype.init = function () {
        var canvas = document.getElementById('gameCanvas');
        stage = new createjs.Stage(canvas);
        keyboardHandler = new KeyboardHandler();
        mouseHelper = new MouseHelper(canvas);

        Global.getInstance().stage = stage;
        Global.getInstance().mouseHelper = mouseHelper;

        console.log(Global.getInstance().stage);

        document.onkeydown = function () {
            event = window.event;
        }

        document.onkeyup = function () {
            event = null;
        }

        contentManager = new ContentManager(stage, 800, 480);
        contentManager.SetDownloadCompleted(game.StartGame);
        contentManager.StartDownload();
    };


    //Equivalent of Update() methods of XNA
    Game.prototype.update = function (event){
        //console.log(event.delta/1000);
        //console.log(mouseHelper.getMousePos());
        //inputHandler.handleKeyUp(event);
        ship.update(event);
        stage.update();
    };

    //Starting of the game
    Game.prototype.StartGame = function () {
        console.log('game start');
        ship = new Ship();
        stage.addChild(ship);
        // we want to do some work before we update the canvas,
        // otherwise we could use Ticker.addListener(stage);
        createjs.Ticker.addEventListener('tick', game.update);
        // Targeting 60 FPS
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
    };
}