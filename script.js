import { songs } from "./db.js";

const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const nextBtn = document.querySelector("#next");
const rangeTime = document.querySelector("#time-range");

let audio = new Audio(songs[0].src);
let isPlaying = true;
let trackIndex = 0;

playBtn.addEventListener("click", playPause);
stopBtn.addEventListener("click", stopAudio);
nextBtn.addEventListener("click", nextAudio);
rangeTime.addEventListener("click", clickTimeline);
audio.addEventListener("ended", endedAudio);

function playPause() {
    if (isPlaying) {
        playBtn.textContent = "Pause";

        audio.play();
        isPlaying = false;
    } else {
        playBtn.textContent = "Resume";

        audio.pause();
        isPlaying = true;
    }
}

function stopAudio() {
    playBtn.textContent = "Play";

    audio.pause();
    audio.currentTime = 0;
    isPlaying = true;
}

function nextAudio() {
    stopAudio();

    trackIndex++;
    if (trackIndex > songs.length - 1) {
        trackIndex = 0;
    }
    audio = new Audio(songs[trackIndex].src);
    isPlaying = true;
    getCover();
    playPause();
}

function endedAudio() {
    nextAudio();
}

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor((millis % 3600) / 60)
        .toString()
        .padStart(2, "0");
    let seconds = Math.floor(millis % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}

function timeline() {
    rangeTime.max = audio.duration;
    rangeTime.value = audio.currentTime;
}
setInterval(timeline, 500);

function clickTimeline() {
    audio.currentTime = rangeTime.value;
}

function getTitleOfFile(source) {
    let getIndexLastBackslash = source.lastIndexOf("/");
    getIndexLastBackslash = getIndexLastBackslash + 1;
    source = source
        .slice(getIndexLastBackslash)
        .replaceAll("%20", " ")
        .replaceAll("-", " ");
    return source;
}

function getCover() {
    const imgElement = document.querySelector("#cover");
    imgElement.setAttribute("src", songs[trackIndex].cover);
}

function render() {
    const time = document.querySelector("#time");
    const title = document.querySelector("#title");

    // render Titel
    title.textContent = getTitleOfFile(audio.src);

    // render currentTime
    time.textContent = millisToMinutesAndSeconds(audio.currentTime);
    requestAnimationFrame(render);
}

function handleInitial() {
    render();
    getCover();
}

handleInitial();