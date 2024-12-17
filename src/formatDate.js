function formatDateTime(dateString, admin = false) {
  const date = new Date(dateString);

  // Days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Months of the year
  const months = [
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

  // Get day, date, month, and year
  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Add suffix to the date (st, nd, rd, or th)
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Handles 4th - 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const daySuffix = getDaySuffix(day);

  // Get time in 12-hour format
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 0 or 12 to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading 0 to minutes if needed

  const time = `${formattedHours}${
    minutes === 0 ? "" : ":" + formattedMinutes
  }${ampm}`;

  // Final formatted string
  if (admin) {
    const formattedDate = `${dayName},${day} ${month} , ${year}`;
    return `${formattedDate}`;
  }

  return `${dayName}, ${day}${daySuffix} ${month}, ${year} at ${time}`;
}
export default formatDateTime;
