let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock is active");
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log("Wake Lock is released");
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        requestWakeLock();
    } else {
        releaseWakeLock();
    }
});

requestWakeLock();

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("time").textContent = `${hours}:${minutes}`;
    updateCalendar(now);
}

function updateCalendar(date) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    const month = date.getMonth();
    const year = date.getFullYear();
    document.getElementById("month-name").textContent = monthNames[month];
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = ""; // Clear previous calendar

    dayNames.forEach((day) => {
        const dayElement = document.createElement("span");
        dayElement.textContent = day;
        dayElement.classList.add("weekday-header");
        calendarGrid.appendChild(dayElement);
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement("span");
        calendarGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("span");
        dayElement.textContent = day;
        if (day === date.getDate()) {
            dayElement.classList.add("today");
        }
        calendarGrid.appendChild(dayElement);
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(
                `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
        });
    } else {
        document.exitFullscreen();
    }
}

setInterval(updateClock, 1000);
updateClock();
