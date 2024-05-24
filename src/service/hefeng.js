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

export async function GetWeather7DayApi(city) {
    // var res = {
    //     code: '200',
    //     updateTime: '2021-11-15T16:35+08:00',
    //     fxLink: 'http://hfx.link/2ax1',
    //     daily: [
    //         {
    //             fxDate: '2021-11-15',//预报日期
    //             sunrise: '06:58',// 日出时间，在高纬度地区可能为空
    //             sunset: '16:59',// 日落时间，在高纬度地区可能为空
    //             moonrise: '15:16',//当天月升时间，可能为空
    //             moonset: '03:40',//当天月落时间，可能为空
    //             moonPhase: '盈凸月',//月相名称
    //             moonPhaseIcon: '803',//月相图标代码，另请参考天气图标项目 https://dev.qweather.com/docs/resource/icons/
    //             tempMax: '12',//预报当天最高温度
    //             tempMin: '-1',//预报当天最低温度
    //             iconDay: '101',//预报白天天气状况的图标代码，另请参考天气图标项目
    //             textDay: '多云',// 预报白天天气状况文字描述，包括阴晴雨雪等天气状态的描述
    //             iconNight: '150',//预报夜间天气状况的图标代码，另请参考天气图标项目
    //             textNight: '晴',//预报晚间天气状况文字描述，包括阴晴雨雪等天气状态的描述
    //             wind360Day: '45',//预报白天风向360角度
    //             windDirDay: '东北风',//预报白天风向
    //             windScaleDay: '1-2',// 预报白天风力等级
    //             windSpeedDay: '3',//预报白天风速，公里/小时
    //             wind360Night: '0',//预报夜间风向360角度
    //             windDirNight: '北风',//预报夜间当天风向
    //             windScaleNight: '1-2',//预报夜间风力等级
    //             windSpeedNight: '3',//预报夜间风速，公里/小时
    //             humidity: '65',//相对湿度，百分比数值
    //             precip: '0.0',//预报当天总降水量，默认单位：毫米
    //             pressure: '1020',//大气压强，默认单位：百帕
    //             vis: '25',//能见度，默认单位：公里
    //             cloud: '4',//云量，百分比数值。可能为空
    //             uvIndex: '3',//紫外线强度指数
    //         },
    //     ],
    //     refer: {
    //         sources: ['QWeather', 'NMC', 'ECMWF'],
    //         license: ['QWeather Developers License'],
    //     },
    // };
    const data = await baseFetch('https://api.qweather.com/v7/weather/7d', { location: city });
    if (data.code !== '200') {
        console.log(data);
        throw new Error('接口错误');
    }
    return data;
}

export async function GetWeatherIndicesApi(city) {
    // var res = {
    //     code: '200',
    //     updateTime: '2021-12-16T18:35+08:00',
    //     fxLink: 'http://hfx.link/2ax2',
    //     daily: [
    //         {
    //             date: '2021-12-16',//预报日期
    //             type: '1',//生活指数类型ID
    //             name: '运动指数',//生活指数类型的名称
    //             level: '3',//生活指数预报等级
    //             category: '较不宜',//生活指数预报级别名称
    //             text: '天气较好，但考虑天气寒冷，风力较强，推荐您进行室内运动，若户外运动请注意保暖并做好准备活动。',//生活指数预报的详细描述，可能为空
    //         },
    //         {
    //             date: '2021-12-16',
    //             type: '2',
    //             name: '洗车指数',
    //             level: '3',
    //             category: '较不宜',
    //             text: '较不宜洗车，未来一天无雨，风力较大，如果执意擦洗汽车，要做好蒙上污垢的心理准备。',
    //         },
    //     ],
    //     refer: {
    //         sources: ['QWeather'],
    //         license: ['QWeather Developers License'],
    //     },
    // };
    const data = await baseFetch('https://api.qweather.com/v7/indices/1d', { location: city });
    if (data.code !== '200') {
        console.log(data);
        throw new Error('接口错误');
    }
    return data;
}

export async function GetWeatherAirApi() {
    // var res = {
    //     code: '200',
    //     updateTime: '2021-02-16T14:42+08:00',
    //     fxLink: 'http://hfx.link/2ax4',
    //     now: {
    //         pubTime: '2021-02-16T14:00+08:00',//空气质量数据发布时间
    //         aqi: '28',//空气质量指数
    //         level: '1',//空气质量指数等级
    //         category: '优',//空气质量指数级别
    //         primary: 'NA',//空气质量的主要污染物，空气质量为优时，返回值为NA
    //         pm10: '28',//PM10
    //         pm2p5: '5',//PM2.5
    //         no2: '3',//二氧化氮
    //         so2: '2',// 二氧化硫
    //         co: '0.2',//一氧化碳
    //         o3: '76',//臭氧
    //     },
    //     station: [
    //         {
    //             pubTime: '2021-02-16T14:00+08:00',
    //             name: '密云镇',//监测站名称
    //             id: 'CNA3697',//监测站ID
    //             aqi: '20',
    //             level: '1',
    //             category: '优',
    //             primary: 'NA',
    //             pm10: '4',
    //             pm2p5: '4',
    //             no2: '4',
    //             so2: '3',
    //             co: '0.2',
    //             o3: '63',
    //         },
    //     ],
    //     refer: {
    //         sources: ['cnemc'],
    //         license: ['QWeather Developers License'],
    //     },
    // };
    const data = await baseFetch('https://api.qweather.com/v7/air/now', { location: city });
    if (data.code !== '200') {
        console.log(data);
        throw new Error('接口错误');
    }
    return data;
}
