export function converDateToDate(str) {
  const date = new Date(str).toISOString().split("T")[0];
  return date;
}
export function convertToTimestamp(value) {
  const timestampDate = new Date(Date.parse(value));
  return timestampDate;
}
