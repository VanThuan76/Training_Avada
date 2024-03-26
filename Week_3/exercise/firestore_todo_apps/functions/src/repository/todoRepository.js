const serviceAccount = require("/Users/macs/Desktop/serviceAccountKoaJs.json");
const admin = require("firebase-admin");
const pick = require("lodash.pick");
const { presentTodo } = require("#avada/presenters/todoPresenter.js");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

/**
 * SELECT * todos from todo collection
 * @param {object} query
 * @return {Promise{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}[]}
 */
async function selectAllTodos(query) {
  try {
    const collectionRef = db.collection("todo");
    const snapshot = await collectionRef.get();
    const totalRecords = snapshot.size;
    const totalPages = Math.ceil(totalRecords / 5);
    let todosQuery = collectionRef
      .orderBy("updated_at", query?.updated_at || "desc")
      .limit(parseInt(query.limit || 5));
    if (query.search) {
      todosQuery = todosQuery.where('title', 'array-contains', query.search);
    }
    const todosSnapshot = await todosQuery.get();
    const todos = todosSnapshot.docs.map((doc) => {
      const docItem = doc.data();
      const id = doc.id;
      return presentTodo({ id, ...docItem });
    });
    return {todos, totalPages};
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * SELECT * todos from json() WHERE id = {?}
 * @param {id: number} id
 * @param {string} fields
 * @return {Promise{ id: number; title: string; status: number; created_at: string; updated_at: string; is_deleted: boolean;}}
 */
async function selectTodoById(id, fields) {
  try {
    if (!id) throw new Error("id is required");
    const collectionRef = db.collection("todo");
    const doc = collectionRef.doc(id).get();
    if (fields) {
      const arrFields = (doc && fields.split(",")) || [];
      doc = arrFields.length > 0 ? pick(doc, arrFields) : doc;
    }
    return doc.exists ? presentTodo(doc) : {};
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
    const collectionRef = db.collection("todo");
    const todo = await collectionRef.add({
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
    const collectionRef = db.collection("todo");
    const docRef = collectionRef.doc(id);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const todos = await docRef.update({
        status: values.status,
        updated_at: new Date(),
        is_deleted: values.is_deleted,
      });
      return todos.id;
    } else {
      return { status: 404, message: "Todo not found" };
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * DELETE FROM todos WHERE id = {?}
 * @param {id:number;} id
 * @return {Promise<>}
 */
async function destroyTodo(id) {
  try {
    if (!id) throw new Error("id is required");
    const doc = db.collection("todo").doc(id);
    const res = doc.delete();
    return res;
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
