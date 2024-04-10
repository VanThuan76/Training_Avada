import {
  selectAllSetting,
  updateSetting,
  insertSetting
} from '@functions/repositories/settingRepository';
import {getCurrentShop} from '@functions/helpers/auth';
import {DEFAULT_SETTINGS} from '@functions/const/other';

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
 * @param {Object} shopifyInfor
 * @returns {Promise<void>}
 */
export async function initDefaultSetting(shopifyInfor) {
  const bodyDefaultSettings = {
    ...DEFAULT_SETTINGS,
    shopId: shopifyInfor.id,
    shopifyDomain: shopifyInfor.shopName
  };
  const setting = await insertSetting(bodyDefaultSettings);
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
