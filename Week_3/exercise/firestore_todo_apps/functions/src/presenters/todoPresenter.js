const { convertTimestampToDate } = require("#avada/helpers/convertDate.js");
/**
 *
 * @param {Todo} data
 * @returns {Todo}
 */
function presentTodo(data) {
  const { id, created_at, updated_at, ...rest } = data;
  return {
    id,
    created_at: convertTimestampToDate(created_at),
    updated_at: convertTimestampToDate(updated_at),
    ...rest,
  };
}
module.exports = {
  presentTodo,
};
