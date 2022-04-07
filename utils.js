export function getElement(querySelector) {
    return document.querySelector(querySelector);
}

export function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor((millis % 3600) / 60)
        .toString()
        .padStart(2, "0");
    let seconds = Math.floor(millis % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}

export function getTitleOfFile(source) {
    let getIndexLastBackslash = source.lastIndexOf("/");
    getIndexLastBackslash = getIndexLastBackslash + 1;
    source = source
        .slice(getIndexLastBackslash)
        .replaceAll("%20", " ")
        .replaceAll("-", " ");
    return source;
}

export function getBackgroundSize(input) {
    const min = +input.min || 0;
    const max = +input.max || audio.duration;
    const value = +input.value;

    const size = ((value - min) / (max - min)) * 100;

    return size;
}