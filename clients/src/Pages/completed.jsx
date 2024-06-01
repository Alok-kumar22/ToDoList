import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './pending.css'; // Import the CSS file

const Completed = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("Pending");
  // fetch all the completed tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todolist/comptask');
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // update status to complete

    const handleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5000/todolist/updatestatus/${id}`, { status: "Complete" });
            fetchTasks(); // Refresh the tasks list after updating the status
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); // Empty dependency array ensures it runs once after initial render

    return (
        <div className="container">
            <h1>Completed Tasks</h1>
            <div className="row">
                {tasks.map(task => (
                    <div key={task._id} className="col-12">
                        <div className="card mb-4 c1">
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <p className="timestamp">{task.formattedTimestamp}</p>
                                <p className="b1"
                                >
                                    <i class="fa-solid fa-check"></i> Done
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="form-buttons">
                
                <button className="btn btn-custom btn-progress" onClick={() => navigate('/')}>
                    Pending
                </button>
                <button className="btn btn-custom btn-complete" onClick={() => navigate('/progress')}>
                    In Progress
                </button>
            </div>
        </div>
    );
};

export default Completed;
