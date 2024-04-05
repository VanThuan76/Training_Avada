import {getShopByShopifyDomain} from '@avada/core';
import { selectItemNotifiaction, addNotification } from '@functions/repositories/notificationRepository';

export async function listNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.request.body; //ctx.request ctx.req
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = {
      shopName: shopifyDomain,
      accessToken: shop.access_token
    };
    //Check logic - orderData ~ noti
    const notifications = await selectItemNotifiaction(shopify, orderData);
    await addNotification({shopId: shop.id, shopifyDomain, data: notifications});
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      sucess: false
    });
  }
}
