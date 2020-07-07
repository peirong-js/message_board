//连接数据库
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'message'

mongoose.set('useCreateIndex',true)
mongoose.set('useFindAndModify',false)

//开始连接
mongoose.connect(`${url}/${dbName}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//获取连接对象
const conn = mongoose.connection

conn.on('error',err=>{
    console.error('mongodb连接出错',err)
})

module.exports = mongoose