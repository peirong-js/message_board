//留言功能路由

const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { create,getList,del,update } = require('../controller/message')

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

//删除留言
router.post('/del',loginCheck,async(ctx,next)=>{
    //获取_id
    const {_id }= ctx.request.body
    //获取用户名
    const {username} = ctx.session.userInfo
    //删除
    try{
        await del(_id,username)
        ctx.body = {
            errno:0
        }
    }catch(ex){
        //失败
        console.error('删除失败',ex)
        ctx.body = {
            errno:-1,
            message:'删除失败'
        }
    }
})

//更新留言
router.post('/update',loginCheck,async (ctx,next)=>{
    //获取 id content
    const {_id,content} = ctx.request.body
    //获取用户名
    const {username} = ctx.session.userInfo
    //执行
    try{
        const newData = await update(_id,username,content)
        ctx.body = {
            errno:0,
            data:newData
        }
    }catch(ex){
        console.error('更新失败',ex)
        ctx.body = {
            errno:-1,
            message:'更新失败'
        }
    }
})

module.exports = router