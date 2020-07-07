//Message model
const mongoose = require('../db/db')

const MessageSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    username:String
},{
    timestramp:true
})

const MessageModel = mongoose.model('message',MessageSchema)

module.exports=MessageModel