import Shopify from 'shopify-api-node';
import presentOrder from '@functions/presenters/orderPresenter';
import {initializeNotification} from '@functions/repositories/notificationRepository';
import {QUERY_ORDERS_INITIALIZE} from '@functions/const/shopify';

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
    const res = await shopify.graphql(QUERY_ORDERS_INITIALIZE)
    const beautiData = presentOrder(res);
    const notificationPromises = beautiData.map(order =>
      initializeNotification({ ...order, shopId: shopifyInfor.id, shopifyDomain: shopifyInfor.domain})
    );
    await Promise.all(notificationPromises);
  } catch (error) {
    console.error('Error getting list of orders:', error);
    throw error;
  }
}
