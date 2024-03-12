/**
 * Convert Date As TimeStamp To Compare
 * @param {value: string} value
 * @return {string}
 */
function convertToTimestamp(value) {
  const timestampDate = new Date(Date.parse(value));
  return timestampDate;
}

module.exports = {
    convertToTimestamp
}
