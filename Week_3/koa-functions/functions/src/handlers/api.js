const Koa = require("koa");
const koaBody = require("koa-body");
const routes = require("../routes/routes");

const app = new Koa();

app
  .use(routes.routes())
  .use(routes.allowedMethods())

module.exports = app;
