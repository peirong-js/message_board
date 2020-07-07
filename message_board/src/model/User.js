//User model

const mongoose = require('../db/db')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,  //必需
        unique:true     //唯一不重复
    },
    password:String,
    age:Number,
    city:String,
    gender:{
        type:Number,
        default:0  //0保密 1男 2女
    }
},{
    timestamps:true //时间戳
})

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel