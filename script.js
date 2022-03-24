import { songs } from "./db.js";

const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const slider = document.querySelector("input");
const durationTime = document.querySelector("#duration");

let audio = new Audio(songs[0].src);

let isPlaying = true;
let trackIndex = 0;

playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextAudio);
slider.addEventListener("click", clickTimeline);
slider.addEventListener("mousemove", clickTimeline);
slider.addEventListener("touchmove", clickTimeline); // for mobile
slider.addEventListener("touchend", clickTimeline); // for mobile
audio.addEventListener("ended", endedAudio);
slider.addEventListener("input", () => setBackgroundSize(slider));
audio.addEventListener("loadedmetadata", () => {
  durationTime.textContent = millisToMinutesAndSeconds(audio.duration);
  render();
  getCover();
});

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
  slider.max = audio.duration;
  slider.value = audio.currentTime;
  setBackgroundSize(slider);
}
setInterval(timeline, 500);

function clickTimeline() {
  audio.currentTime = slider.value;
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
  const imgElement = document.querySelector("img");
  imgElement.setAttribute("src", songs[trackIndex].cover);
}

function render() {
  const time = document.querySelector("#current-time");
  const title = document.querySelector("#title");

  // render Titel
  title.textContent = getTitleOfFile(audio.src);

  // render currentTime
  time.textContent = millisToMinutesAndSeconds(audio.currentTime);
  durationTime.textContent = millisToMinutesAndSeconds(audio.duration);
  requestAnimationFrame(render);
}

function setBackgroundSize(input) {
  input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
}

function getBackgroundSize(input) {
  const min = +input.min || 0;
  const max = +input.max || audio.duration;
  const value = +input.value;

  const size = ((value - min) / (max - min)) * 100;

  return size;
}

const play = `<svg
xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
fill="currentColor"
class="bi bi-play-circle"
viewBox="0 0 16 16"
>
<path
  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
/>
<path
  d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
/>
</svg>`;
const stop = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pause-circle' viewBox='0 0 16 16'>
<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>
<path d='M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z'/>
</svg>`;
