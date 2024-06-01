
import task from "../models/task.js";

export const AddTask= async(req,res)=>{
    try{
        const {title,description} = req.body;   // take data come from front end
         
        const newtask = await new task({title,description}).save(); // save the task in mongodb

       return res.status(200).json(newtask);
    }catch(error){
        console.log(error);
    }
}

export const updateTask = async(req, res) => {
    const { id: _id } = req.params;
    const { status } = req.body;
    try {
        const updttask = await task.findByIdAndUpdate(_id, { $set: { status } }, { new: true });  // update the status of task
        if (!updttask) {
            return res.status(404).json("NO Task Found");
        }
        res.json(updttask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const pendingTask = async(req,res)=>{
    try{
        const pendTask = await task.find({status:'Pending'});   // get all the pending tasks
        if(!pendTask){
            return res.status(404).json("No Task is Pending");
        }
        return res.status(200).json(pendTask);
    }catch(error){
        console.log(error);
    }
}

export const InprogressTask = async(req,res)=>{
    try{
        const inpTask = await task.find({status:'In Progress'}); // get all the in progress tasks
        if(!inpTask){
            return res.status(404).json("No Task is Pending");
        }
        return res.status(200).json(inpTask);
    }catch(error){
        console.log(error);
    }
}

// this code help in making the date in the required fromat
export const compTime = async (req, res) => {
    const { id: _id } = req.params;
    const currentDate = new Date();
    const completedAt = new Date();
    try {

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        const formattedDate = completedAt.toLocaleString('en-GB', options);

        await task.findByIdAndUpdate(_id, { $set: { formattedTimestamp: formattedDate } });

        return res.status(200).json({ timestamp: formattedDate });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
// get all the tasks that are completed
export const CompletedTask = async(req,res)=>{
    try{
        const compTask = await task.find({status:'Complete'});
        if(!compTask){
            return res.status(404).json("No Task is Pending");
        }
        return res.status(200).json(compTask);
    }catch(error){
        console.log(error);
    }
}