const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')


mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected to db")
})
mongoose.connection.on('err',(err)=>{
    console.log("error connecting to db",err)
})

module.exports = mongoose