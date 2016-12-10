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
        preload = new createjs.LoadQueue();
        preload.installPlugin(createjs.Sound);
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
            console.log(event.result);
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