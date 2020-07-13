const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-generic-session')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

//服务端支持跨域
app.use(cors({
  //origin:'*', //允许所有域可跨域，但是credentials必须false
  origin:'http://localhost:8080', //支持前端哪个域可以跨域
  credentials:true //允许跨域时带cookie
}))

//配置session
app.keys = ['69*12-74*-/sadd4*12@$#'] //密钥 
app.use(session({
  cookie:{
    path:'/',  //cookie在跟目录有效
    httpOnly:true,  //cookie只允许服务端操作
    maxAge:24*60*60*1000 //cookie的过期时间 一天
  }
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
