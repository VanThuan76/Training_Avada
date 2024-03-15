const {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  destroyProduct,
} = require("#avada/database/productRepository.js");
const { sortByDate } = require("#avada/helpers/sortByDate.js");
const pick = require('lodash.pick');

/**
 * Get all list of products with parameters is limit or orderBy
 * @param  ctx
 * @return {status: number; data:{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}[]; message: string;}
 */
async function getAllProducts(ctx) {
  try {
    const { limit, orderBy } = ctx.query;
    let products = selectAllProducts();

    // FIXME: Refactor
    products = orderBy ? sortByDate({ products, orderBy }) : products;
    products = limit ? products.slice(0, limit) : products;

    return (ctx.body = {
      status: 200,
      data: products,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}

/**
 * Get Product By Id
 * @param  ctx
 * @return {status: number; data:{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}; message: string}
 */
async function getProductById(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    const product = selectProductById(id);
    let productWithFields = {};
    
    // FIXME: Refactor
    const arrFields = (fields && product && fields.split(",")) || [];
    productWithFields = pick(product, arrFields)

    // FIXME: Refactor - "none use logic in return"
    const productFillter = fields ? productWithFields : product;
    return (ctx.body = {
      status: 200,
      data: productFillter,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}

/**
 * Create new product
 * @param  ctx
 * @return {status: number; message: string}
 */
async function createProduct(ctx) {
  try {
    const product = ctx.request.body;
    insertProduct(product);
    return (ctx.body = {
      status: 201,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}
/**
 * Update product by productId
 * @param  ctx
 * @return {status: number; data:{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}; message: string}
 */
async function putProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = ctx.request.body;
    updateProduct(id, product);
    return (ctx.body = {
      status: 200,
      data: { ...data, id },
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}
/**
 * Delete product by productId
 * @param  ctx
 * @return {status: number; message: string}
 */
async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    destroyProduct(id);
    return (ctx.body = {
      status: 200,
      message: "Successfully",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  putProduct,
  deleteProduct,
};
