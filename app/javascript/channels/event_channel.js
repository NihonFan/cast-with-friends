import consumer from "./consumer";
import AgoraRTC from "agora-rtc-sdk-ng"


const initEventCable = () => {
  const eventContainer = document.getElementById('event');
  if (eventContainer) {
    const id = eventContainer.dataset.eventId;



    consumer.subscriptions.create({ channel: "EventChannel", id: id }, {
      received(data) {
        fetch(`/api/v1/events/${id}`)
        .then((response) => response.json())
        .then((data) => {

          var rtc = {
            // For the local client.
            client: null,
            // For the local audio track.
            localAudioTrack: null,
          };

          var options = {
            // Pass your app ID here.
            appId: "c8884b4e78204e869b61c7022282e104",
            // Set the channel name.
            channel: id,
            // Pass a token if your project enables the App Certificate.
            token: document.getElementById('agora-temp-token').innerHTML
          };

          const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

          async function startBasicCall() {
            await client.join(options.appId, options.channel, options.token, null);
          }

          async function leaveBasicCall() {
            await client.leave();
          }




          if (data.state === "playing") {
            leaveBasicCall();
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
            startBasicCall();
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

