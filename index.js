const express=require('express')
const mongoose=require('mongoose')

app=express()

app.use(express.json())

const PORT=3000

//DB Connection
//first url with connect
mongoose.connect('mongodb://admin:admin@mongodb:27017/todo?authSource=admin',{
    useNewUrlParser:true,
    useUnifiedTobology:true
})

const db=mongoose.connection

db.on('error',()=>{

    console.log("Fail connection!")
}
)

db.once('open',()=>{
    console.log("")
})












app.listen(PORT,()=>{
    console.log("Server Started :)");
})