import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const API_URL =
      'http://127.0.0.1:5011/simple-sales-notfication-ea4f7/us-central1/clientApi/notifications';
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      API_URL + `?shopifyDomain=${shopifyDomain}`
    );

    return {notifications, settings};
  };
}
