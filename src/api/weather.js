import Router from '@koa/router';
import { BeError, BeSuccess } from '../service/response.js';
import { GetWeatherNow, GetGeoApi } from '../service/hefeng.js';

const router = new Router();

//获取当前位置城市
router.get('/', async function (ctx) {
    try {
        const data = await GetGeoApi('116.45,39.90');
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});

//获取对应城市当前天气
// 未来天气预报
//小时级天气预报
//高精度格点天气
//灾害预警
//天气指数
//空气质量
//历史天气
//台风预报
//海洋预报
//太阳辐射
//天文预报

export default router.routes();
