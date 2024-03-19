const Router = require("koa-router");
const {PREFIX_ENDPOINT} = require("../constants");
const helloController = require("../handlers/controllers/helloController");

const router = new Router({
  prefix: PREFIX_ENDPOINT,
});
router.get(`/hello`, helloController.hello);

module.exports = router;
