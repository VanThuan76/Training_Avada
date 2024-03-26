const Koa = require("koa");
const cors = require("@koa/cors");
const routes = require("#avada/routes/routes.js");
const hybridBodyParser = require("#avada/middleware/bodyParseMiddleware.js");

const app = new Koa();
app.use(cors());
app.use(hybridBodyParser())
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;
