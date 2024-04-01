const Router = require("koa-router");
const propsUrl = require("#avada/const/index.js");
const todoHandler = require("#avada/handlers/product/todoHandlers.js");
const {
  toDoInsertMiddleware,
  todoUpdateMiddleware,
} = require("#avada/middleware/todoInputMiddleware.js");
const { PREFIX_DOMAIN_API, VERSION_ENDPOINT } = propsUrl;

//Configuration for router with properties
const router = new Router({
  version: VERSION_ENDPOINT,
});

//Declaration for each router
router.get(`${PREFIX_DOMAIN_API}/todos`, todoHandler.getAllTodos);
router.get(`${PREFIX_DOMAIN_API}/todo/:id`, todoHandler.getTodoById);
router.post(
  `${PREFIX_DOMAIN_API}/todos`,
  toDoInsertMiddleware,
  todoHandler.createTodo
);
router.put(
  `${PREFIX_DOMAIN_API}/todos/:id`,
  todoUpdateMiddleware,
  todoHandler.putTodo
);
router.put(
  `${PREFIX_DOMAIN_API}/todos`,
  todoUpdateMiddleware,
  todoHandler.multiplePutTodo
);
router.delete(`${PREFIX_DOMAIN_API}/todos/:id`, todoHandler.deleteTodo);

module.exports = router;
