//Loads .env file contents into proccess.env by defaults

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
const pfServer = express()
require('./DB/connection')

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads', express.static('./uploads'))

const PORT = 3001

pfServer.listen(PORT ,()=>{
    console.log(`Project fair sever started at : ${PORT}`);
})
pfServer.get('/' , (req,res)=>{
    res.status(200).send("<h1 style=color:red; >Project fair Server Started!!!!</h1>")
})