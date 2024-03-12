const Router = require("koa-router");
const propsUrl = require("#avada/const/index.js");
const productHandler = require("#avada/handlers/product/productHandlers.js");
const {
  productInsertMiddleware, productUpdateMiddleware,
} = require("#avada/middleware/productInputMiddleware.js");
const { PREFIX_DOMAIN, VERSION_ENDPOINT } = propsUrl;

//Configuration for router with properties
const router = new Router({
  prefix: PREFIX_DOMAIN,
  version: VERSION_ENDPOINT,
});

//Declaration for each router
router.get("/products", productHandler.getAllProducts);
router.get("/product/:id", productHandler.getProductById);
router.post("/products", productInsertMiddleware, productHandler.createProduct);
router.put("/products/:id", productUpdateMiddleware, productHandler.putProduct);
router.delete("/products/:id", productHandler.deleteProduct);

module.exports = router;
