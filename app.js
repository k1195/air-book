const express = require("express")
const app = express()
const PORT = 5000
var cors = require('cors')


require('./utility/connect_mongoose')
require('./models/booking')


app.use(express.json())
app.use(cors({credentials:true,origin:true}))
app.use(require('./routes/boarding'))
app.use(require('./routes/booking'))


app.listen(PORT,()=>{
    console.log("server is running on" , PORT)
})
