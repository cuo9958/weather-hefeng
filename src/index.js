import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';
import routers from './router.js';

dotenv.config();

const app = new Koa();

app.use(
    koaBody({
        multipart: true,
        formLimit: '20mb',
    })
);

//加载路由
app.use(routers.routes()).use(routers.allowedMethods());

const port = process.env.PORT || '8082';

app.listen(port, function () {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
