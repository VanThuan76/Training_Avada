import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';

export default function clientApiRouter() {
  const router = new Router();
  router.get('/notifications', notificationController.getAllNotificationByShopify);
  return router;l
}
