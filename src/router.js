import Router from "@koa/router";

import weather from "./api/weather.js";

const router = new Router();

//对外提供的接口
router.use("/api_weather", weather);

export default router;
