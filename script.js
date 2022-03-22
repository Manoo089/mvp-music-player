const audioElement = document.querySelector("#track");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");

let isPlaying = true;

playBtn.addEventListener("click", playPause);
stopBtn.addEventListener("click", stopAudio);

function playPause() {
    if (isPlaying) {
        playBtn.textContent = "Pause";

        audioElement.play();
        isPlaying = false;
    } else {
        playBtn.textContent = "Resume";

        audioElement.pause();
        isPlaying = true;
    }
}

function stopAudio() {
    if (isPlaying === false) {
        playBtn.textContent = "Play";

        audioElement.pause();
        audioElement.currentTime = 0;
        isPlaying = true;
    }
}