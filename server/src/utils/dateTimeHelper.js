const convertHourTo12HourTime = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:00 ${period}`;
};

export const convertTimeRange = (earlyTime, lateTime) => {
  const early = convertHourTo12HourTime(earlyTime);
  const late = convertHourTo12HourTime(lateTime);
  return { early, late };
};
