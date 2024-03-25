const {
  selectAllTodos,
  selectTodoById,
  insertTodo,
  updateTodo,
  destroyTodo,
} = require("#avada/database/todoRepository.js");
/**
 * Get all list of todos with parameters is limit or orderBy
 * @param  ctx
 * @return {{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}[]}
 */
async function getAllTodos(ctx) {
  try {
    const {todos, totalPage} = selectAllTodos(ctx.query);
    return (ctx.body = {
      status: 200,
      data: todos,
      message: "Successfully",
      totalPage: totalPage,
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}
/**
 * Get Todo By Id
 * @param  ctx
 * @return { id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}
 */
async function getTodoById(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    const todo = selectTodoById(id, fields);
    return (ctx.body = {
      status: 200,
      data: todo,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}

/**
 * Create new todo
 * @param  ctx
 * @return {status: number; message: string}
 */
async function createTodo(ctx) {
  try {
    const body = ctx.request.body;
    insertTodo(body);
    return (ctx.body = {
      status: 201,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}
/**
 * Update todo by todoId
 * @param  ctx
 * @return {status: number; data:{id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}; message: string}
 */
async function putTodo(ctx) {
  try {
    const { id } = ctx.params;
    const todo = ctx.request.body;
    const data = updateTodo(id, todo);
    return (ctx.body = {
      status: 200,
      data: { ...data, id },
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}
/**
 * Delete todo by todoId
 * @param  ctx
 * @return {status: number; message: string}
 */
async function deleteTodo(ctx) {
  try {
    const { id } = ctx.params;
    destroyTodo(id);
    return (ctx.body = {
      status: 200,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  putTodo,
  deleteTodo,
};
