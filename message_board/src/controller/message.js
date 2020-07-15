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

module.exports = {
    create,
    getList
}