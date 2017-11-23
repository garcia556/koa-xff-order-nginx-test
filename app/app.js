'use strict';

const Koa = require("koa");
const app = new Koa();

app.proxy = true;
app.use(ctx => {
  let res = {};
  res.ip  = ctx.ip;
  res.ips = ctx.ips;
  res.headers_xff_raw = ctx.headers["x-forwarded-for"];

  ctx.body = JSON.stringify(res, null, "\t");
});

app.listen(80);

