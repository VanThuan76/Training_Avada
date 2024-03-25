const fs = require("fs");
const pick = require("lodash.pick");

const { PATH_DIRECTOR_SRC } = require("#avada/const/index.js");
const { sortByDate } = require("#avada/helpers/utils/dateHelpers.js");
let products = require("#avada/database/products.json");

/**
 * SELECT * products from json()
 * @param {{limit: number; orderBy: string}} query
 * @return {{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}[]}
 */
function selectAllProducts(query) {
  try {
    // FIXME: Refactor-V2
    const { orderBy, limit } = query;
    products = orderBy ? sortByDate({ products, orderBy }) : products;
    products = limit ? products.slice(0, limit) : products;
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * SELECT * products from json() WHERE id = {?}
 * @param {number} id
 * @param {string} fields
 * @return {{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}}
 */
function selectProductById(id, fields) {
  try {
    if (!id) throw new Error("id is required");
    // FIXME: Refactor-V2
    let product = products.find((product) => product.id === parseInt(id));
    if (fields) {
      const arrFields = (product && fields.split(",")) || [];
      product = arrFields.length > 0 ? pick(product, arrFields) : product;
    }
    return product;
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * INSERT INTO product VALUES(...)
 * @param {{ name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}} values
 * @return
 */
function insertProduct(values) {
  try {
    const id = products.length + 1; //Auto increment
    const createdAt = new Date();
    const body = {
      ...values,
      id,
      createdAt,
    };
    const newProducts = JSON.stringify([...products, body], null, 2);
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/products.json`,
      newProducts
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}
/**
 * UPDATE products SET ... WHERE ...
 * @param {id:number; { name: string; | price: number; | description: string; | product: string; | color: string; | createdAt: string; | image: string;}} values
 * @return
 */
function updateProduct(id, values) {
  try {
    if (!id) throw new Error("id is required");
    // FIXME: Refactor-V2
    const productIndex = products.findIndex((product) => product.id == id);
    products[productIndex] = {
      ...products[productIndex],
      ...values,
    };
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/products.json`,
      JSON.stringify(products, null, 2)
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}
/**
 * DELETE FROM products WHERE id = {?}
 * @param {id:number;} id
 * @return
 */
function destroyProduct(id) {
  try {
    if (!id) throw new Error("id is required");
    const productById = selectProductById(id);
    products.splice(productById.id, 1);
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/products.json`,
      products
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  destroyProduct,
};
