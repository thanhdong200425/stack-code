export function getLocalTime() {
    let timeUpdate = new Date();
    let options = {
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };
    let localTimeUpdate = new Intl.DateTimeFormat("en-US", options).format(timeUpdate);

    return localTimeUpdate;
}
