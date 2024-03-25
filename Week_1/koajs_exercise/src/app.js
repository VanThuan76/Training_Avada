const Koa = require("koa");
const koaBody = require("koa-body");
const render = require("koa-ejs");
const dotenv = require("dotenv");
const path = require("path");
const routes = require("#avada/routes/routes.js");

dotenv.config();
if (!process.env.NODE_PORT) {
  process.exit(1);
}
const app = new Koa();
//Render app view
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.listen(process.env.NODE_PORT, () => {
  console.log(`Server port ${process.env.NODE_PORT} up and running...`);
});
