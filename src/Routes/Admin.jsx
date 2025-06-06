import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "../App.css";
import Navbar from "../features/Layouts/Navbar.jsx";
import Sidebar from "../features/Layouts/Sidebar.jsx";
import Dashbord from "../features/Admin/Dashbord/Dashbord.jsx";
import ClientManagement from "../features/Admin/ClientManagement/ClientManagement.jsx";
import AddClientManagement from "../features/Admin/ClientManagement/AddClientManagement.jsx";
import ViewdetailsClientManagement from "../features/Admin/ClientManagement/ViewdetailsClientManagement.jsx";
import CostEstimates from "../features/Admin/CostEstimates/CostEstimates.jsx";
import AddCostEstimates from "../features/Admin/CostEstimates/AddCostEstimates.jsx";
import Receivable from "../features/Admin/ReciveablePurchase/ReciveablePurchase.jsx";
import ReciveablePurchase from "../features/Admin/ReciveablePurchase/ReciveablePurchase.jsx";
import IssuablePurchase from "../features/Admin/IssuablePurchase/IssuablePurchase.jsx";
import AddIssuablePurchase from "../features/Admin/IssuablePurchase/AddIssuablePurchase.jsx";
import ProjectList from "../features/Admin/ProjectList/ProjectList.jsx";
import AddProjectList from "../features/Admin/ProjectList/AddProjectList.jsx";
import JobTracker from "../features/Admin/JobTracker/JobTracker.jsx";
import AddJobTracker from "../features/Admin/JobTracker/AddJobTracker.jsx";
import OvervieJobsTracker from "../features/Admin/JobTracker/OvervieJobsTracker.jsx";
import UpdateJobTracker from "../features/Admin/JobTracker/UpdateJobTracker.jsx";
import AddJobAssignment from "../features/Admin/JobTracker/AddJobAssignment.jsx";
import NewJobsList from "../features/Admin/NewJobsList/NewJobsList.jsx";
import InProgress from "../features/Admin/InProgress/InProgress.jsx";
import AddInProgress from "../features/Admin/InProgress/AddInProgress.jsx";
import Completed_Jobs from "../features/Admin/Completed_Jobs/Completed_Jobs.jsx";
import MyJobs from "../features/Admin/MyJobs/MyJobs.jsx";
import Completed_jobsView_job_details from "../features/Admin/Completed_Jobs/Completed_jobsView_job_details.jsx";
import MyJobsHolidayPackageDesign from "../features/Admin/MyJobs/MyJobsHolidayPackageDesign.jsx";
import MyJobs_Upload_Artwork from "../features/Admin/MyJobs/MyJobs_Upload_Artwork.jsx";
import TimeLogs from "../features/Admin/TimeLogs/TimeLogs.jsx";
import AddTimeLog from "../features/Admin/TimeLogs/AddTimeLog.jsx";
import Invoicing_Billing from "../features/Admin/Invoicing_Billing/Invoicing_Billing.jsx";
import AddInvoice from "../features/Admin/Invoicing_Billing/AddInvoice.jsx";
import TimesheetWorklog from "../features/Admin/TimesheetWorklog/TimesheetWorklog.jsx";
import AddTimesheetWorklog from "../features/Admin/TimesheetWorklog/AddTimesheetWorklog.jsx";
import Notiifcations from "../features/Admin/Notiifcations/Notiifcations.jsx";
import UserRoles from "../features/Admin/UserRoles/UserRoles.jsx";
import UserRoleModal from "../features/Admin/UserRoles/UserRoleModal.jsx";
import Settings from "../features/Admin/Settings/Settings.jsx";
import ProjectOverview from "../features/Admin/ProjectList/ProjectOverview.jsx";
import UpdateProjectLis from "../features/Admin/ProjectList/UpdateProjectLis.jsx";
import ProductionManager from "../features/Admin/ProductionManager.jsx/ProductionManager.jsx";
import AddProductionManager from "../features/Admin/ProductionManager.jsx/AddProductionManager.jsx";
import DesignerPanel from "../features/Admin/DesignerPanel/DesignerPanel.jsx";
import AddDesignerPanel from "../features/Admin/DesignerPanel/AddDesignerPanel.jsx";
import OvervieMyJobs from "../features/Admin/MyJobs/OvervieMyJobs.jsx";
import OvervieJobsProject from "../features/Admin/ProjectList/ProjectTabs/OvervieJobsProject.jsx";
import Profile from "../features/Admin/Profile/Profile.jsx";
import Extrahr from "../features/Admin/TimeLogs/Extrahr.jsx";
import InProgressDashboard from "../features/Admin/Dashbord/InProgressDashboard.jsx";
import JobsDueTodayDashboard from "../features/Admin/Dashbord/JobsDueTodayDashboard.jsx";
import InProgressDashboardProject from "../features/Admin/Dashbord/InProgressDashboardProject.jsx";
import CostEstimatesDashbord from "../features/Admin/Dashbord/CostEstimatesDashbord.jsx";
import Reports from "../features/Reports/Reports.jsx";
import ProtectedRoute from "../Protecuted/Protecuted.jsx";
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
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
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashbord />
                </ProtectedRoute>
              }
            />            <Route path="/InProgressDashboard" element={<InProgressDashboard />} />
            <Route path="/InProgressDashboardProject" element={<InProgressDashboardProject />} />
            <Route path="/JobsDueTodayDashboard" element={<JobsDueTodayDashboard />} />
            <Route path="/CostEstimatesDashbord" element={<CostEstimatesDashbord />} />
            <Route path="/clientManagement" element={<ClientManagement />} />
            <Route path="/AddClientManagement" element={<AddClientManagement />} />
            <Route path="/ViewdetailsClientManagement" element={<ViewdetailsClientManagement />} />
            <Route path="/CostEstimates" element={<CostEstimates />} />
            <Route path="/AddCostEstimates" element={<AddCostEstimates />} />
            <Route path="/duplicate/AddCostEstimates/:id" element={<AddCostEstimates />} />
            <Route path="/receivable" element={<ReciveablePurchase />} />
            <Route path="/IssuablePurchase" element={<IssuablePurchase />} />
            <Route path="/AddIssuablePurchase" element={<AddIssuablePurchase />} />
            <Route path="/projectList" element={<ProjectList />} />
            <Route path="/AddProjectList" element={<AddProjectList />} />
            <Route path="/OvervieJobsProject" element={<OvervieJobsProject />} />
            <Route path="/ProjectOverview/:id" element={<ProjectOverview />} />
            <Route path="/UpdateProjectLis" element={<UpdateProjectLis />} />
            <Route path="/jobTracker" element={<JobTracker />} />
            <Route path="/AddJobTracker/:id" element={<AddJobTracker />} />
            <Route path="/OvervieJobsTracker" element={<OvervieJobsTracker />} />
            <Route path="/updateJobTracker" element={<UpdateJobTracker />} />
            <Route path="/AddJobAssignment" element={<AddJobAssignment />} />
            <Route path="/newJobsList" element={<NewJobsList />} />
            <Route path="/inProgress" element={<InProgress />} />
            <Route path="/AddInProgress" element={<AddInProgress />} />
            <Route path="/completedJobs" element={<Completed_Jobs />} />
            <Route path="/jobsView" element={<Completed_jobsView_job_details />} />
            <Route path="/MyJobs" element={<MyJobs />} />
            <Route path="/OvervieMyJobs" element={<OvervieMyJobs />} />
            <Route path="/MyJobsHolidayPackageDesign" element={<MyJobsHolidayPackageDesign />} />
            <Route path="/MyJobs_Upload_Artwork" element={<MyJobs_Upload_Artwork />} />
            <Route path="/TimeLogs" element={<TimeLogs />} />
            <Route path="/AddTimeLog" element={<AddTimeLog />} />
            <Route path="/Invoicing_Billing" element={<Invoicing_Billing />} />
            <Route path="/AddInvoice" element={<AddInvoice />} />
            <Route path="/TimesheetWorklog" element={<TimesheetWorklog />} />
            <Route path="/AddTimesheetWorklog" element={<AddTimesheetWorklog />} />
            <Route path="/Notiifcations" element={<Notiifcations />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/UserRoles" element={<UserRoles />} />
            <Route path="/UserRoleModal" element={<UserRoleModal />} />
            <Route path="/ProductionManager" element={<ProductionManager />} />
            <Route path="/AddProductionManager" element={<AddProductionManager />} />
            <Route path="/DesignerPanel" element={<DesignerPanel />} />
            <Route path="/AddDesignerPanel" element={<AddDesignerPanel />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Extrahr" element={<Extrahr />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin