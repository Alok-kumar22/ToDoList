
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from './Pages/addtask';
import Pending from './Pages/pending';
import Progress from './Pages/progress';
import Completed from './Pages/completed';

function App() {
  return (
    <Router>
      <Routes>
            <Route path='/' element={<Pending/>}  />
            <Route path='/addTask' element={<AddTask/>}  />
            <Route path='/progress' element={<Progress/>}  />
            <Route path='/complete' element={<Completed/>}  />
      </Routes>
    </Router>

  );
}

export default App;
