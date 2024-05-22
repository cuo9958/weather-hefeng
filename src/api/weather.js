import Router from '@koa/router';
import { BeError, BeSuccess } from '../service/response.js';
import { GetWeatherNow, GetGeoApi } from '../service/hefeng.js';

const router = new Router();

//配置列表
router.get('/', async function (ctx) {
    try {
        const data = await GetGeoApi('116.45,39.90');
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});

export default router.routes();
