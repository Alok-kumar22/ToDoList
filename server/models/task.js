import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'Pending' },
    formattedTimestamp: { type: String,default:"ABC" } // New field to store formatted timestamp
});

 export default mongoose.model('tasks',taskSchema);
