const express=require('express') 
const mongoose=require('mongoose')
const router = require('./routes/TaskRoute')
const expressWinston=require('express-winston')
const { translateAliases } = require('./models/task')
const { transports, format } = require('winston')
const app=express() 


//Middleware Function
app.use(expressWinston.logger({
    transports:[
        new transports.Console()
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    )
     
}))

const PORT=8000
//Middleware
app.use(express.json())
//DB Connection
//first url with connect
mongoose.connect('mongodb://admin:admin@localhost:27017/todo?authSource=admin')

const db=mongoose.connection;

db.on('error',()=>{

    console.log("Fail connection!")
}
)

db.once('open',()=>{
    console.log("connected to DB Successful")
})


app.use(router)





app.listen(PORT,()=>{
    console.log("Server Started :)");
})
//netstat -ano | findstr :9323
//taskkill /PID 27924 /F