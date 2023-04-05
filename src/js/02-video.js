import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  const roundedTime = Math.round(data.seconds);
  localStorage.setItem(LOCAL_STORAGE_KEY, roundedTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem(LOCAL_STORAGE_KEY);

player.setCurrentTime(currentTime);
