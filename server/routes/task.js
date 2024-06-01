import express from 'express';
import { AddTask, CompletedTask, InprogressTask, compTime, pendingTask, updateTask } from '../controller/task.js';


const router = express.Router();


router.post('/addtask',AddTask);
router.put('/updatestatus/:id',updateTask);
router.put('/updatetime/:id',compTime);
router.get('/pendingtask',pendingTask);
router.get('/inprogresstask',InprogressTask);
router.get('/comptask',CompletedTask);

export default router;