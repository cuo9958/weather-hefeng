import axios from 'axios';

async function baseFetch(api_url, params = {}) {
    const WEATHER_KEY = process.env.WEATHER_KEY || '';

    if (!WEATHER_KEY) throw new Error('没有合法的KEY');
    params.key = WEATHER_KEY;
    console.log(params);
    const res = await axios({
        method: 'GET',
        url: api_url,
        params,
    });
    const data = res.data;
    console.log(data);
    if (data.code !== '200') throw new Error('接口错误');
    return data;
}

// 获取当前天气
export async function GetWeatherNow(location, lang = 'zh') {
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
    const data = await baseFetch('https://devapi.qweather.com/v7/weather/now', { location, lang });

    return data;
}

export async function GetGeoApi(location) {
    // var res = {
    //     code: '200',
    //     location: [
    //         {
    //             name: '朝阳',
    //             id: '101010300',
    //             lat: '39.92149',
    //             lon: '116.48641',
    //             adm2: '北京',
    //             adm1: '北京市',
    //             country: '中国',
    //             tz: 'Asia/Shanghai',
    //             utcOffset: '+08:00',
    //             isDst: '0',
    //             type: 'city',
    //             rank: '15',
    //             fxLink: 'https://www.qweather.com/weather/chaoyang-101010300.html',
    //         },
    //     ],
    //     refer: {
    //         sources: ['QWeather'],
    //         license: ['QWeather Developers License'],
    //     },
    // };
    const data = await baseFetch('https://geoapi.qweather.com/v2/city/lookup', { location });

    return data;
}
