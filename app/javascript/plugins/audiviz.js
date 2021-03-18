var audio = document.getElementById("audio");
var playBtn = document.getElementById("play");
var prog = document.getElementById("progress");
var playTime = document.getElementById("time-played");

playBtn.addEventListener("click", function (e) {
  if (audio.paused) {
    audio.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    audio.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
});


function paddZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function update() {
  var played = audio.currentTime;
  prog.value = audio.currentTime;
  played =
    played < 60
      ? "00:" + paddZero(Math.floor(played))
      : paddZero(Math.floor(played / 60)) +
        ":" +
        paddZero(Math.floor(played % 60));
  playTime.innerText = played;
  if (audio.currentTime >= 151) {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
    audio.pause();
    bars.classList.remove('active');
  }
  requestAnimationFrame(update);
}

update();
