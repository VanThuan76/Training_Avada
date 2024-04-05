const Shopify = require('shopify-api-node');
import appConfig from '@functions/config/app';
/**
 * Register webhook with shopify
 * @param {Object} ctx
 * @return
 */
export async function registerWebhook(shopifyInfor) {
  try {
    const shopify = new Shopify({
      shopName: shopifyInfor.shopName,
      accessToken: shopifyInfor.accessToken
    });
    const webhookFormat = {
      address: `https://${appConfig.baseUrl}/webhook/order/new`,
      format: 'json',
      topic: 'orders/create'
    }
    return await shopify.webhook.create(webhookFormat);
  } catch (error) {
    console.error(error);
  }
}
