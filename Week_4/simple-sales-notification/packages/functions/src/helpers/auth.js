/**
 * Get current shop id from Koa context
 * Shop ID was set from authentication step in Shopify login
 *
 * @param {object} ctx
 * @return {string}
 */
export function getCurrentShop(ctx) {
  return getCurrentUser(ctx).shopID;
}

/**
 * Get current user from Koa context
 *
 * @param ctx
 * @returns {IUserContext}
 */
export function getCurrentUser(ctx) {
  return ctx.state.user;
}

/**
 * Get current shop domain
 *
 * @param ctx
 * @returns {string}
 */
export function getCurrentShopDomain(ctx) {
  return ctx.state.shopify.shop;
}

/**
 * Initialize Shopify
 */
export function initShopify(ctx) {
  const options = {
    shopifyDomain: ctx.state.shopify.shop,
    accessToken: ctx.state.shopify.accessToken
  };
  return options;
}
