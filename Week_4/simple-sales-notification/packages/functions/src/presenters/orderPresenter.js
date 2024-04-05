/**
 *
 * @param {Order} data //Shopify
 * @returns {*}
 */
export default function presentOrder(data) {
  const order = data.orders.edges.map(order => ({
    orderId: order.node.id.split('/').pop(),
    city: order.node.billingAddress?.city,
    country: order.node.billingAddress?.country,
    firstName: order.node.billingAddress?.firstName,
    productName: order.node.lineItems.nodes[0]?.name,
    productImage: order.node.lineItems.nodes[0]?.image?.url,
    createdAt: order.node.createdAt,
  }));
  return order;
}
