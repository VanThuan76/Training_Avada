import {getShopByShopifyDomain} from '@avada/core';
import {registerWebhook} from '@functions/services/webhookService';
import {initDefaultSetting} from '@functions/controllers/settingController';
import * as shopifyApiService from '@functions/services/shopifyApiService';

/**
 * After install App Shopify
 * @param {Object} ctx
 * @return
 */
export async function afterInstallService(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop; //Default in core avada
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopifyInfor = {...shop, shopName: shopifyDomain, accessToken: shop.accessToken};
    
    await Promise.allSettled([
      initDefaultSetting(shopifyInfor),
      registerWebhook(shopifyInfor),
      shopifyApiService.getListOrders(shopifyInfor)
    ]);
  } catch (error) {
    console.error(error);
  }
}
