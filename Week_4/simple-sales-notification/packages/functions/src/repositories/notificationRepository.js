import {Firestore, Timestamp} from '@google-cloud/firestore';
import {parseQueryField} from '@functions/helpers/utils/parseQueryField';
import moment from 'moment';

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
 * @typedef {Object} Notification
 * @param shopify
 * @returns {Promise<{Notification}>}
 */
export async function selectItemNotifiaction(shopify) {
  try {
    const {shopName, _} = shopify;
    const query = notiRef.where('shopDomain', '==', shopName).limit(1);
    const notiSnapshot = await query.get();
    if (notiSnapshot.empty) {
      return null;
    }
    const notification = notiSnapshot.docs[0].data();
    return notification;
  } catch (error) {
    console.error('Error fetching notification:', error);
    return null;
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
      const timestamp = moment(doc.data().timestamp.toDate()).from(moment());
      return {
        id: doc.id,
        ...doc.data(),
        timestamp
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
 * @typedef {Object} Notification
 * @param {Notification} notiData - Data for the new notification
 * @returns {Promise<string>} - Promise resolving to the newly generated document ID or null on error
 */
export async function addNotification(notiData) {
  try {
    const newId = notiData.id || notiRef.doc().id;
    const data = {
      ...notiData,
      createdAt: notiData.createdAt || firestore.FieldValue.serverTimestamp()
    };
    await notiRef.doc(newId).set(data);
    return newId;
  } catch (error) {
    console.error('Error adding notification:', error);
    return null;
  }
}

/**
 * Trigger Orders Shopify to Notification Collections
 * @param {{shopId: string, data: Notification[]}} ctx - Context object containing shopId and data.
 * @return {Promise<any>} Return value of the function.
 */

export async function initializeNotification(data) {
  try {
    const notiQuery = await notiRef
      .where('orderId', '==', data.orderId)
      .where('shopId', '==', data.shopId)
      .limit(1)
      .get();
    if (notiQuery.size > 0) {
      return null;
    }
    const newNotiDocRef = await notiRef.add({
      ...data,
      shopId: data.shopId,
      timestamp: Timestamp.fromDate(new Date(data.createdAt))
    });
    return newNotiDocRef;
  } catch (error) {
    console.error('Error syncing notification:', error);
    return false;
  }
}
