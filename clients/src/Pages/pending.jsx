import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './pending.css'; // Import the CSS file

const Pending = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("Pending");
   // fetchTasks is the function used to fetch the Task which are Pending
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todolist/pendingtask');
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
   // This function navigate us to Add Task page
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/addTask');
    };
   // on click on the start button  This function update the status of the task on data base to In Progress.
    const handleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5000/todolist/updatestatus/${id}`, { status: "In Progress" });
            fetchTasks(); 
            navigate('/progress');
        } catch (error) {
            console.log(error);
        }
    };
   // useEffect is used to fetch the task every time it render
    useEffect(() => {
        fetchTasks();
    }, []); 

    return (
        <div className="container">
            <h1>Pending Tasks</h1>
            <div className="row">
                {tasks.map(task => (
                    <div key={task._id} className="col-12">
                        <div className="card mb-4 c1">
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleStatus(task._id)}
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="form-buttons">
                <button className="btn btn-custom btn-create" onClick={handleSubmit}>
                    <i className="fa-solid fa-plus"></i> Create Task
                </button>
                <button className="btn btn-custom btn-progress" onClick={() => navigate('/progress')}>
                    In Progress
                </button>
                <button className="btn btn-custom btn-complete" onClick={() => navigate('/complete')}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default Pending;
