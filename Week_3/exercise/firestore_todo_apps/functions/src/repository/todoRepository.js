const admin = require("firebase-admin");

const { convertTimestampToDate } = require("#avada/helpers/convertDate.js");
const serviceAccount = require("../../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

/**
 * SELECT * todos from todo collection
 * @param {number} limit
 * @param {{field: string; value: desc|asc}} orderBy
 * @return {Promise{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}[]}
 */
async function selectAllTodos(limit, orderBy) {
  try {
    const collection = db.collection("todo");
    const todosQuery = collection
      .orderBy(orderBy.field, orderBy.value) //indexes
      .limit(parseInt(limit));

    //Excute a query
    const todosSnapshot = await todosQuery.get();
    const todos = todosSnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      data.created_at = convertTimestampToDate(data.created_at);
      data.updated_at = convertTimestampToDate(data.updated_at);
      return data;
    });
    return todos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * SELECT * todos from json() WHERE id = {?}
 * @param {id: number} id
 * @return {Promise{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}}
 */
async function selectTodoById(id) {
  try {
    if (!id) throw new Error("id is required");
    const todosQuery = db.collection("todo").doc(id);
    //Excute a query
    const todoSnapshot = await todosQuery.get();
    return todoSnapshot.exists
      ? {
          ...todoSnapshot.data(),
          id: todoSnapshot.data().id,
          created_at: convertTimestampToDate(todoSnapshot.data().created_at),
          updated_at: convertTimestampToDate(todoSnapshot.data().updated_at),
        }
      : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * INSERT INTO todo VALUES(...)
 * @param {{ title: string; }} values
 * @return
 */
async function insertTodo(values) {
  try {
    const todo = await db.collection("todo").add({
      ...values,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    });
    return todo.id;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * UPDATE todos SET ... WHERE ...
 * @param {id:number; { title: string; | status: number; | is_deleted: boolean;}} values
 * @return
 */
async function updateTodo(id, values) {
  try {
    if (!id) throw new Error("id is required");
    const todoRef = db.collection("todo").doc(id);
    const updateTodo = await todoRef.update({
      status: values.status,
      updated_at: new Date(),
      is_deleted: values.is_deleted,
    });
    return updateTodo.id;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * DELETE FROM todos WHERE id = {?}
 * @param {id:number;} id
 * @return {}
 */
async function destroyTodo(id) {
  try {
    if (!id) throw new Error("id is required");
    const todoRef = db.collection("todo").doc(id);
    const res = todoRef.delete();
    return res.id;
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
