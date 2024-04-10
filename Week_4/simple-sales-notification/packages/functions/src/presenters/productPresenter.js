/**
 *
 * @param {Product} data, //Shopify
 * @returns {any}
 */
export default function presentProduct(data) {
  return {
    productName: data.product.title,
    productImage: data.product.featuredImage.url
  };
}
