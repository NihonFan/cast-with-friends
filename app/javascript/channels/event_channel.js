import consumer from "./consumer";

const initEventCable = () => {
  const eventContainer = document.getElementById('event');
  if (eventContainer) {
    const id = eventContainer.dataset.eventId;

    consumer.subscriptions.create({ channel: "EventChannel", id: id }, {
      received(data) {
        fetch(`/api/v1/events/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.state === "playing") {
            if (window.audio_id) {
              // window.howler_audio.pause();
              window.howler_audio.seek(data.elapsed_seconds, window.audio_id);
              window.howler_audio.play(window.audio_id);
            } else {
              window.audio_id = window.howler_audio.play();
              window.howler_audio.seek(data.elapsed_seconds, window.audio_id);
            }

            // .then(() => {
            // window.howler_audio.seek(data.elapsed_seconds).play(howler_audio._sounds._id);
            // window.howler_audio.play();
          } else if (data.state === "paused") {
            window.howler_audio.pause();
            // window.howler_audio.pause(howler_audio._sounds._id);
          }
        })


        // const  = JSON.parse(apiCall);



        // POST /events/123/actions/play
        //console.log(data); // called when data is broadcast in the cable
        // howler play and pause
        //fetch api for show, check what the state of the media is

        // if (data === "play") {

        //   window.howler_audio.play();
        // } else if (data === "pause") {
        //   window.howler_audio.pause();
        // }
      },
    });
  }
}

export { initEventCable }
