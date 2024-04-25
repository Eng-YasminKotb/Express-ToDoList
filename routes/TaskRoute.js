const express=require('express') 
const router=express.Router();
const Task=require("../models/task")

router.get('/tasks',async (req,res)=>{
    try{
         const tasks=await Task.find();
         res.status(200).json(tasks)
    }
    catch(err){
    res.status(500).json({error : err.message})
    }
})



router.post("/addTask",async(req,res)=>{
    try{
        const task=new Task(req.body)
        await task.save();
    
        res.status(200).json({message: "Task is added successfully!"})
    }
    catch(err){
    res.status(500).json({error : err.message})
    }
})


router.put("/updateTask/:id",async (req,res)=>{
    try{
        const {id}  =req.params;
        const dataToUpdate=req.body;
        // {new : true} return the task as an object after update
        const task=await Task.findByIdAndUpdate(id,dataToUpdate, {new : true})
        res.status(200).json({message: "Updated Successfully", task})

    }
    catch(err){
    res.status(500).json({error : err.message})
    }
})


router.delete("/deleteTask/:id",async (req,res)=>{
    try{
        const {id}  =req.params;
        await Task.findByIdAndDelete(id)
        res.status(200).json({message: "Deleted Successfully"})


    }
    catch(err){
    res.status(500).json({error : err.message})
    }
})

module.exports=router