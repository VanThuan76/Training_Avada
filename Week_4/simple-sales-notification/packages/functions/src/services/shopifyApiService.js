import Shopify from 'shopify-api-node';
import presentOrder from '@functions/presenters/orderPresenter';
import presentProduct from '@functions/presenters/productPresenter';
import {addNotification} from '@functions/repositories/notificationRepository';
import {QUERY_ORDERS_INITIALIZE, QUERY_PRODUCT_BY_ID} from '@functions/const/shopify';

/**
 * Sync first 30 orders from the store to notifications
 * @param {Object} shopifyInfor
 * @return {Promise<any>}
 */
export async function getListOrders(shopifyInfor) {
  try {
    const shopify = new Shopify({
      shopName: shopifyInfor.shopName,
      accessToken: shopifyInfor.accessToken
    });
    const shopifyInforFormat = {
      shopId: shopifyInfor.id,
      shopName: shopifyInfor.domain,
      accessToken: shopifyInfor.accessToken
    };
    const res = await shopify.graphql(QUERY_ORDERS_INITIALIZE);
    const beautiData = presentOrder(res);
    for (const order of beautiData) {
      await addNotification(shopifyInforFormat, order, 'api');
    }
  } catch (error) {
    console.error('Error getting list of orders:', error);
    throw error;
  }
}
/**
 * Get Product By Product Id
 * @param {Object} shopifyInfor
 * @param {string} productId
 * @return {Promise<any>}
 */
export async function getProductById(shopifyInfor, productId) {
  try {
    const shopify = new Shopify({
      shopName: shopifyInfor.shopName,
      accessToken: shopifyInfor.accessToken
    });
    const queryString = QUERY_PRODUCT_BY_ID(productId);
    const res = await shopify.graphql(queryString);
    const beautiData = presentProduct(res);
    return beautiData;
  } catch (error) {
    console.error('Error getting of product:', error);
    throw error;
  }
}
