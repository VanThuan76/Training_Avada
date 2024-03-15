const fs = require("fs");
const products = require("#avada/database/products.json");

/**
 * SELECT * products from json()
 * @return {{ id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}[]}
 */
function selectAllProducts() { //Find docs name
  try {
    return products;
  } catch (error) {
    console.error(error);
    return []
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
    return products.find((product) => product.id === parseInt(id));
  } catch (error) {
    console.error(error);
    return {}
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
    return false
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
    const productIndex = products.findIndex((product) => product.id == id);

    // FIXME: Refactor
    products.map(product => product.id === productIndex ? {...product, ...values} : product)
    // Old
    // products[productIndex].name = values.name || products[productIndex].name
    // products[productIndex].price = values.price || products[productIndex].price
    // products[productIndex].description = values.description || products[productIndex].description
    // products[productIndex].product = values.product || products[productIndex].product
    // products[productIndex].color = values.color || products[productIndex].color
    // products[productIndex].image = values.image || products[productIndex].image
    
    return fs.writeFileSync(
      `${PATH_DIRECTOR_SRC}/src/database/products.json`,
      JSON.stringify(products, null, 2)
    );
  } catch (error) {
    console.error(error);
    return false
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
    return false
  }
}

module.exports = {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  destroyProduct
};
