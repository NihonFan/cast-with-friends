import {Howl, Howler} from 'howler';

const play_audio = () => {
  var sound = new Howl({
    src: [ '/audio/slotr_ep16.mp3']
  });

  sound.play();
}

export { play_audio }
