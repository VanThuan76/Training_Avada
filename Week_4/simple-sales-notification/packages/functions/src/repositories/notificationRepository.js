import moment from 'moment';
import {Firestore, Timestamp} from '@google-cloud/firestore';
import {getProductById} from '@functions/services/shopifyApiService';
import {parseQueryField} from '@functions/helpers/utils/parseQueryField';
import presentOrder from '@functions/presenters/orderPresenter';

const firestore = new Firestore();
/** @type CollectionReference */
const notiRef = firestore.collection('notifications');
const settingRef = firestore.collection('settings');

/**
 * @typedef {Object} Notification
 * @param {object} query
 * @returns {Promise<{Notification[]}>}
 */
export async function selectAllNotifiaction(query) {
  try {
    let notiQuery = notiRef;
    if (query.sort) {
      const [field, direction] = parseQueryField(query.sort);
      notiQuery = notiQuery.orderBy(field, direction);
    }
    if (query.limit) {
      notiQuery = notiQuery.limit(parseInt(query.limit));
    }
    const notiesSnapshot = await notiQuery.get();
    const noties = notiesSnapshot.docs.map(doc => {
      const docItem = doc.data();
      const id = doc.id;
      const timestamp = moment(docItem.timestamp.toDate()).from(moment());
      return {id, ...docItem, timestamp};
    });
    return noties;
  } catch (error) {
    console.error('Error updating noti:', error);
    return false;
  }
}

/**
 * @param shopifyDomain
 * @returns {Promise<{any}>}
 */
export async function selectNotificationByDomain(shopifyDomain) {
  try {
    const [queryNotifications, querySettings] = await Promise.all([
      notiRef
        .where('shopifyDomain', '==', shopifyDomain)
        .limit(5)
        .get(),
      settingRef
        .where('shopifyDomain', '==', shopifyDomain)
        .limit(1)
        .get()
    ]);
    const docSettings = querySettings.docs[0];
    const settings = {
      id: docSettings.id,
      ...docSettings.data()
    };
    const notifications = queryNotifications.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return {
      notifications,
      settings
    };
  } catch (error) {
    console.error('Error fetching notification:', error);
    return null;
  }
}
/**
 * @param {object} shopifyInfor
 * @param {object} data
 * @returns {Promise<{Notification}>}
 */
export async function selectItemNotification(shopifyInfor, data) {
  try {
    const productInfor = await getProductById(
      shopifyInfor,
      `gid://shopify/Product/${data.line_items[0].product_id}`
    );
    const notifi = await presentOrder({...data, ...productInfor}, 'webhook');
    return notifi;
  } catch (error) {
    console.error('Error updating noti:', error);
    return false;
  }
}
/**
 * @typedef {Object} Notification
 * @param {Notification} notiData - Data for the new notification
 * @param {'api'|| 'webhook'} type
 * @returns {Promise<string>} - Promise resolving to the newly generated document ID or null on error
 */
export async function addNotification(shopifyInfor, notiData, type = 'api') {
  try {
    let orderId;
    if (type === 'api' && notiData.orderId) {
      orderId = notiData.orderId.split('/').pop();
    } else if (type === 'webhook' && notiData.orderId) {
      orderId = notiData.orderId;
    } else {
      console.error('Invalid orderId:', notiData.orderId);
      return null;
    }
    const notiQuery = await notiRef
      .where('shopifyId', '==', shopifyInfor.shopId)
      .where('shopifyDomain', '==', shopifyInfor.shopName)
      .where('orderId', '==', orderId)
      .limit(1)
      .get();

      if (!notiQuery.empty) {
      return false;
    } else {
      const data = {
        ...notiData,
        shopifyId: shopifyInfor.shopId,
        shopifyDomain: shopifyInfor.shopName,
        timestamp: Timestamp.fromDate(new Date(notiData.createdAt || moment().toISOString()))
      };
      await notiRef.add(data);
      return true;
    }
  } catch (error) {
    console.error('Error adding notification:', error);
    return null;
  }
}

