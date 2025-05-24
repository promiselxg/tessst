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
  const humanReadableDate = new Intl.DateTimeFormat("en-US", options)?.format(
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

export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (years > 0) return rtf?.format(-years, "year");
  if (months > 0) return rtf?.format(-months, "month");
  if (days > 0) return rtf?.format(-days, "day");
  if (hours > 0) return rtf?.format(-hours, "hour");
  if (minutes > 0) return rtf?.format(-minutes, "minute");
  return rtf?.format(-seconds, "second");
}
