export const dateDiffInDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.getTime() > end.getTime()) {
    return "wrong_date";
  } else {
    const difference = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
    return daysDifference > 0 ? daysDifference : 1;
  }
};

export function formatDateTime(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const humanReadableDate = new Intl.DateTimeFormat("en-US", options).format(
    date
  );
  return humanReadableDate;
}

export function formatDateWithoutTime(dateString) {
  const date = new Date(dateString);
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
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}
