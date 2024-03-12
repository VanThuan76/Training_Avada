const Koa = require("koa");
const koaBody = require("koa-body");
const dotenv = require("dotenv");
const cors = require('@koa/cors');
const routes = require("#avada/routes/routes.js");

dotenv.config();
if (!process.env.NODE_PORT) {
  process.exit(1);
}
//Initialize configuration with "KoaJs"
const app = new Koa();
app.use(koaBody());
app.use(cors());
app.use(routes.routes());
app.use(routes.allowedMethods());

//Server listenning on port
app.listen(process.env.NODE_PORT, () => {
  console.log(`Server port ${process.env.NODE_PORT} up and running...`);
});
