import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import Dashbord from "./components/AdminComponents/Dashbord/Dashbord";
import ClientManagement from "./components/AdminComponents/ClientManagement/ClientManagement";
import AddClientManagement from "./components/AdminComponents/ClientManagement/AddClientManagement";
import ViewdetailsClientManagement from "./components/AdminComponents/ClientManagement/ViewdetailsClientManagement";
import CostEstimates from "./components/AdminComponents/CostEstimates/CostEstimates";
import AddCostEstimates from "./components/AdminComponents/CostEstimates/AddCostEstimates";
import Receivable from "./components/AdminComponents/ReciveablePurchase/ReciveablePurchase";
import ReciveablePurchase from "./components/AdminComponents/ReciveablePurchase/ReciveablePurchase";
import IssuablePurchase from "./components/AdminComponents/IssuablePurchase/IssuablePurchase";
import AddIssuablePurchase from "./components/AdminComponents/IssuablePurchase/AddIssuablePurchase";
import ProjectList from "./components/AdminComponents/ProjectList/ProjectList";
import AddProjectList from "./components/AdminComponents/ProjectList/AddProjectList";
import JobTracker from "./components/AdminComponents/JobTracker/JobTracker";
import AddJobTracker from "./components/AdminComponents/JobTracker/AddJobTracker.jsx";
import OvervieJobsTracker from "./components/AdminComponents/JobTracker/OvervieJobsTracker";
import UpdateJobTracker from "./components/AdminComponents/JobTracker/UpdateJobTracker.jsx";

