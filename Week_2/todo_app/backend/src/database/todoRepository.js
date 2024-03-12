const fs = require("fs");
const todos = require("#avada/database/todos.json");
const { PATH_DIRECTOR_SRC } = require("#avada/const/index.js");
/**
 * SELECT * todos from json()
 * @return {{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}[]}
 */
function selectAllTodos() {
  try {
    return todos;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

/**
 * SELECT * todos from json() WHERE id = {?}
 * @param {id: number} id
 * @return {{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}}
 */
function selectTodoById(id) {
  try {
    if (!id) throw new Error("id is required");
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
    const todoById = selectTodoById(id);
    todos[todoById.id] = { ...values };
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/todos.json`,
      todos
    );
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
