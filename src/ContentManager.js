'use strict';
    var ondownloadcompleted;
    var downloadProgress;
    var preload;
    var numberOfElementsLoaded = 0;
    var sounds;
    var sprites;
    var soundCount = 0;
    var self;
    
    var manifest = [
        {src: "img/Background.png", id: "bg"}
    ];

    function ContentManager(stage, width, height) {

        var manifest = [
            {id: Constants.SOUND.START, src:"assets/sound/Game-Spawn.ogg"},
            {id: Constants.SOUND.PIECE_BREAK, src:"assets/sound/Game-Break.ogg"},
            {id: Constants.SOUND.CABIN_BREAK, src:"assets/sound/Game-Death.ogg"},
            {id: Constants.SOUND.MACHINE_SHOT, src:"assets/sound/Game-Shot.mp3"},
            {id: Constants.SOUND.CANNON_SHOT, src:"assets/sound/Cannon.mp3"},
            {id: Constants.SOUND.BACKGROUND, src:"assets/sound/18-machinae_supremacy-lord_krutors_dominion.ogg"}
        ];

        preload = new createjs.LoadQueue();
        preload.installPlugin(createjs.Sound);
        preload.loadManifest(manifest);
        preload.addEventListener('fileload', handleElementLoad);
        preload.addEventListener('fileerror', handleElementError);
        preload.addEventListener('complete', handleElementComplete);
        preload.addEventListener('progress', handleProgress);

        downloadProgress = new createjs.Text('-- %', 'bold 14px Arial', '#FFF');
        downloadProgress.x = (width/2) - 50;
        downloadProgress.y = height/2;


        //ondownloadcompleted callback
        this.SetDownloadCompleted = function (callbackMethod) {
            ondownloadcompleted = callbackMethod;
        };

        this.StartDownload = function () {
            preload.loadManifest(manifest);
            stage.addChild(downloadProgress);
        };

        function handleElementLoad(event) {
            numberOfElementsLoaded++;
        }
        
        function handleElementComplete(event) {
            stage.removeChild(downloadProgress);
            numberOfElementsLoaded = 0;

            ondownloadcompleted();
        }

        function handleElementError(e) {
            console.log("Error Loading Asset : " + e.src);
        }

        function handleProgress() {
            downloadProgress.text = "Loading " + (preload.progress * 100 | 0) + "%";
            stage.update();
        }
}