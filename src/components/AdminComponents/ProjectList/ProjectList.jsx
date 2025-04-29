import React, { useState } from 'react';
import { Table, Badge, Button, Row, Col, Card, Modal, Form, Dropdown } from 'react-bootstrap';
import { FaEye, FaEdit, FaUpload, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Project.css';

function ProjectList() {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([
    {
      id: '00001',
      name: 'POS',
      description: 'Redesign company website with new features',
      startDate: '2025/03/01',
      endDate: '2025/06/30',
      totaltimelogged: '9hour',
      client: 'JohnnySmith',
      status: 'Active Project',
      invoiceCreated: false
    },
    {
      id: '00002',
      name: 'CRM',
      description: 'Developing a cross-platform mobile application',
      startDate: '2025/04/15',
      endDate: '2025/09/20',
      totaltimelogged: '9hour',
      client: 'JohnnySmith',
      status: 'In Progress',
      invoiceCreated: false
    },
    {
      id: '00003',
      name: 'HRM',
      description: 'Integrating a new CRM with existing systems',
      startDate: '2025/05/10',
      endDate: '2025/11/05',
      totaltimelogged: '9hour',
      client: 'JohnnySmith',
      status: 'Completed',
      invoiceCreated: false
    },
    {
      id: '00004',
      name: 'Project Management',
      description: 'Legacy System Migration',
      startDate: '2025/01/01',
      endDate: '2025/12/31',
      totaltimelogged: '9hour',
      client: 'Jane/Doe',
      status: 'Closed',
      invoiceCreated: true
    },
    {
      id: '00005',
      name: 'Task Management',
      description: 'Cloud Infrastructure Setup',
      startDate: '2025/02/15',
      endDate: '2025/08/15',
      totaltimelogged: '9hour',
      client: 'TechCorp',
      status: 'Cancelled',
      invoiceCreated: true
    },
    {
      id: '00006',
      name: 'E-commerce',
      description: 'AI Implementation Project',
      startDate: '2025/06/01',
      endDate: '2025/12/31',
      totaltimelogged: '9hour',
      client: 'InnovationLabs',
      status: 'On Hold',
      invoiceCreated: false
    }
  ]);

  const tabs = ['All', 'Active Project', 'In Progress', 'Completed', 'Closed', 'Cancelled', 'On Hold', 'Completed (To Be Invoiced)'];

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : activeTab === 'Completed (To Be Invoiced)'
      ? projects.filter(project => project.status === 'Completed' && !project.invoiceCreated)
      : projects.filter(project => project.status === activeTab);

  const updateProjectStatus = (index, newStatus) => {
    const updatedProjects = [...projects];
    updatedProjects[index].status = newStatus;
    setProjects(updatedProjects);
  };

  const [selectedJobs, setSelectedJobs] = useState({});

  const handleCheckboxChange = (projectId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <div className="project-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold">Project List</h5>
      </div>

      {/* Project Status Tabs */}
      <div className="project-tabs mb-4">
        <ul className="nav nav-tabs">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ color: "#0d6efd", borderColor: "#0d6efd" }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search and Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search projects.."
          />
        </div>
        <div className="actions">
          <Button variant="outline-secondary" size="sm" className="me-2">
            <FaUpload className="me-1" /> Import
          </Button>
          <Link to={"/AddProjectList"}>
            <Button id='All_btn' variant="dark" size="sm">
              <FaPlus className="me-1" /> Add project
            </Button>
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      <Table responsive className="project-table mb-4">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => {
                  const isChecked = Object.keys(selectedJobs).length === projects.length;
                  const newSelectedJobs = {};
                  projects.forEach((project) => {
                    newSelectedJobs[project.id] = !isChecked;
                  });
                  setSelectedJobs(newSelectedJobs);
                }}
              />
            </th>
            <th style={{ whiteSpace: "nowrap" }}>Project No</th>
            <th style={{ textWrap: "nowrap" }}>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th style={{ whiteSpace: "nowrap" }}>Total Time logged</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project, index) => (
            <tr key={project.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedJobs[project.id] || false}
                  onChange={() => handleCheckboxChange(project.id)}
                />
              </td>
              <td><Link to={"/ProjectOverview"}>{project.id}</Link></td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.totaltimelogged}</td>
              <td>{project.client}</td>
              <th>
              <Button className='mt-4' variant="success" style={{width:"150px"}} size="sm" >
                            {project.status || "Active"}
                           </Button>
              </th>
               
              {/* <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" size="sm">
                    {project.status || 'Select Status'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => updateProjectStatus(index, 'Active Project')}>Active Project</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateProjectStatus(index, 'In Progress')}>In Progress</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateProjectStatus(index, 'Completed')}>Completed</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateProjectStatus(index, 'Closed')}>Closed</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateProjectStatus(index, 'Cancelled')}>Cancelled</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateProjectStatus(index, 'On Hold')}>On Hold</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td> */}
              <td>
                <div className="action-buttons d-flex ">
                  <Button variant="link" className="p-0 me-2">
                    <FaEye />
                  </Button>
                  <Button variant="link" className="p-0 me-2">
                    <Link to={"/UpdateProjectLis"}>
                      <FaEdit />
                    </Link>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-muted small">Showing 1 to {filteredProjects.length} of {projects.length} entries</div>
        <ul className="pagination pagination-sm mb-0">
          <li className="page-item">
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item active">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectList;
