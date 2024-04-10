import Router from 'koa-router';
import * as webhookController from '@functions/controllers/webhook/webhookController';

export default function webhookRouter() {
  const router = new Router({prefix: '/webhook'});
  router.use();
  //Sau khi đăng ký webhook -> Shopify tạo order mới (trả về thông tin dưới body) (thỉnh thoảng gửi 2 lần / check duplicate) (1s / false: 10s) (Lưu ý)
  router.post('/order/new', webhookController.listNewOrder);
  return router;
}
