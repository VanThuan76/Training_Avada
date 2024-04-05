import App from 'koa';
import cors from 'koa-cors'
import * as errorService from '@functions/services/errorService';
import clientApiRouter from '@functions/routes/clientApi';

const api = new App();
api.proxy = true;
const router = clientApiRouter(true);
api.use(cors());
api.use(router.allowedMethods());
api.use(router.routes());
api.on('error', errorService.handleError);
export default api;
