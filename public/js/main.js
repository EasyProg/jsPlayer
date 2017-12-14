
    var link = "https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd";

    function changeVideo(param)
    {
    window.link = param;
    startPlaying(link);
    $('#sidebar').attr('class','sideBarMenuNone');
    $('.menuButton').css({'display':'flex'});
    }
    function openMenu() {
    $('#sidebar').attr('class','sideBarMenu');
    $('.menuButton').css({'display':'none'});
    }
    function initDash() {
    var video = document.getElementById('video');
    $('#video').attr('data-dashjs-player','');
    var player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#video"), link, true);
    video.play();
    }
    function startPlaying(link)
                            {
    var wholeTime = document.getElementById('wholeTime');
    //var duration = video.duration;
    if (Hls.isSupported()&&link.indexOf('.mpd')===-1)
                            {
        if (hls) hls.destroy();
        var hls = new Hls();
        hls.loadSource(link);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function ()
                            {
            video.play();
                            });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch(data.type)
                            {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        $('.error').css({'visibility':'visible'});
                        // try to recover network error
                        console.log("fatal network error encountered, try to recover");
                        hls.startLoad();
                        $('.error').css({'visibility':'hidden'});
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log("fatal media error encountered, try to recover");
                        hls.recoverMediaError();
                        break;
                    default:
                        // cannot recover
                        hls.destroy();
                        break;
                            }
                            }
        });
                            }
    else if (link.indexOf('.mpd')!==-1)
    {   if (hls)
        {
        hls.stopLoad();
        hls.detachMedia();
        hls.destroy();
        }
        initDash();
        //console.log('Switch to Dash')
    }
    else {
        $('.error').text='Your browser doesn\'t support hls ';
        $('.error').css({'visibility': 'visible'});
         }


                            }
    $(document).ready(function() {
        startPlaying(window.link);
        $("#video").on
        (
            "timeupdate",
            function (event) {
                trackVideo(this.currentTime, this.duration);
                var progress = document.getElementById('progress');
                var circle =   document.getElementsByClassName('circleDiv')[0];
                progress.value = this.currentTime;
                progress.max = this.duration;
                circle.style.left = (progress.value/progress.max)*100-0.5 + '%';
            });
        $("#video").on
        (
            "mousemove",
            function (event) {
                event.stopPropagation();
                $('.playbackCont').css({'visibility': 'visible'});
                setPlaybackVisible(false)
            });
        $(".playbackCont").on
        (
            "mouseenter",
            function (event) {
                event.stopPropagation();
                setPlaybackVisible(true)
            });
        $(".playbackCont").on
        (
            "mouseleave",
            function (event) {
                event.stopPropagation();
                setPlaybackVisible(false)
            });
        $("#progress").on
        (
            "click",
            function (e) {
                var video = document.getElementById('video');
                console.log(window.width );
                var b = ($(window).width() - this.offsetWidth)/2;
                var pos = (e.pageX  - b) / this.offsetWidth;
                //console.log(e.pageX  - this.offsetLeft);
                video.currentTime = pos * video.duration;
                    });
    });
    //visibility of playback
    function setPlaybackVisible(visible)
    {
    //c = 0;
    clearTimeout(window.c);
    if (visible)
    {
    return false
    }
    else if (!visible)
    {
    $(".playbackCont").fadeIn(500);
    window.c = setTimeout(function ()
    {
    //Скрыть плей
    $(".playbackCont").fadeOut(1000);
    }, 5000);

    }
    }
//${document).ready(function(){startPlaying()});
    function togglePlay()
    {
        var video = document.getElementById('video');
        if (video.paused)
    {
            $('#playbutton').attr("src","./img/pause-button.svg");
            video.play();
    }
        else
    {       $('#playbutton').attr("src","./img/main-play.svg");
            video.pause();

    }
    }
    function trackVideo (videoTime,Duration)
    {
        //get playback time
    let minutes = Math.floor(videoTime/60);
        minutes = minutes<10?'0'+minutes:minutes;
    let seconds = Math.floor(videoTime%60);
        seconds = seconds<10?'0'+seconds:seconds;
    $('#startTime').text(minutes+':'+seconds);
        seconds = Math.floor(Duration%60);
        seconds = seconds<10?'0'+seconds:seconds;
        minutes = Math.floor(Duration/60);
        minutes = minutes<10?'0'+minutes:minutes;
        minutes=!isFinite(minutes)?'00':minutes;
        seconds=!isFinite(seconds)?'00':seconds;
    $('#wholeTime').text(minutes+':'+seconds);
    }
