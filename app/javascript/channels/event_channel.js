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

          AgoraRTC.getDevices()
            .then(devices => {
              const audioDevices = devices.filter(function(device){
                  return device.kind === "audioinput";
              });
              var selectedMicrophoneId = audioDevices[0].deviceId;
              return Promise.all([
                AgoraRTC.createMicrophoneAudioTrack({ microphoneId: selectedMicrophoneId }), 0
              ]);
            })
            .then((audioTrack) => {
              setInterval(() => {
                const level = audioTrack[0].getVolumeLevel();
                console.log("local stream audio level", level);
              }, 1000);
            });

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
            token: document.getElementById('agora-temp-token').innerText
          };

          const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

          client.on("user-published", async (user, mediaType) => {
            // Subscribe to a remote user.
            await client.subscribe(user, mediaType);
            console.log("subscribe success");

            // If the subscribed track is audio.
            if (mediaType === "audio") {
              // Get `RemoteAudioTrack` in the `user` object.
              window.remoteAudioTrack = user.audioTrack;
              // Play the audio track. No need to pass any DOM element.
              window.remoteAudioTrack.play();
            }
          });

          client.on("user-unpublished", async (user, mediaType) => {
            // Subscribe to a remote user.
            await client.unsubscribe(user, mediaType);
            console.log("unsubscribe success");

            // If the subscribed track is audio.
            if (mediaType === "audio") {
              // Get `RemoteAudioTrack` in the `user` object.
              // Play the audio track. No need to pass any DOM element.
              if (window.remoteAudioTrack) {
                window.remoteAudioTrack.pause();
              };
            }
          });

          async function startBasicCall() {
            await client.join(options.appId, options.channel, options.token, null);
            window.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            await client.publish(window.localAudioTrack);
          }

          async function leaveBasicCall() {
            console.log("ready to unpublish")
            await client.unpublish(window.localAudioTrack);
            await client.leave();
            console.log("finished unpublishing")
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

