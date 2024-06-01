import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './pending.css'; // Import the CSS file

const Progress = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("Pending");
   // Fetch task in Progress
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todolist/inprogresstask');
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
   
    // update the status to complete

    const handleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5000/todolist/updatestatus/${id}`, { status: "Complete" });
            fetchTasks(); 
            navigate('/complete')
        } catch (error) {
            console.log(error);
        }
    };
    // update the time and date of completion of task.
    const handletime = async(id)=>{
        try {
            await axios.put(`http://localhost:5000/todolist/updatetime/${id}`);
           
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTasks();
    }, []); // Empty dependency array ensures it runs once after initial render

    return (
        <div className="container">
            <h1>In Progress Tasks</h1>
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
                                    onClick={() => {
                                        handletime(task._id);
                                        handleStatus(task._id); }
                                    }
                                >
                                    Complete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="form-buttons">
                
                <button className="btn btn-custom btn-progress" onClick={() => navigate('/')}>
                    Pending
                </button>
                <button className="btn btn-custom btn-complete" onClick={() => navigate('/complete')}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default Progress;
