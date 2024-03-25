const Router = require("koa-router");
const productHandler = require("#avada/handlers/product/productHandlers.js");
const {
  productInsertMiddleware,
  productUpdateMiddleware,
} = require("#avada/middleware/productInputMiddleware.js");
const {selectAllProducts, selectProductById} = require("#avada/database/productRepository.js")
const propsUrl = require("#avada/const/index.js");
const { PREFIX_DOMAIN_API, PREFIX_DOMAIN_PAGE, VERSION_ENDPOINT } = propsUrl;

const router = new Router({
  version: VERSION_ENDPOINT
});
//Render view router
router.get(`${PREFIX_DOMAIN_PAGE}/product`, async (ctx) => {
  const products = selectAllProducts()
  await ctx.render("pages/product", { products });
});
router.get(`${PREFIX_DOMAIN_PAGE}/product/:id`, async (ctx) => {
  const {id} = ctx.params
  const product = selectProductById(id)
  await ctx.render("pages/productDetail", { product });
});

//Declaration for each router
router.get(`${PREFIX_DOMAIN_API}/products`, productHandler.getAllProducts);
router.get(`${PREFIX_DOMAIN_API}/product/:id`, productHandler.getProductById);
router.post(
  `${PREFIX_DOMAIN_API}/products`,
  productInsertMiddleware,
  productHandler.createProduct
);
router.put(
  `${PREFIX_DOMAIN_API}/products/:id`,
  productUpdateMiddleware,
  productHandler.putProduct
);
router.delete(
  `${PREFIX_DOMAIN_API}/products/:id`,
  productHandler.deleteProduct
);

module.exports = router;
