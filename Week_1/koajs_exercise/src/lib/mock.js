const { faker } = require("@faker-js/faker");
const fs = require("fs");

/**
 * Create a new array random production
 * @return {id: number; name: string; price: number; description: string; product: string; color: string; createdAt: string; image: string;}
 */
function createRandomProduct() {
  return {
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    product: faker.commerce.productAdjective(),
    color: faker.color.human(),
    createdAt: faker.date.recent(),
    image: faker.image.avatar(),
  };
}
const PRODUCTS = faker.helpers.multiple(createRandomProduct, {
  count: 1000,
});

/**
* Generate A List of Product Which Contains 1000 Records By FAKERJS
* @generator
* @function generateMockProduct
*/
function generateMockProduct() {
  const mockData = JSON.stringify(PRODUCTS, null, 2); // Find stackoverflows
  fs.writeFileSync("/Users/macs/Avada/Training/Week_1/koajs_exercise/src/database/products.json", mockData)
}
generateMockProduct()
module.exports = {
  generateMockProduct,
};
