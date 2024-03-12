const fs = require("fs");
const products = require("#avada/database/products.json");

/**
 * SELECT * products from json()
 * @return {{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}[]}
 */
function selectAllProducts() {
  try {
    return products;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

/**
 * SELECT * products from json() WHERE id = {?}
 * @param {id: number} id
 * @return {{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}}
 */
function selectProductById(id) {
  try {
    if (!id) throw new Error("id is required");
    return products.find((product) => +product.id === +id);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
      "/Users/macs/Avada/Training/Week_1/koajs_exercise/src/database/products.json",
      newProducts
    );
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
    const productById = selectProductById(id);
    products[productById.id] = { ...values };
    return fs.writeFileSync(
      "/Users/macs/Avada/Training/Week_1/koajs_exercise/src/database/products.json",
      products
    );
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
      "/Users/macs/Avada/Training/Week_1/koajs_exercise/src/database/products.json",
      products
    );
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  destroyProduct
};
