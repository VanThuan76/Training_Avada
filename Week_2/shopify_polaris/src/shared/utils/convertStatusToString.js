/**
 * @param {number} status
 * @return {string}
 */
export function convertStatusToString(status) {
  switch (status) {
    case 0:
      return "DELETE";
    case 1:
      return "COMPLETE";
    case 2:
      return "INCOMPLETE";
    default:
  }
}
