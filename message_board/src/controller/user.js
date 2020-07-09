//user controller

const User = require('../model/User')

//注册
async function register(userInfo = {}){
    //插入数据库
    const newUser = await User.create(userInfo)
    //返回注册用户信息
    return newUser
}

module.exports = {
    register
}