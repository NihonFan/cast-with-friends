import "../plugins/flatpickr";
import "../plugins/dahs-time";
import "../plugins/audioplayer";
import { play_audio } from "../plugins/howler";
import { pause_audio } from "../plugins/howler";
import { load_audio } from "../plugins/howler";
import { initEventCable } from "../channels/event_channel";


// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  // window.howler_audio.stop();
  load_audio();
  play_audio();
  pause_audio();

  console.log("turbolinks loading?")

  const eventContainer = document.getElementById('event');

  if (eventContainer) {
    const id = eventContainer.dataset.eventId;
    initEventCable(id);
  } else if (window.client) {
    console.log("is this close track working?")
    window.localAudioTrack.stop();
    window.localAudioTrack.close();
    window.localAudioTrack = null;
    window.client.leave();
  }
  // else {
    // make sure the agora sdk is not being accessed
  // }

});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
