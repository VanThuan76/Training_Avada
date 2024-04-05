import {selectAllNotifiaction, selectNotificationByDomain} from '@functions/repositories/notificationRepository';

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
    const {notifications, settings} = await selectNotificationByDomain(shopifyDomain);
    ctx.body = {
      success: true,
      notifications: notifications,
      settings: settings
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
};
