import { addZeros } from "./utils.js";

class Time {
    constructor(timeEl) {
        this.timeEl = timeEl;
    }

    showTime() {
        let today = new Date(),
            hour = today.getHours(),
            min = today.getMinutes(),
            sec = today.getSeconds();

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let day = today.getDate(),
            dayOfWeek = days[today.getDay()],
            month = months[today.getMonth()];
        this.timeEl.innerHTML = `<span>${hour}:${addZeros(min)}:${addZeros(sec)},</span><span>${day} ${dayOfWeek} ${month}</span>`;

        setTimeout(this.showTime.bind(this), 1000);
    }
}

export default Time;