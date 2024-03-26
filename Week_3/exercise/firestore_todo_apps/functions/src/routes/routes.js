const Router = require("koa-router");
const propsUrl = require("#avada/const/index.js");
const todoHandler = require("#avada/controllers/todoControllers.js");
const {
  toDoInsertMiddleware,
  todoUpdateMiddleware,
} = require("#avada/middleware/todoInputMiddleware.js");
const { PREFIX_DOMAIN_API, VERSION_ENDPOINT } = propsUrl;

//Configuration for router with properties
const router = new Router({
  prefix: PREFIX_DOMAIN_API,
  version: VERSION_ENDPOINT
});

//Declaration for each router
router.get(`/todos`, todoHandler.getAllTodos);
router.get(`/todo/:id`, todoHandler.getTodoById);
router.post(`/todos`, toDoInsertMiddleware, todoHandler.createTodo);
router.put(`/todos/:id`, todoUpdateMiddleware, todoHandler.putTodo);
router.delete(`/todos/:id`, todoHandler.deleteTodo);

module.exports = router;
