import { songs } from "./db.js";

const audioElement = document.querySelector("#track");
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
    if (isPlaying === false || isPlaying === true) {
        playBtn.textContent = "Play";

        audio.pause();
        audio.currentTime = 0;
        isPlaying = true;
    }
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
    audio.addEventListener("ended", function() {
        stopAudio();
    });
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

function timeline(elem) {
    elem.max = audio.duration;
    elem.setAttribute("value", audio.currentTime);
    return elem;
}

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
    timeline(rangeTime);
    requestAnimationFrame(render);
}

function handleInitial() {
    render();
    getCover();
    endedAudio();
}

handleInitial();