import { songs } from "./db.js";
import {
    getElement,
    millisToMinutesAndSeconds,
    getTitleOfFile,
    getBackgroundSize,
} from "./utils.js";
import { play, stop, heart, heartFilled } from "./svgVariables.js";

// Define Elements
const playBtn = getElement("#play");
const nextBtn = getElement("#next");
const slider = getElement("input");
const durationTime = getElement("#duration");
const favBtn = getElement("#add-fav");
const menuBtn = getElement("#menu");

// Define States
let audio = new Audio(songs[0].src);
let isPlaying = true;
let isFav = true;
let trackIndex = 0;

// Define Events
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextAudio);
favBtn.addEventListener("click", addFavourite);
menuBtn.addEventListener("click", menu);
slider.addEventListener("click", clickTimeline);
slider.addEventListener("touchmove", clickTimeline); // for mobile
slider.addEventListener("touchend", clickTimeline); // for mobile
slider.addEventListener("input", () => setBackgroundSize(slider));
audio.addEventListener("ended", endedAudio);
audio.addEventListener("loadedmetadata", () => {
    durationTime.textContent = millisToMinutesAndSeconds(audio.duration);
    render();
    getCover();
});

function addFavourite() {
    if (isFav) {
        favBtn.innerHTML = heartFilled;
        isFav = false;
    } else {
        favBtn.innerHTML = heart;
        isFav = true;
    }
}

function menu() {
    alert("Leider noch keine Funktion!");
}

function playPause() {
    if (isPlaying) {
        playBtn.innerHTML = stop;

        audio.play();
        isPlaying = false;
    } else {
        playBtn.innerHTML = play;

        audio.pause();
        isPlaying = true;
    }
}

function stopAudio() {
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

function timeline() {
    slider.max = audio.duration;
    slider.value = audio.currentTime;
    setBackgroundSize(slider);
}
setInterval(timeline, 500);

function clickTimeline() {
    audio.currentTime = slider.value;
}

function getCover() {
    const imgElement = document.querySelector(".img-container");
    imgElement.style.backgroundImage = `url(${songs[trackIndex].cover})`;
    imgElement.style.backgroundSize = "cover";
    imgElement.style.backgroundPosition = "center center";
    imgElement.style.backgroundRepeat = "no-repeat";
}

function render() {
    const time = getElement("#current-time");
    const title = getElement("#title");
    const artist = getElement("#artist");

    // render Titel
    title.textContent = getTitleOfFile(audio.src);
    artist.textContent = songs[trackIndex].artist;

    // render currentTime
    time.textContent = millisToMinutesAndSeconds(audio.currentTime);
    durationTime.textContent = millisToMinutesAndSeconds(audio.duration);
    requestAnimationFrame(render);
}

function setBackgroundSize(input) {
    input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
}