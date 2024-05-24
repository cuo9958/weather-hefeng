import Router from '@koa/router';
import { BeError, BeSuccess } from '../service/response.js';
import { GetGeoModel, GetWeatherCityModel, GetWeather24HModel } from '../service/weather.js';

const router = new Router();

//获取当前位置城市
router.get('/get_city', async function (ctx) {
    const { location } = ctx.query;
    try {
        const data = await GetGeoModel(location || '116.45,39.90');
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});

//获取对应城市当前天气
router.get('/', async function (ctx) {
    const { city } = ctx.query;
    try {
        if (!city) throw new Error('不存在的城市');
        const data = await GetWeatherCityModel(city);
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});
//小时级天气预报
router.get('/hourly', async function (ctx) {
    const { city } = ctx.query;
    try {
        if (!city) throw new Error('不存在的城市');
        const data = await GetWeather24HModel(city);
        ctx.body = BeSuccess(data);
    } catch (error) {
        ctx.body = BeError(error.message);
    }
});

// 未来天气预报

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
