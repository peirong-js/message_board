const router = require('koa-router')()
const { register } = require('../controller/user')

router.prefix('/users')
/* 
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
 */

 //注册
router.post('/register',async(ctx,next)=>{
  //获取注册信息
  const userInfo = ctx.request.body
  //提交注册
  try{
    const newUser = await register(userInfo)   //controller
    //成功
    ctx.body = {
      errno:0,
      data:newUser
    }
  }catch(ex){
    //失败
    console.log('注册失败',ex)
    ctx.body={
      errno:-1,
      message:'注册失败'
    }
  }
})

module.exports = router
