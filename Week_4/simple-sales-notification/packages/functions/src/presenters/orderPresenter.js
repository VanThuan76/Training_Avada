/**
 *
 * @param {Order[] || Order} data, //Shopify
 * @param {'api' || 'webhook'} type,
 * @returns {any}
 */
export default function presentOrder(data, type = 'api') {
  if (type === 'api') {
    const order = data.orders.edges.map(order => ({
      orderId: order.node.id.split('/').pop(),
      city: order.node.billingAddress?.city,
      country: order.node.billingAddress?.country,
      firstName: order.node.billingAddress?.firstName,
      productName: order.node.lineItems.nodes[0]?.name,
      productImage: order.node.lineItems.nodes[0]?.image?.url,
      createdAt: order.node.createdAt
    }));
    return order;
  } else {
    return {
      orderId: data.id,
      city: data.billing_address.city,
      country: data.billing_address.country,
      firstName: data.billing_address.first_name,
      productName: data.productName,
      productImage: data.productImage,
      createdAt: data.created_at
    };
  }
}
