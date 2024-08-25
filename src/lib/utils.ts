export const formatDateTimeToText = (date: Date): string => {
  const targetDate = new Date(date).getTime();
  const now = Date.now();
  const diffInSeconds = (targetDate - now) / 1000;

  const units = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  const formatter = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  for (const [unit, secondsInUnit] of Object.entries(units)) {
    const difference = Math.round(diffInSeconds / secondsInUnit);
    if (Math.abs(difference) >= 1) {
      return formatter.format(difference, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "방금 전";
};
