const fs = require("fs");
const pick = require("lodash.pick");

let todos = require("#avada/database/todos.json");
const { PATH_DIRECTOR_SRC } = require("#avada/const/index.js");
const { sortByDate } = require("#avada/helpers/sortHelper.js");
const {searchByName} = require("#avada/helpers/searchHelper.js");

/**
 * SELECT * todos from json()
 * @param {object} query
 * @return {{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}[]}
 */
function selectAllTodos(query) {
  try {
    // FIXME: Refactor-V2
    todos = query.updated_at ? sortByDate(todos, query.updated_at) : todos;
    todos = query.search ? searchByName(todos, query.search) : todos;
    todos = query.page ? todos.slice(0, query.page ? query.page * 5 : 5) : todos; //Limit 5
    const totalPage = Math.ceil(todos.length / 5);
    return { todos: todos, totalPage: totalPage };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

/**
 * SELECT * todos from json() WHERE id = {?}
 * @param {id: number} id
 * @param {string} fields
 * @return {{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}}
 */
function selectTodoById(id, fields) {
  try {
    if (!id) throw new Error("id is required");
    // FIXME: Refactor-V2
    let todo = todos.find((todo) => todo.id === parseInt(id));
    if (fields) {
      const arrFields = (todo && fields.split(",")) || [];
      todo = arrFields.length > 0 ? pick(todo, arrFields) : todo;
    }
    return todos.find((todo) => +todo.id === +id);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

/**
 * INSERT INTO todo VALUES(...)
 * @param {{ title: string; }} values
 * @return
 */
function insertTodo(values) {
  try {
    const id = todos.length + 1; //Auto increment
    const insertDate = new Date().toISOString();
    const body = {
      ...values,
      id,
      created_at: insertDate,
      updated_at: insertDate,
      is_deleted: false,
    };
    const newTodo = JSON.stringify([...todos, body], null, 2);
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/todos.json`,
      newTodo
    );
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
/**
 * UPDATE todos SET ... WHERE ...
 * @param {id:number; { title: string; | status: number; | is_deleted: boolean;}} values
 * @return
 */
function updateTodo(id, values) {
  try {
    if (!id) throw new Error("id is required");
    // FIXME: Refactor-V2
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...values,
    };
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/todos.json`,
      JSON.stringify(todos, null, 2)
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}
/**
 * DELETE FROM todos WHERE id = {?}
 * @param {id:number;} id
 * @return
 */
function destroyTodo(id) {
  try {
    if (!id) throw new Error("id is required");
    const todoById = selectTodoById(id);
    todos[todoById.id] = { is_deleted: true };
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/todos.json`,
      todos
    );
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  selectAllTodos,
  selectTodoById,
  insertTodo,
  updateTodo,
  destroyTodo,
};
