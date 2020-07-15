//留言 controller

const Message = require('../model/Message')

//获取留言列表
async function getList(username = ''){
    let whereOpt = {}
    if(username){
        whereOpt.username = username
    }
    const list = await Message.find(whereOpt).sort({ _id:-1 })
    return list
}

//创建留言
async function create(content, username) {
    const newMessage = await Message.create({
        content,
        username
    })
    return newMessage
}

//删除留言
async function del(_id,username){
    await Message.remove({
        _id,
        username  //只删除自己的留言
    })
}

//更新留言
async function update(_id,username,content){
    const newData = await Message.findOneAndUpdate(
        {_id,username},  //只能更新自己的留言
        {content},
        {new:true}  //返回更新后的最新留言
    )
    return newData

}

module.exports = {
    create,
    getList,
    del,
    update
}