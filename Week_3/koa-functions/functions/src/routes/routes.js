const Router = require("koa-router");
const { VERSION_ENDPOINT } = require("../constants");
const helloController = require("../handlers/controllers/helloController");

const router = new Router({
  version: VERSION_ENDPOINT,
});
router.get(`/hello`, helloController.hello);

module.exports = router;
