import axios from 'axios';

async function baseFetch(api_url, params = {}) {
    const WEATHER_KEY = process.env.WEATHER_KEY || '';
    if (!WEATHER_KEY) throw new Error('没有合法的KEY');
    params.key = WEATHER_KEY;
    const res = await axios({
        method: 'GET',
        url: api_url,
        params,
    });
    const data = res.data;
    if (data.code !== '200') throw new Error('接口错误');
    return data;
}

// 获取当前天气
export async function GetWeatherNowApi(city, lang = 'zh') {
    // var res = {
    //     code: '200',
    //     updateTime: '2024-05-22T15:26+08:00',
    //     fxLink: 'https://www.qweather.com/weather/chaoyang-101010300.html',
    //     now: {
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
    //     },
    //     refer: {
    //         sources: ['QWeather'],
    //         license: ['CC BY-SA 4.0'],
    //     },
    // };
    const data = await baseFetch('https://devapi.qweather.com/v7/weather/now', { location: city, lang });
    if (data.code !== '200') {
        console.log(data);
        throw new Error('接口错误');
    }
    return data;
}

export async function GetGeoApi(location) {
    // var res = {
    //     code: '200',
    //     location: [
    //         {
    //             name: '朝阳',
    //             id: '101010300',
    //             lat: '39.92149', //地区/城市纬度
    //             lon: '116.48641', //地区/城市经度
    //             adm2: '北京',
    //             adm1: '北京市',
    //             country: '中国',
    //             tz: 'Asia/Shanghai',
    //             utcOffset: '+08:00',
    //             isDst: '0',//地区/城市是否当前处于夏令时。1 表示当前处于夏令时，0 表示当前不是夏令时。
    //             type: 'city',
    //             rank: '15',
    //             fxLink: 'https://www.qweather.com/weather/chaoyang-101010300.html',//该地区的天气预报网页链接，便于嵌入你的网站或应用
    //         },
    //     ],
    //     refer: {
    //         sources: ['QWeather'],
    //         license: ['QWeather Developers License'],
    //     },
    // };
    const data = await baseFetch('https://geoapi.qweather.com/v2/city/lookup', { location });

    if (data.code !== '200') {
        console.log(data);
        throw new Error('接口错误');
    }
    return data;
}

export async function GetWeather24HApi(city) {
    // var res = {
    //     code: '200',
    //     updateTime: '2021-02-16T13:35+08:00', //当前API的最近更新时间
    //     fxLink: 'http://hfx.link/2ax1',//当前数据的响应式页面，便于嵌入网站或应用
    //     hourly: [
    //         {
    //             fxTime: '2021-02-16T15:00+08:00', //预报时间
    //             temp: '2', //温度，默认单位：摄氏度
    //             icon: '100', //天气状况的图标代码，另请参考天气图标项目
    //             text: '晴', //天气状况的文字描述，包括阴晴雨雪等天气状态的描述
    //             wind360: '335', //风向360角度
    //             windDir: '西北风', // 风向
    //             windScale: '3-4', //风力等级
    //             windSpeed: '20', //风速，公里/小时
    //             humidity: '11',// 相对湿度，百分比数值
    //             pop: '0', //逐小时预报降水概率，百分比数值，可能为空
    //             precip: '0.0',//当前小时累计降水量，默认单位：毫米
    //             pressure: '1025',//大气压强，默认单位：百帕
    //             cloud: '0',//云量，百分比数值。可能为空
    //             dew: '-25',//露点温度。可能为空
    //         },
    //     ],
    //     refer: {
    //         sources: ['QWeather', 'NMC', 'ECMWF'],
    //         license: ['QWeather Developers License'],
    //     },
    // };
    const data = await baseFetch('https://devapi.qweather.com/v7/weather/24h', { location: city });
    if (data.code !== '200') {
        console.log(data);
        throw new Error('接口错误');
    }
    return data;
}
