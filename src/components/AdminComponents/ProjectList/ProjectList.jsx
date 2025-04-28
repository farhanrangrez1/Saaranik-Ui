import React, { useState } from 'react';
import { Table, Badge, Button, ProgressBar, Row, Col, Card } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaDownload, FaUpload, FaPlus } from 'react-icons/fa';
import './Project.css';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [ 'All','Active Project', 'In Progress', 'Completed', 'Closed', 'Cancelled', 'On Hold'];

  const projects = [
    {
      id: '00001',
      name: 'POS',
      description: 'Redesign company website with new features',
      startDate: '2025/03/01',
      endDate: '2025/06/30',
      totaltimelogged: '9hour',
      client: 'JohnnySmith',
      status: 'Active Project'
    },
    {
      id: '00002',
      name: 'CRM',
      description: 'Developing a cross-platform mobile application',
      startDate: '2025/04/15',
      endDate: '2025/09/20',
      totaltimelogged: '9hour',
      client: 'JohnnySmith',
      status: 'In Progress'
    },
    {
      id: '00003',
      name: 'HRM',
      description: 'Integrating a new CRM with existing systems',
      startDate: '2025/05/10',
      endDate: '2025/11/05',
      totaltimelogged: '9hour',
      client: 'JohnnySmith',
      status: 'Completed'
    },
    {
      id: '00004',
      name: 'Project Management',
      description: 'Legacy System Migration',
      startDate: '2025/01/01',
      endDate: '2025/12/31',
      totaltimelogged: '9hour',
      client: 'Jane/Doe',
      status: 'Closed'
    },
    {
      id: '00005',
      name: 'Task Management',
      description: 'Cloud Infrastructure Setup',
      startDate: '2025/02/15',
      endDate: '2025/08/15',
      totaltimelogged: '9hour',
      client: 'TechCorp',
      status: 'Cancelled'
    },
    {
      id: '00006',
      name: 'E-commerce',
      description: 'AI Implementation Project',
      startDate: '2025/06/01',
      endDate: '2025/12/31',
      totaltimelogged: '9hour',
      client: 'InnovationLabs',
      status: 'On Hold'
    }
  ];

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(project => project.status === activeTab);
  const jobList = [
    { phase: 'Design Phase', status: 'Completed' },
    { phase: 'Development', status: 'In Progress' },
    { phase: 'Testing', status: 'Pending' }
  ];

  const costEstimate = {
    estimated: 50000,
    actual: 45000,
    variance: 5000
  };

  const purchaseOrders = {
    received: 3,
    issued: 5,
    totalValue: 35000
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const classes = {
      'Active': 'badge-active',
      'In Progress': 'badge-progress',
      'Completed': 'badge-completed',
      'Pending': 'badge-pending'
    };
    return <span className={`badge ${classes[status] || 'badge-pending'}`}>{status}</span>;
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
                style={{color:"#0d6efd",borderColor:"#0d6efd"}}
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
          {/* <Button variant="outline-secondary" size="sm" className="me-2">
            <FaDownload className="me-1" /> Export
          </Button> */}
          <Button variant="outline-secondary" size="sm" className="me-2">
            <FaUpload className="me-1" /> Import
          </Button>
          <Link to={"/AddProjectList"}>    <Button id='All_btn' variant="dark" size="sm">
            <FaPlus className="me-1" /> Add project
          </Button></Link>
        </div>
      </div>

      {/* Projects Table */}
      <Table responsive className="project-table mb-4">
        <thead>
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>Project No</th>
            <th style={{textWrap:"nowrap"}}>Project Name</th>
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
          {filteredProjects.map((project) => (
            <tr key={project.id}>
               <td><Link to={"/ProjectOverview"}>{project.id}</Link></td>
               <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.totaltimelogged}</td>
              <td>{project.client}</td>
              <td>{getStatusBadge(project.status)}</td>
              <td>
                <div className="action-buttons d-flex ">
                  <Button variant="link" className="p-0 me-2">
                    <FaEye />
                  </Button>
                  <Button variant="link" className="p-0 me-2">
                  <Link to={"/UpdateProjectLis"}><FaEdit /></Link>
                  </Button>
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-muted small">Showing 1 to 3 of 10 entries</div>
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

      {/* Dashboard Cards */}
      <Row>
        {/* Job List */}
        {/* <Col md={4}>
          <Card>
            <Card.Header>Job List gwd</Card.Header>
            <Card.Body>
              <Table borderless>
                <tbody>
                  {jobList.map((job, index) => (
                    <tr key={index}>
                      <td>{job.phase}</td>
                      <td>{getStatusBadge(job.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}

        {/* Cost Estimate */}
        {/* <Col md={4}>
          <Card>
            <Card.Header className="py-3">Cost Estimate</Card.Header>
            <Card.Body>
              <Table borderless className="table-sm">
                <tbody>
                  <tr>
                    <td className="text-muted">Estimated Cost</td>
                    <td className="text-end">{formatCurrency(costEstimate.estimated)}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">Actual Cost</td>
                    <td className="text-end">{formatCurrency(costEstimate.actual)}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">Variance</td>
                    <td className="text-end text-success">{formatCurrency(costEstimate.variance)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}

        {/* Purchase Orders */}
        {/* <Col md={4}>
          <Card>
            <Card.Header className="py-3">Purchase Orders</Card.Header>
            <Card.Body>
              <Table borderless className="table-sm">
                <tbody>
                  <tr>
                    <td className="text-muted">PO Received</td>
                    <td className="text-end">{purchaseOrders.received}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">PO Issued</td>
                    <td className="text-end">{purchaseOrders.issued}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">Total Value</td>
                    <td className="text-end">{formatCurrency(purchaseOrders.totalValue)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      {/* Progress Bar */}
      {/* <Card className="mt-4">
        <Card.Body className="py-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="text-muted">Progress</div>
            <div className="small text-muted">60%</div>
          </div>
          <ProgressBar now={60} variant="success" className="progress-sm" />
        </Card.Body>
      </Card> */}
    </div>
  )
}

export default ProjectList