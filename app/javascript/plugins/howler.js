import {Howl, Howler} from 'howler';

const load_audio = () => {
  window.howler_audio = new Howl({
  src: [ document.getElementById('audio-file').innerText ],
  html5: true
});
}

// '/audio/slotr_ep16.mp3'

const play_audio = () => {

  const id = document.getElementById('event').dataset.eventId;

  const audio_button = document.getElementById('audio-button');

  audio_button.addEventListener('click', (event) => {
    fetch(`/events/${id}/plays`, {
          method: "POST"
        });
  });
}

const pause_audio = () => {

  const id = document.getElementById('event').dataset.eventId;

  const pause_button = document.getElementById('audio-pause');

  pause_button.addEventListener('click', (event) => {
    fetch(`/events/${id}/pauses`, {
          method: "POST"
        });
  });
}

export { play_audio }
export { pause_audio }
export { load_audio }
