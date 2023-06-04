import format from "date-fns/format";

export const formatTimeZone = () => format(Date.now(), "(zzzz)");
export const formatTableTime = (time: Date) =>
  format(time, "MMMM d, y, h:mm:ss aa");
export const formatChartDate = (time: Date) => format(time, "MMM d");
export const formatChartTime = (time: Date) => format(time, "h:mm aa");
