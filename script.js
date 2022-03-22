const audioElement = document.querySelector("#track");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const audio = document.querySelector("audio");
const rangeTime = document.querySelector("#time-range");

let isPlaying = true;

playBtn.addEventListener("click", playPause);
stopBtn.addEventListener("click", stopAudio);
rangeTime.addEventListener("change", clickTimeline);

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
    if (isPlaying === false || isPlaying === true) {
        playBtn.textContent = "Play";

        audioElement.pause();
        audioElement.currentTime = 0;
        isPlaying = true;
    }
}

function endedAudio() {
    audioElement.addEventListener("ended", function() {
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
    elem.setAttribute("value", audioElement.currentTime);
    elem.setAttribute("max", audioElement.duration);
    elem.setAttribute("min", 0);
    return elem;
}

function clickTimeline() {
    audioElement.currentTime = rangeTime.value;
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

function render() {
    const time = document.querySelector("#time");
    const title = document.querySelector("#title");

    // render Titel
    title.textContent = getTitleOfFile(audio.src);

    // render currentTime
    time.textContent = millisToMinutesAndSeconds(audioElement.currentTime);
    timeline(rangeTime);
    requestAnimationFrame(render);
}

function handleInitial() {
    render();
    endedAudio();
}

handleInitial();