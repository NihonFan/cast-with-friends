import {Howl, Howler} from 'howler';

const load_audio = () => {
  window.howler_audio = new Howl({
  src: [ document.getElementById('audio-file').innerText ],
  html5: true
});
}

// '/audio/slotr_ep16.mp3'

const play_audio = () => {

  const audio_button = document.getElementById('audio-button');

  audio_button.addEventListener('click', (event) => {
    window.howler_audio.play();
  });
}

const pause_audio = () => {
  const pause_button = document.getElementById('audio-pause');

  pause_button.addEventListener('click', (event) => {
    window.howler_audio.pause();
  });
}

export { play_audio }
export { pause_audio }
export { load_audio }