import AddJobAssignment from "./components/AdminComponents/JobTracker/AddJobAssignment";
import NewJobsList from "./components/AdminComponents/NewJobsList/NewJobsList";
import InProgress from "./components/AdminComponents/InProgress/InProgress";
import AddInProgress from "./components/AdminComponents/InProgress/AddInProgress";
import Completed_Jobs from "./components/AdminComponents/Completed_Jobs/Completed_Jobs";
import MyJobs from "./components/AdminComponents/MyJobs/MyJobs";
import Completed_jobsView_job_details from "./components/AdminComponents/Completed_Jobs/Completed_jobsView_job_details";
import MyJobsHolidayPackageDesign from "./components/AdminComponents/MyJobs/MyJobsHolidayPackageDesign";
import MyJobs_Upload_Artwork from "./components/AdminComponents/MyJobs/MyJobs_Upload_Artwork";
import TimeLogs from "./components/AdminComponents/TimeLogs/TimeLogs";
import AddTimeLog from "./components/AdminComponents/TimeLogs/AddTimeLog";
import Invoicing_Billing from "./components/AdminComponents/Invoicing_Billing/Invoicing_Billing";
import AddInvoice from "./components/AdminComponents/Invoicing_Billing/AddInvoice";
import TimesheetWorklog from "./components/AdminComponents/TimesheetWorklog/TimesheetWorklog";
import AddTimesheetWorklog from "./components/AdminComponents/TimesheetWorklog/AddTimesheetWorklog";
import Notiifcations from "./components/AdminComponents/Notiifcations/Notiifcations";
import Reports from "./components/Reports/Reports";
import UserRoles from "./components/AdminComponents/UserRoles/UserRoles";
import UserRoleModal from "./components/AdminComponents/UserRoles/UserRoleModal";
import Settings from "./components/AdminComponents/Settings/Settings";
import ProjectOverview from "./components/AdminComponents/ProjectList/ProjectOverview";
import UpdateProjectLis from "./components/AdminComponents/ProjectList/UpdateProjectLis.jsx";
import ProductionManager from "./components/AdminComponents/ProductionManager.jsx/ProductionManager";
import AddProductionManager from "./components/AdminComponents/ProductionManager.jsx/AddProductionManager";
import DesignerPanel from "./components/AdminComponents/DesignerPanel/DesignerPanel";
import AddDesignerPanel from "./components/AdminComponents/DesignerPanel/AddDesignerPanel";
import OvervieMyJobs from "./components/AdminComponents/MyJobs/OvervieMyJobs";
import OvervieJobsProject from "./components/AdminComponents/ProjectList/ProjectTabs/OvervieJobsProject";
import Profile from "./components/AdminComponents/Profile/Profile";
import Extrahr from "./components/AdminComponents/TimeLogs/Extrahr";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();
  const hideLayout = location.pathname === "/" || location.pathname==="/signup";
  

  return (
    <div className="Main-App">
   {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      <div className={`Main-App-container ${hideLayout ? "no-sidebar" : ""}`}>
      {!hideLayout && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className="Main-App-Content">
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Register />} />

          {/* AdminComponents */}
          <Route path="/dashboard" element={<Dashbord />} />
           <Route path="/clientManagement" element={<ClientManagement/>} />
           <Route path="/AddClientManagement" element={<AddClientManagement/>} />
           <Route path="/ViewdetailsClientManagement" element={<ViewdetailsClientManagement/>} />
           <Route path="/CostEstimates" element={<CostEstimates/>} />
           <Route path="/AddCostEstimates" element={<AddCostEstimates/>} />
           <Route path="/receivable" element={<ReciveablePurchase/>} />
           <Route path="/IssuablePurchase" element={<IssuablePurchase/>} />
           <Route path="/AddIssuablePurchase" element={<AddIssuablePurchase/>} />
           <Route path="/projectList" element={<ProjectList/>} />
           <Route path="/AddProjectList" element={<AddProjectList/>} />
           <Route path="/OvervieJobsProject" element={<OvervieJobsProject/>} />
           <Route path="/ProjectOverview" element={<ProjectOverview/>} />
           <Route path="/UpdateProjectLis" element={<UpdateProjectLis/>} />
           <Route path="/jobTracker" element={<JobTracker/>} />
           <Route path="/AddJobTracker" element={<AddJobTracker/>} />           
           <Route path="/OvervieJobsTracker" element={<OvervieJobsTracker/>} />
           <Route path="/updateJobTracker" element={<UpdateJobTracker/>} />
           <Route path="/AddJobAssignment" element={<AddJobAssignment/>} />
           <Route path="/newJobsList" element={<NewJobsList/>} />
           <Route path="/inProgress" element={<InProgress/>}/>
           <Route path="/AddInProgress" element={<AddInProgress/>}/>
           <Route path="/completedJobs" element={<Completed_Jobs/>}/>
           <Route path="/jobsView" element={<Completed_jobsView_job_details/>}/>
           <Route path="/MyJobs" element={<MyJobs/>}/>
           <Route path="/OvervieMyJobs" element={<OvervieMyJobs/>}/>
           <Route path="/MyJobsHolidayPackageDesign" element={<MyJobsHolidayPackageDesign/>}/>
           <Route path="/MyJobs_Upload_Artwork" element={<MyJobs_Upload_Artwork/>}/>
           <Route path="/TimeLogs" element={<TimeLogs/>}/>
           <Route path="/AddTimeLog" element={<AddTimeLog/>}/>
           <Route path="/Invoicing_Billing" element={<Invoicing_Billing/>}/>
           <Route path="/AddInvoice" element={<AddInvoice/>}/>
           <Route path="/TimesheetWorklog" element={<TimesheetWorklog/>}/>
           <Route path="/AddTimesheetWorklog" element={<AddTimesheetWorklog/>}/>
           <Route path="/Notiifcations" element={<Notiifcations/>}/>
           <Route path="/Reports" element={<Reports/>}/>
           <Route path="/UserRoles" element={<UserRoles/>}/>
           <Route path="/UserRoleModal" element={<UserRoleModal/>}/>
           <Route path="/ProductionManager" element={<ProductionManager/>}/>
           <Route path="/AddProductionManager" element={<AddProductionManager/>}/>
           <Route path="/DesignerPanel" element={<DesignerPanel/>}/>
           <Route path="/AddDesignerPanel" element={<AddDesignerPanel/>}/>
           <Route path="/Settings" element={<Settings/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/Extrahr" element={<Extrahr/>}/>
            </Routes>
        </div>
      </div>
    </div>

  )
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;