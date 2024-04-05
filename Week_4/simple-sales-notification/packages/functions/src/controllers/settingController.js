import {
  selectAllSetting,
  updateSetting,
  insertSetting
} from '@functions/repositories/settingRepository';
import {getCurrentShop} from '@functions/helpers/auth';

/**
 * Get current setting of a shop
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export async function getSettingByShopId(ctx) {
  const shopId = getCurrentShop(ctx);
  const setting = await selectAllSetting(shopId);
  ctx.body = {
    data: setting,
    success: true
  };
}

/**
 * Create default setting of a shop
 *
 * @param {Object} body
 * @returns {Promise<void>}
 */
export async function initDefaultSetting(body) {
  const setting = await insertSetting(body);
  ctx.body = {
    data: setting,
    success: true
  };
}

/**
 * UpdateSetting current setting of a shop
 *
 * @param {Context|Object|*} ctx
 * @returns {Promise<void>}
 */
export function putSetting(ctx) {
  const shopId = getCurrentShop(ctx);
  const body = ctx.request.body;
  const setting = updateSetting(shopId, body);
  ctx.body = {
    data: setting,
    success: true
  };
}
