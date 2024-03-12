const {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  destroyProduct,
} = require("#avada/database/productRepository.js");
const { convertToTimestamp } = require("#avada/helpers/convertDate.js");
/**
 * Get all list of products with parameters is limit or orderBy
 * @param  ctx
 * @return {status: number; data:{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}[]; message: string;}
 */
async function getAllProducts(ctx) {
  try {
    const { limit, orderBy } = ctx.query;
    let products = selectAllProducts();
    products = limit ? products.slice(0, limit) : products;
    products = orderBy
      ? orderBy === "asc" && products
        ? products.sort(
            (a, b) =>
              convertToTimestamp(a.createdAt) - convertToTimestamp(b.createdAt)
          )
        : products.sort(
            (a, b) =>
              convertToTimestamp(b.createdAt) - convertToTimestamp(a.createdAt)
          )
      : products;
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
    })
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
    const arrFields = (fields && product && fields.split(",")) || [];
    for (let i = 0; i < arrFields.length; i++) {
      productWithFields[arrFields[i]] = product[arrFields[i]];
    }

    return (ctx.body = fields
      ? productWithFields
      : product
      ? {
          status: 200,
          data: product,
          message: "Successfully",
        }
      : {
          status: 401,
          data: [],
          message: "Not Found By Id",
        });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    })
  }
}

/**
 * Create new product
 * @param  ctx
 * @return {status: number; message: string}
 */
async function createProduct(ctx){
  try {
      const body = ctx.request.body;
      insertProduct(body)
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
    })
  }
}
/**
 * Update product by productId
 * @param  ctx
 * @return {status: number; data:{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}; message: string}
 */
async function putProduct(ctx){
  try {
      const { id } = ctx.params;
      const body = ctx.request.body;
      updateProduct(id, body)
      return (ctx.body = {
        status: 200,
        data: {...data, id},
        message: "Successfully",
      });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    })
  }
}
/**
 * Delete product by productId
 * @param  ctx
 * @return {status: number; message: string}
 */
async function deleteProduct(ctx){
  try {
      const { id } = ctx.params;
      destroyProduct(id)
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
    })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  putProduct,
  deleteProduct
};
