Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});
function checkFullScreen(myVideo){
    if (typeof(myVideo.webkitEnterFullscreen) != "undefined") {
        // This is for Android Stock.
        myVideo.webkitEnterFullscreen();
    } else if (typeof(myVideo.webkitRequestFullscreen)  != "undefined") {
        // This is for Chrome.
        myVideo.webkitRequestFullscreen();
    } else if (typeof(myVideo.mozRequestFullScreen)  != "undefined") {
        myVideo.mozRequestFullScreen();
    }
}
function responsiveVideo(video){
    if(video.playing){
        video.pause();
    }else{
        video.play();
        checkFullScreen(video);
    }
}