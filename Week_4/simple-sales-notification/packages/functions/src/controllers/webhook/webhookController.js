import {getShopByShopifyDomain} from '@avada/core';
import {addNotification} from '@functions/repositories/notificationRepository';
import { selectItemNotification } from '@functions/repositories/notificationRepository';

let processingWebhook = false;
export async function listNewOrder(ctx) {
  try {
    if (processingWebhook) {
      return (ctx.body = {
        success: false,
        errors: "Another webhook is currently being processed"
      });
    }
    processingWebhook = true;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopifyInfor = {
      shopId: shop.id,
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    };
    const itemNotifi = await selectItemNotification(shopifyInfor, orderData)
    const result = await addNotification(shopifyInfor, itemNotifi, 'webhook');
    processingWebhook = false;
    if (result) {
      return (ctx.body = {
        data: result,
        status: 200,
        success: true
      });
    } else {
      return (ctx.body = {
        data: null,
        status: 200,
        success: true
      });
    }
  } catch (error) {
    processingWebhook = false;
    console.error(error);
    return (ctx.body = {
      success: false,
      errors: error.message
    });
  }
}
