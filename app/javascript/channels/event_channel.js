import consumer from "./consumer";

const initEventCable = () => {
  const eventContainer = document.getElementById('event');
  if (eventContainer) {
    const id = eventContainer.dataset.eventId;

    consumer.subscriptions.create({ channel: "EventChannel", id: id }, {
      received(data) {
        // POST /events/123/actions/play
        //console.log(data); // called when data is broadcast in the cable
        // howler play and pause
        if (data === "play") {
          window.howler_audio.play();
        } else if (data === "pause") {
          window.howler_audio.pause();
        }
      },
    });
  }
}

export { initEventCable }
