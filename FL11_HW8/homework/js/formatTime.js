function formatTime(minutes) {
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    let convertHours = hours - days*24;
    let convertMinutes = minutes - (hours*60 + days*24*60);
    let result = `${days}days,${convertHours}hours,${convertMinutes < 0 ? 0 : convertMinutes}minutes`;
    return result;
}

formatTime(120);
