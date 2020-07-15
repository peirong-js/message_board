//留言功能路由

const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { create,getList } = require('../controller/message')

router.prefix('/comment')

//获取留言
router.get('/list',loginCheck,async(ctx,next)=>{
    ///获取filterType： 1-全部  2-自己
    let {filterType} = ctx.query
    filterType = parseInt(filterType) || 1
    //获取用户名
    let username = ''
    if(filterType === 2){
        username = ctx.session.userInfo.username
    }
    //获取留言列表
    const list = await getList(username)
    ctx.body = {
        errno:0,
        data:list
    }
})

//创建留言
router.post('/create', loginCheck ,async(ctx,next)=>{
    //获取留言信息
    const {content} = ctx.request.body
    const {username} = ctx.session.userInfo
    try{
        //提交留言
        const newMessage = await create(content,username)

        ctx.body = {
            errno:0,
            data:newMessage
        }
    }catch(ex){
        console.error('创建留言失败',ex)
        ctx.body={
            errno:-1,
            message:'创建留言失败'
        }
    }
})

module.exports = router