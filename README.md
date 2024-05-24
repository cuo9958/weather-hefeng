# 基于和风天气的天气接口

需要在服务器上配置环境变量：WEATHER_KEY

https://dev.qweather.com/docs/api/air/air-now/
https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/location-guidelines-0000001820880261#ZH-CN_TOPIC_0000001811156662__%E5%BC%80%E5%8F%91%E6%AD%A5%E9%AA%A4

## 设计方案

1. API 实现官方的所有 API 接口，host 使用免费版本。
2. 服务器实现简单缓存，所有内容全部从 API 获取。实时数据仅支持通过城市获取，经纬度需要转城市，并且客户端限制一天最多获取 2 次。

## 缓存方案

| 数据类型         | 缓存时间                        |
| ---------------- | ------------------------------- |
| 实时天气         | 30 分钟                         |
| 逐小时天气预报   | 50 分钟                         |
| 逐天天气预报     | 4 小时                          |
| 天气预警         | 20 分钟                         |
| 天气指数         | 10 小时                         |
| 分钟降水         | 10 分钟                         |
| 实时空气质量     | 50 分钟                         |
| 空气质量逐天预报 | 10 小时                         |
| 潮汐和潮流       | 10 小时                         |
| 台风             | 活跃期 20 分钟,非活跃期 60 分钟 |
| 太阳辐照         | 6 小时                          |
| GeoAPI           | 6 个月                          |

## 接口

### /api_weather?city

获取城市对应的天气

### /api_weather/get_city?location

根据经纬度获取城市

### /api_weather/hourly?city

根据城市获取最近 24 小时的天气

### /api_weather/dayly?city

根据城市获取未来 7 天的天气

### /api_weather/indices?city

根据城市获取天气指数

### /api_weather/air?city

根据城市获取实时空气质量
