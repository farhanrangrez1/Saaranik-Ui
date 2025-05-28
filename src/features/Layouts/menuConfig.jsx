// src/config/menuConfig.js
import {
  FaHome,
  FaFileInvoiceDollar,
  FaShoppingCart,
  FaProjectDiagram,
  FaIndustry,
  FaPencilRuler,
  FaFileAlt,
  FaClock,
  FaBell,
  FaChartLine,
  FaUsersCog,
  FaCog,
  FaTasks,
  FaClipboardList,  // Replaced FaListCheck here
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";


export const adminMenuItems = [
  {
    title: "Dashboard",
    icon: <FaHome className="menu-icon" />,
    path: "/admin/dashboard",
  },
  {
    title: "Projects & Jobs",
    icon: <FaProjectDiagram className="menu-icon" />,
    submenu: [
      { title: "Projects", path: "/admin/projectList" },
      { title: "Job Tracker", path: "/admin/JobTracker" },
    ],
  },
  {
    title: "Production",
    icon: <FaIndustry className="menu-icon" />,
    submenu: [
      { title: "Assign Job", path: "/admin/newJobsList" },
      { title: "In Progress", path: "/admin/inProgress" },
      { title: "Completed", path: "/admin/completedJobs" },
    ],
  },
  {
    title: "Designer Panel",
    icon: <FaPencilRuler className="menu-icon" />,
    submenu: [
      { title: "My Jobs", path: "/admin/MyJobs" },
      { title: "Time Logs", path: "/admin/TimeLogs" },
    ],
  },
  {
    title: "Cost Estimates",
    icon: <FaFileInvoiceDollar className="menu-icon" />,
    path: "/admin/CostEstimates",
  },
  {
    title: "Purchase Orders",
    icon: <FaShoppingCart className="menu-icon" />,
    submenu: [
      { title: "Receivable POs", path: "/admin/receivable" },
      { title: "Issuable POs", path: "/admin/IssuablePurchase" },
    ],
  },
  {
    title: "Invoicing & Billing",
    icon: <FaFileAlt className="menu-icon" />,
    path: "/admin/Invoicing_Billing",
  },
  {
    title: "Timesheet & Worklog",
    icon: <FaClock className="menu-icon" />,
    path: "/admin/TimesheetWorklog",
  },
  {
    title: "Client/Supplier",
    icon: <FaUsersCog className="menu-icon" />,
    path: "/admin/clientManagement",
  },
  {
    title: "Reports & Analytics",
    icon: <FaChartLine className="menu-icon" />,
    path: "/admin/Reports",
  },
  {
    title: "User Permissions",
    icon: <FaUsersCog className="menu-icon" />,
    path: "/admin/UserRoles",
  },
  {
    title: "Notifications",
    icon: <FaBell className="menu-icon" />,
    path: "/admin/Notiifcations",
  },
  {
    title: "Settings",
    icon: <FaCog className="menu-icon" />,
    path: "/admin/Settings",
  },
];


export const employeeMenuItems = [
  {
    title: "Employee Dashboard",
    icon: <FaHome className="menu-icon" />,
    path: "/employee/dashboard",
  },
  {
    title: "My Tasks",
    icon: <FaTasks className="menu-icon" />,
    path: "/admin/MyJobs",
  },
  {
    title: "Pick Task",
    icon: <FaClipboardList className="menu-icon" />,
    path: "/employee/picktask",
  },
  // {
  //   title: "Submit Task",
  //   icon: <FaCheckCircle className="menu-icon" />,
  //   path: "/submittask",
  // },
  {
    title: "View Project Details",
    icon: <FaProjectDiagram className="menu-icon" />,
    path: "/employee/projectList",
  },
  {
    title: "Job History",
    icon: <FaHistory className="menu-icon" />,
    path: "/employee/jobhistory",
  },
  {
    title: "Time Tracking",
    icon: <FaClock className="menu-icon" />,
    path: "/admin/TimesheetWorklog",
  },
  {
    title: "Notifications",
    icon: <FaBell className="menu-icon" />,
    path: "/admin/Notiifcations",
  },
  {
    title: "Settings",
    icon: <FaCog className="menu-icon" />,
    path: "/admin/Settings",
  },
];
