import {
  selectAllNotifiaction,
  selectNotificationByDomain
} from '@functions/repositories/notificationRepository';

/**
 * Get current setting of a shop
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export async function getAllNotification(ctx) {
  const noties = await selectAllNotifiaction(ctx.query);
  ctx.body = {
    data: noties,
    success: true
  };
}

export const getAllNotificationByShopify = async ctx => {
  try {
    const {shopifyDomain} = ctx.query;
    const result = await selectNotificationByDomain(shopifyDomain);
    if (result) {
      const {notifications, settings} = result;
      ctx.body = {
        success: true,
        notifications: notifications,
        settings: settings
      };
    } else {
      ctx.body = {
        success: false,
        data: [],
        error: 'No notifications found for the specified shopify domain'
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
};
