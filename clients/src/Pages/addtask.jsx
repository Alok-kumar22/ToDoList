import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddTask = () => {
    const [title, settitle] = useState("");
    const [description, setdes] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/todolist/addTask', { title, description });
            if (response.status === 200) {
                navigate('/'); // navigate to another route after successful submission
            }
            else{
                console.log(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container c1">
         
        <form onSubmit={handleSubmit}>
        <h1> Add Task</h1>
          <div class="form-group  f1">
             <label for="exampleInputEmail1">Title</label>
             <input type="title" value={title} name='title' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" onChange={(e)=>settitle(e.target.value)}/>
            
          </div>
          <br></br>
          <br></br>
         <div class="form-group  f1">
             <label for="exampleInputPassword1">Description</label>
             <input type="area" name='description' value={description} class="form-control" id="exampleInputPassword1" placeholder="Description" onChange={(e)=>setdes(e.target.value)} required/>
         </div>
         <br></br>
          <br></br>
         
         
     <button type="submit" class="btn btn-warning">Submit</button>
         </form>
   </div>
    );
};

export default AddTask;
