import { LRUCache } from 'lru-cache';
import { GetGeoApi, GetWeatherNowApi, GetWeather24HApi } from './hefeng.js';

// 30分钟的实时天气
const WeatherNowCache = new LRUCache({
    // how long to live in ms
    ttl: 1000 * 60 * 30,
});

// 获取经纬度对应的城市，没有换成，限制请求次数
export async function GetGeoModel(location) {
    const data = await GetGeoApi(location);
    const list = data.location;
    if (!list || list.legnth === 0) {
        console.log(data);
        throw new Error('没有找到合适的城市');
    }
    const model = {
        name: list[0].name, //地区/城市名称
        id: list[0].id, //地区/城市ID
        adm2: list[0].adm2, //地区/城市的上级行政区划名称
        adm1: list[0].adm1, //地区/城市所属一级行政区域
        country: list[0].country, //地区/城市所属国家名称
        tz: list[0].tz, //地区/城市所在时区
        utcOffset: list[0].utcOffset, //地区/城市目前与UTC时间偏移的小时数
        type: list[0].type, //地区/城市的属性
        rank: list[0].rank, //地区评分
        fxLink: list[0].fxLink, //该地区的天气预报网页链接，便于嵌入你的网站或应用
    };
    return model;
}

// 获取城市对应的天气，换成30分钟
export async function GetWeatherCityModel(city) {
    if (WeatherNowCache.has(city)) return WeatherNowCache.get(city);
    const data = await GetWeatherNowApi(city);
    //         obsTime: '2024-05-22T15:25+08:00',
    //         temp: '30',
    //         feelsLike: '29',
    //         icon: '100',
    //         text: '晴',
    //         wind360: '208',
    //         windDir: '西南风',
    //         windScale: '2',
    //         windSpeed: '9',
    //         humidity: '50',
    //         precip: '0.0',
    //         pressure: '1003',
    //         vis: '7',
    //         cloud: '91',
    //         dew: '18',
    const model = {
        updateTime: data.updateTime,
        fxLink: data.fxLink,
        obsTime: data.now.obsTime, //数据观测时间
        temp: data.now.temp, //温度
        feelsLike: data.now.feelsLike, //体感温度
        icon: data.now.icon, //天气图标,https://icons.qweather.com/
        text: data.now.text, //天气状况的文字描述，包括阴晴雨雪等天气状态的描述
        wind360: data.now.wind360, //风向360角度
        windDir: data.now.windDir, //风向
        windScale: data.now.windScale, //风力等级,https://dev.qweather.com/docs/resource/wind-info/#wind-scale
        windSpeed: data.now.windSpeed, //风速，公里/小时
        humidity: data.now.humidity, // 相对湿度，百分比数值
        precip: data.now.precip, //当前小时累计降水量，默认单位：毫米
        pressure: data.now.pressure, //大气压强，默认单位：百帕
        vis: data.now.vis, //能见度，默认单位：公里
        cloud: data.now.cloud, //云量，百分比数值。可能为空
        dew: data.now.dew, //露点温度。可能为空
    };
    WeatherNowCache.set(city, model);
    return model;
}

// 50分钟的小时天气
const WeatherHourCache = new LRUCache({
    // how long to live in ms
    ttl: 1000 * 60 * 50,
});

export async function GetWeather24HModel(city) {
    if (WeatherHourCache.has(city)) return WeatherHourCache.get(city);
    const data = await GetWeather24HApi(city);
    const model = data.hourly;
    WeatherHourCache.set(city, model);
    return model;
}
