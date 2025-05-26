import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaFileInvoiceDollar, FaShoppingCart, FaProjectDiagram, FaTasks, FaIndustry, FaPencilRuler, FaFileAlt, FaClock, FaBell, FaChartLine, FaUsersCog, FaCog } from 'react-icons/fa';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSubmenuPath, setActiveSubmenuPath] = useState(null);
  const [roledata, setRoleData] = useState("admin");

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaHome className="menu-icon" />,
      path: "/dashboard"
    },
    {
      title: "Projects & Jobs",
      icon: <FaProjectDiagram className="menu-icon" />,
      submenu: [
        { title: "Projects", path: "/projectList" },
        { title: "Job Tracker", path: "/JobTracker" },
      ]
    },
    {
      title: "Production",
      icon: <FaIndustry className="menu-icon" />,
      submenu: [
        { title: "Assign Job", path: "/newJobsList" },
        { title: "In Progress", path: "/inProgress" },
        { title: "Completed", path: "/completedJobs" },
        // { title: "Production", path: "/ProductionManager" },
      ]
    },
    {
      title: "Designer Panel",
      icon: <FaPencilRuler className="menu-icon" />,
      submenu: [
        { title: "My Jobs", path: "/MyJobs" },
        { title: "Time Logs", path: "/TimeLogs" },
      // { title: "Designers", path: "/DesignerPanel" },
      ]
    },
    {
      title: "Cost Estimates",
      icon: <FaFileInvoiceDollar className="menu-icon" />,
      path: "/CostEstimates"
    },
    {
      title: "Purchase Orders",
      icon: <FaShoppingCart className="menu-icon" />,
      submenu: [
        { title: "Receivable POs", path: "/receivable" },
        { title: "Issuable POs", path: "/IssuablePurchase" },
      ]
    },
    {
      title: "Invoicing & Billing",
      icon: <FaFileAlt className="menu-icon" />,
      path: "/Invoicing_Billing"
    },
    {
      title: "Timesheet & Worklog",
      icon: <FaClock className="menu-icon" />,
      path: "/TimesheetWorklog"
    },
    {
      title: "Client/Supplier",
      icon: <FaUsersCog className="menu-icon" />,
      path: "/clientManagement"
    },
    {
      title: "Reports & Analytics",
      icon: <FaChartLine className="menu-icon" />,
      path: "/Reports"
    },
    {
      title: "User Permissions",
      icon: <FaUsersCog className="menu-icon" />,
      path: "/UserRoles"
    },
     {
      title: "Notiifcations",
      icon: <FaBell className="menu-icon" />,
      path: "/Notiifcations"
    },
    {
      title: "Settings",
      icon: <FaCog className="menu-icon" />,
      path: "/Settings"
    },
  ]
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handlesubmenuclick = (menuindex, path) => {
    setActiveMenuIndex(menuindex);
    setActiveSubmenuPath(path);
    navigate(path);
  };

  useEffect(()=>{
    const Role= localStorage.getItem("userRole")
     if(Role){
     setRoleData(Role)
     }else{
      setRoleData()
     }
  },[])
  return (
    <>
      <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text">Saaranik</span>
          </div>
        </div>
        <ul className="menu" style={{ whiteSpace: 'nowrap' }}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              // className={`menu-item ${
              //   item.submenu
              //     ? openMenuIndex === index
              //       ? "open"
              //       : ""
              //     : activeMenuIndex === index
              //     ? "active"
              //     : ""
              // }`}
              className={`menu-item ${item.submenu ? openMenuIndex === index ? "open" : activeSubmenuPath?.startsWith(item.submenu[0].path.split('/')[1]) ? "submenu-active" : "" : activeMenuIndex === index ? "active" : ""}`}
              onClick={() => {
                if (item.submenu) {
                  toggleMenu(index);
                } else {
                  handlesubmenuclick(index, item.path);
                }
              }}
            >
              <div className="menu-link menu-i">
                {item.icon}
                {isOpen && <span className="menu-text">{item.title}</span>}
                {item.submenu && isOpen && (
                  <i
                    className={`fas fa-chevron-down menu-toggle-icon ${openMenuIndex === index ? "open" : ""}`}
                  />
                )}
              </div>
              {item.submenu && isOpen && (
                <ul className={`submenu ${openMenuIndex === index ? "open" : ""}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`submenu-item ${activeSubmenuPath === subItem.path ? "active-submenu-item" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlesubmenuclick(index, subItem.path);
                      }}
                    >
                      {subItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
       {/* client-dashboard */}
       {roledata === "client" && (
       <>
       <li
        className={`menu-item ${openMenuIndex === 6 ? "open" : ""} ${
          activeMenuIndex === 6 ? "active" : ""
        }`}
        onClick={() => handlesubmenuclick(6, "/client-home")}>
        <div className="menu-link menu-i">
          <i  className="nav-icon fas fa-home menu-icon"
            style={{ color: "#64748b" }}/>
          {isOpen && <span className="menu-text">  Dashboard </span>}
        
        </div>
      </li>
      <li
        className={`menu-item ${openMenuIndex === 7 ? "open" : ""} ${
          activeMenuIndex === 7 ? "active" : ""
        }`}
        onClick={() => handlesubmenuclick(7, "/select-project")}>
        <div className="menu-link menu-i">
          <i  className="nav-icon fa-solid fa-diagram-project menu-icon"
            style={{ color: "#64748b" }}/>
          {isOpen && <span className="menu-text">  Select Project </span>}
        
        </div>
      </li>
      <li
        className={`menu-item ${openMenuIndex === 8 ? "open" : ""} ${
          activeMenuIndex === 8 ? "active" : ""
        }`}
        onClick={() => handlesubmenuclick(8, "/select-job")}>
        <div className="menu-link menu-i">
          <i className="nav-icon fa-solid fa-users-line menu-icon"
            style={{ color: "#64748b" }}/>
          {isOpen && <span className="menu-text">  Select Job </span>}
        
        </div>
      </li>
      <li
        className={`menu-item ${openMenuIndex === 9 ? "open" : ""} ${
          activeMenuIndex ===9 ? "active" : ""
        }`}
        onClick={() => handlesubmenuclick(9, "/notification")}>
        <div className="menu-link menu-i"> 
          <i className="nav-icon fa-regular fa-bell menu-icon"
            style={{ color: "#64748b" }}/>
          {isOpen && <span className="menu-text">Notification </span>}
        
        </div>
      </li>
      <li
        className={`menu-item ${openMenuIndex === 10 ? "open" : ""} ${
          activeMenuIndex ===10 ? "active" : ""
        }`}
        onClick={() => handlesubmenuclick(10, "/new-projects")}>
        <div className="menu-link menu-i">
          <i  className="nav-icon fa-solid fa-diagram-project menu-icon"
            style={{ color: "#64748b" }}/>
          {isOpen && <span className="menu-text">New Project </span>}
        
        </div>
      </li>
      </>
       )}

      {/* employee-dashboard */}
      {(roledata === "employee" || roledata === "designer") && (
         <>
         <li
            className={`menu-item ${openMenuIndex === 11 ? "open" : ""} ${
              activeMenuIndex === 11 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(11, "/emoloyeedashboard")}
          >
            <div className="menu-link menu-i">
              <i
                className="nav-icon fas fa-home menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && <span className="menu-text">Employee Dashboard</span>}
             
            </div>
          </li>
          <li
            className={`menu-item ${openMenuIndex === 12 ? "open" : ""} ${
              activeMenuIndex === 12 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(12, "/task")}
          >
            <div className="menu-link menu-i">
              <i
                className="fa-solid fa-bars-progress menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && <span className="menu-text"> My Tasks</span>}
           
            </div>
          </li>
          <li
            className={`menu-item ${openMenuIndex === 13 ? "open" : ""} ${
              activeMenuIndex === 13 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(13, "/picktask")}
          >
            <div className="menu-link menu-i">
              <i
                className="fa-solid fa-list-check menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && <span className="menu-text">Pick Task</span>}
          
            </div>
          </li>
          <li
            className={`menu-item ${openMenuIndex === 14 ? "open" : ""} ${
              activeMenuIndex === 14 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(14, "/submittask")}
          >
            <div className="menu-link menu-i">
              <i
                className="fa-solid fa-closed-captioning menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && <span className="menu-text">Submit Task</span>}
            
            </div>
          </li>
          <li
            className={`menu-item ${openMenuIndex === 15 ? "open" : ""} ${
              activeMenuIndex === 15 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(15, "/projectdetail")}
          >
            <div className="menu-link menu-i">
              <i
                className="fa-solid fa-street-view menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && (
                <span className="menu-text">View Project Details</span>
              )}
           
            </div>
          </li>
          <li
            className={`menu-item ${openMenuIndex === 16 ? "open" : ""} ${
              activeMenuIndex === 16 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(16, "/jobhistory")}
          >
            <div className="menu-link menu-i">
              <i
                className="fa-solid fa-clock-rotate-left menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && <span className="menu-text">Job History</span>}
            
            </div>
          </li>
          <li
            className={`menu-item ${openMenuIndex === 17 ? "open" : ""} ${
              activeMenuIndex === 17 ? "active" : ""
            }`}
            onClick={() => handlesubmenuclick(17, "/timetracking")}
          >
            <div className="menu-link menu-i ">
              <i
                className="fa-solid fa-timeline menu-icon"
                style={{ color: "#64748b" }}
              />
              {isOpen && <span className="menu-text">Time Tracking</span>}
            
            </div>
          </li>
          </>
       )}


        {/* ProductionManager */}
       {(roledata === "productionManager" ) && (
  <>
    <li
      className={`menu-item ${openMenuIndex === 18 ? "open" : ""} ${
        activeMenuIndex === 18 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(18, "/productiondasboard")}
    >
      <div className="menu-link menu-i">
        <i
          className="nav-icon fas fa-home menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Production Dashboard</span>}
      </div>
    </li>

    <li
      className={`menu-item ${openMenuIndex === 19 ? "open" : ""} ${
        activeMenuIndex === 19 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(19, "/ProductionProjects")}
    >
      <div className="menu-link menu-i">
        <i
          className="fa-solid fa-diagram-project menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Projects</span>}
      </div>
    </li>

    <li
      className={`menu-item ${openMenuIndex === 20 ? "open" : ""} ${
        activeMenuIndex === 20 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(20, "/ProductionJobs")}
    >
      <div className="menu-link menu-i">
        <i
          className="fa-solid fa-users menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Jobs</span>}
      </div>
    </li>
    <li
      className={`menu-item ${openMenuIndex === 21 ? "open" : ""} ${
        activeMenuIndex === 21 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(21, "/ProductioneMployees")}
    >
      <div className="menu-link menu-i">
        <i
          className="fa-solid fa-tasks menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Eployees</span>}
      </div>
    </li>
    <li
      className={`menu-item ${openMenuIndex === 22 ? "open" : ""} ${
        activeMenuIndex === 22 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(22, "/ProductionClients")}
    >
      <div className="menu-link menu-i">
        <i
          className="fa-solid fa-chart-line menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Clients</span>}
      </div>
    </li>

    <li
      className={`menu-item ${openMenuIndex === 23 ? "open" : ""} ${
        activeMenuIndex === 23 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(23, "/ProductionTimeline")}
    >
      <div className="menu-link menu-i">
        <i
          className="fa-solid fa-calendar-alt menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Timeline</span>}
      </div>
    </li>

    <li
      className={`menu-item ${openMenuIndex === 24 ? "open" : ""} ${
        activeMenuIndex === 24 ? "active" : ""
      }`}
      onClick={() => handlesubmenuclick(24, "/ProductionReports")}
    >
      <div className="menu-link menu-i">
        <i
          className="fa-solid fa-check-circle menu-icon"
          style={{ color: "#64748b" }}
        />
        {isOpen && <span className="menu-text">Reports</span>}
      </div>
    </li>
  </>
)}


};

export default Sidebar;
