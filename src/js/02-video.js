import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

    player.on('timeupdate', throttle(onPlay,1000));

    
    function onPlay(evt) {
        console.log(evt.seconds);
        const time = evt.seconds;
        localStorage.setItem('videoplayer-current-time', time);
    }
    
    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });
    const currentTame = localStorage.getItem('videoplayer-current-time');
    const startTame = JSON.parse(currentTame);
    console.log(startTame);

    player.setCurrentTime(currentTame).then(function(seconds) {
        
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                
                break;
    
            default:
                
                break;
        }
    });
