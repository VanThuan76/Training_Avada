import axios from 'axios';
import { SHOPIFY_API_VERSION, SHOPIFY_MAX_RETRY } from '@functions/const/shopify';

/**
 *
 * @param graphqlQuery
 * @param shop
 * @param apiVersion
 * @param maxRetries
 * @returns {Promise<{data?: *, errors?: [], extensions?: {cost: {}}}>}
 */
export async function makeGraphQlApi(
  {graphqlQuery, ...shop},
  {apiVersion = SHOPIFY_API_VERSION, maxRetries = 5} = {}
) {
  const {shopName: shopifyDomain, accessToken} = shop;
  const url = `https://${shopifyDomain}/admin/api/${apiVersion}/graphql.json`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken
  };
  const handler = () => api(url, 'POST', {headers}, graphqlQuery);

  const {errors, ...resp} = await shopifyRetryGraphQL(handler, maxRetries);
  if (errors) {
    console.error(
      'graphql error',
      shopifyDomain,
      errors.map(x => x.message).join('. '),
      resp?.extensions?.cost
    );
    return {errors};
  }
  return resp;
}
/**
 * @param handler
 * @param {number} attempt
 * @return {Promise<*|undefined>}
 */
export async function shopifyRetryGraphQL(handler, attempt = 0) {
  try {
    return await handler();
  } catch (e) {
    const isRetryError = [502, 503, 520].includes(e.statusCode);
    if (!isRetryError || attempt >= SHOPIFY_MAX_RETRY) {
      throw new Error(e);
    }
    await delay((attempt + Math.random()) * 1000);
    return await shopifyRetryGraphQL(handler, ++attempt);
  }
}
const client = axios.create();
/**
 * @param url
 * @param method
 * @param options
 * @param params
 * @param resp
 * @return {Promise<any>}
 */
export async function api(url, method = 'GET', options = {}, params = {}, resp = 'data') {
  return client
    .request({
      ...options,
      headers: options.headers || {},
      method,
      url
    })
    .then(res => res[resp]);
}
