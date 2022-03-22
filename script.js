const audioElement = document.querySelector("#track");
const play = document.querySelector("#play");

let isPlaying = true;

play.addEventListener("click", playPause);

function playPause() {
    if (isPlaying) {
        play.textContent = "Pause";

        audioElement.play();
        isPlaying = false;
    } else {
        play.textContent = "Resume";

        audioElement.pause();
        isPlaying = true;
    }
}