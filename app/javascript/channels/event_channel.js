import consumer from "./consumer";
import AgoraRTC from "agora-rtc-sdk-ng"


const initEventCable = async (eventId) => {

  window.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  async function createAudioTrack () {
    window.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  }

  await createAudioTrack();

  var options = {
    // Pass your app ID here.
    appId: "c8884b4e78204e869b61c7022282e104",
    // Set the channel name.
    channel: eventId,
    // Pass a token if your project enables the App Certificate.
    token: document.getElementById('agora-temp-token').innerText
  };

  window.remoteAudioTracks = [];

  console.log("hello")

  window.client.on("user-published", async (user, mediaType) => {
    // Subscribe to a remote user.
    console.log("subscribe success");



    await window.client.subscribe(user, mediaType);

    // If the subscribed track is audio.

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }

      // Get `RemoteAudioTrack` in the `user` object.
    // window.remoteAudioTracks.push(user.audioTrack);
      // Play the audio track. No need to pass any DOM element.

  });

  // client.on("user-joined");

  await window.client.join(options.appId, options.channel, options.token, null);
  await window.client.publish(window.localAudioTrack);

  // window.remoteAudioTracks.forEach ((track) => {
  //   track.play();
  // })

  let fetch_status = () => {
    fetch(`/api/v1/events/${eventId}`)
    .then((response) => response.json())
    .then((data) => {

      let str = "";

      data.participant_list_names.forEach((participant_name) => {
        console.log("adding names");
        str += participant_name + " ";
      })

      document.getElementById('participant-list').innerHTML = str;


      if (data.state === "playing") {

        window.localAudioTrack.setEnabled(false);


        // window.remoteAudioTracks.forEach ((track) => {
        //   track.stop();
        // })

        // leaveBasicCall();
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
      } else if (data.state === "paused" || data.state === "unplayed") {

        window.howler_audio.pause();

        window.localAudioTrack.setEnabled(true);

        // await client.publish(window.localAudioTrack);



        // window.remoteAudioTracks.forEach ((track) => {
        //   track.play();
        // })


        // startBasicCall();
        // window.howler_audio.pause(howler_audio._sounds._id);
      }
    })
  }

  fetch_status();

  consumer.subscriptions.create({ channel: "EventChannel", id: eventId }, {
    received(data) {

    fetch_status();


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

export { initEventCable }

