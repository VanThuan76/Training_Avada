import App from 'koa';
import * as errorService from '@functions/services/errorService';
import webhookRouter from '@functions/routes/webhook';

const api = new App();
api.proxy = true;
const router = webhookRouter(true);
api.use(router.allowedMethods());
api.use(router.routes());
api.on('error', errorService.handleError);
export default api;
