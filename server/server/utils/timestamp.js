exports.getTimestamp = () => {
    const currentTime = new Date();

    let hours = String(currentTime.getHours());
    hours.length === 1 ? hours = `0${hours}` : hours;
    let minutes = String(currentTime.getMinutes());
    minutes.length === 1 ? minutes = `0${minutes}` : minutes;
    let seconds = String(currentTime.getSeconds());
    seconds.length === 1 ? seconds = `0${seconds}` : seconds;
    
    return `[${hours}:${minutes}:${seconds}]`;
};