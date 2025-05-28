import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../features/Layouts/Navbar.jsx";      
import Sidebar from "../features/Layouts/Sidebar.jsx";    
import Dashbord from '../features/Employee/Dashbord/Dashbord';
import Job_History from '../features/Employee/Job_History/Job_History.jsx';
import ProjectList from '../features/Employee/ProjectList/ProjectList.jsx';
import PickTask from '../features/Employee/PickTask/PickTask.jsx';

function Employee() {
      const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
      const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };
    
      const location = useLocation();
      const hideLayout =
        location.pathname === "/" || location.pathname.toLowerCase() === "/signup";
    
    return (
    <div className="Main-App">
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      <div className={`Main-App-container ${hideLayout ? "no-sidebar" : ""}`}>
        {!hideLayout && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="Main-App-Content">
            <Routes>
                <Route path="dashboard" element={<Dashbord />} />
                <Route path="/jobhistory" element={<Job_History />}/>
                <Route path="/projectList" element={<ProjectList/>}/>
                <Route path="/picktask" element={<PickTask/>}/>
           </Routes>
          </div>
      </div>
    </div>
    )
}

export default Employee
