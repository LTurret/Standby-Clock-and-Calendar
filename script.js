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

    // Display the month name
    document.getElementById("month-name").textContent = monthNames[month];

    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = ""; // Clear previous calendar

    // Create the weekday headers in the grid
    dayNames.forEach((day) => {
        const dayElement = document.createElement("span");
        dayElement.textContent = day;
        dayElement.classList.add("weekday-header");
        calendarGrid.appendChild(dayElement);
    });

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill in the empty days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement("span");
        calendarGrid.appendChild(emptyDay);
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("span");
        dayElement.textContent = day;

        // Highlight today's date
        if (day === date.getDate()) {
            dayElement.classList.add("today");
        }

        calendarGrid.appendChild(dayElement);
    }
}
