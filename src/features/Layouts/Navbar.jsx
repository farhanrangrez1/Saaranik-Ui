import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [roledata, setRoleData]= useState("")
  useEffect(()=>{
    const Role= localStorage.getItem("userRole")
     if(Role){
     setRoleData(Role)
     }else{
      setRoleData()
     }
  },[])

const handleLogout = () => {
  // Clear entire localStorage
  localStorage.clear();

  // Optionally redirect to login page
  window.location.href = "/"; // ya "/login"
};

  return (
    <>
      <nav className="navbar me-5 d-flex justify-content-end">
        <div className="navbar-left">
          <p className="navbar-logo">logo</p>
          <button onClick={toggleSidebar} className="toggle-button d-block d-md-none">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className="navbar-right">
          <div className="dropdown profile-dropdown d-none d-md-block">
            <div className="profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="profile-info">
                <span className="profile-name">{roledata}</span>
                <span className="profile-role">Project Manager</span>
              </div>
              <div className="profile-avatar">
                <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2654" alt="profile" />
              </div>
            </div>

            <ul className="dropdown-menu dropdown-menu-end profile-menu">
              <li>
              <Link to="/admin/profile" className="dropdown-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                 <i className="fas fa-user" style={{ marginRight: '8px' }}></i>
                   <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/profile/update" className="dropdown-item">
                  <i className="fas fa-edit"></i>
                  <span>Update Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/profile/password" className="dropdown-item">
                  <i className="fas fa-lock"></i>
                  <span>Change Password</span>
                </Link>
              </li>
              <li><hr className="dropdown-divider"/></li>
              <li onClick={handleLogout}>
                <Link to="/" className="dropdown-item text-danger">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;