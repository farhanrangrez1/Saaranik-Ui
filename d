import React, { useState } from 'react';
import ProjectOverviewTab from './ProjectTabs/ProjectOverviewTab';
import ProjectJobsTab from './ProjectTabs/ProjectJobsTab';
import ProjectFinanceTab from './ProjectTabs/ProjectFinanceTab';
import ProjectDocumentsTab from './ProjectTabs/ProjectDocumentsTab';
import ProjectTeamTab from './ProjectTabs/ProjectTeamTab';
import { Link } from 'react-router-dom';

function ProjectOverview() {
  const [activeTab, setActiveTab] = useState('overview');

  const projectData = {
    title: 'Website Redesign Project',
    projectId: 'P00001',
    client: 'Acme Corporation',
    progress: 60,
    daysRemaining: 45,
    dueDate: 'Jan 30, 2025',
    budget: {
      status: '15',
      isUnderBudget: true,
    },
    teamSize: 8,
    jobList: [
      { phase: 'Design Phase', status: 'Complete', type: 'UI/UX Design' },
      { phase: 'Development', status: 'In Progress', type: 'Frontend & Backend' },
      { phase: 'Testing', status: 'Pending', type: 'QA & UAT' }
    ],
    recentActivity: [
      { action: 'Design phase completed', time: '2 hours ago' },
      { action: 'New purchase order created', time: 'Yesterday' },
      { action: 'New team member added', time: '2 days ago' }
    ],
    teamMembers: [
      { name: 'Sarah Johnson', role: 'Project Manager' },
      { name: 'Michael Chen', role: 'Lead Developer' },
      { name: 'Emily Wilson', role: 'UI/UX Designer' }
    ],
    purchaseOrders: {
      received: 3,
      issued: 5,
      totalValue: '$35,000'
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverviewTab projectData={projectData} />;
      case 'jobs':
        return <ProjectJobsTab jobList={projectData.jobList} />;
      case 'finance':
        return <ProjectFinanceTab budget={projectData.budget} purchaseOrders={projectData.purchaseOrders} />;
      case 'documents':
        return <ProjectDocumentsTab />;
      case 'team':
        return <ProjectTeamTab teamMembers={projectData.teamMembers} />;
      default:
        return <ProjectOverviewTab projectData={projectData} />;
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Project Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">{projectData.projectId}-{projectData.title}</h4>
          <div className="text-muted">
           Client: {projectData.client}
          </div>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2">Import File</button>
         <Link to={"/UpdateProjectLis"}><button id='All_btn' className="btn btn-dark">Edit Project</button></Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Jobs
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Finance
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Documents
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Team
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

export default ProjectOverview;











status: '+$5,000',
      isUnderBudget: true,
      estimated: '$50,000',
      actual: '$45,000'






















      import React, { useEffect, useState } from 'react';
      import { Form, Button, Container, Row, Col } from 'react-bootstrap';
      import { useDispatch } from 'react-redux';
      import { useNavigate, useParams } from 'react-router-dom';
      import { createProject } from '../../../redux/slices/ProjectsSlice';
      import { toast } from "react-toastify";
      import "react-toastify/dist/ReactToastify.css";
      
      
      function AddProjectList() {
        const navigate = useNavigate();
        const dispatch = useDispatch()
        const { id } = useParams();
      
        
        const [formData, setFormData] = useState({
          projectName: '',
          clientId: '',
          managerId: '',
          startDate: '',
          endDate: '',
          projectPriority: '',
          description: '',
          status: '',
          projectRequirements: {
            creativeDesign: false,
            artworkAdaptation: false,
            prepress: false,
            POS: false,
            mockups: false,
            rendering: false,
          },
          budgetAmount: '',
          currency: '',
          totalTime: ''
        });
        useEffect(() => {
          if (id) {
            // dispatch(getalltool());
          }
        }, [id, dispatch]);
      
        useEffect(() => {
          if (id && tools.length > 0) {
            const existingEntry = tools.find((entry) => entry._id === id);
            if (existingEntry) {
              setFormData({
                toolID: existingEntry.toolID,
                name: existingEntry.name,
                manufacturer: existingEntry.manufacturer,
                category: existingEntry.category,
                purchaseDate: existingEntry.purchaseDate.split("T")[0],
                condition: existingEntry.condition,
                notes: existingEntry.notes,
                location: existingEntry.location,
              });
            }
          }
        }, [id, tools]);
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
            ...prev,
            [name]: value
          }));
        };
      
      
        const handleCheckboxChange = (e) => {
          const { name, checked } = e.target;
          setFormData(prev => ({
            ...prev,
            projectRequirements: {
              ...prev.projectRequirements,
              [name]: checked
            }
          }));
        };
      
      // AddProjectList.js
      const handleSubmit = e => {
        e.preventDefault();
        const payload = {
          ...formData,
          projectRequirements: [formData.projectRequirements]
        };
      
        if (id) {
          dispatch(updatetool({ id, updatedtool: formData }))
            .unwrap()
            .then(() => {
              toast.success("Tool Updated Successfully!");
              navigate("/plantMachinery");
            })
            .catch(() => {
              toast.error("Failed to update Tool!");
            });
        } else {
          dispatch(createProject(payload))
            .unwrap()
            .then(() => {
              toast.success("Tool Added successfully");
              navigate("/plantMachinery");
            })
            .catch(() => {
              toast.error("Error in creating tool");
            });
        }
      
      };
      
        
        
        const handleCancel = () => {
          // navigate(-1);
        };
      
        return (
          <Container className="py-4">
            <div className="form-container p-4 rounded shadow-sm" style={{ backgroundColor: "white", margin: "0 auto" }}>
              <h2 className="mb-4">New Project</h2>
              <Form onSubmit={handleSubmit} >
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Client Name</Form.Label>
                      <Form.Select
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Client</option>
                        <option value="662fb9cba77b2e0012345679">662fb9cba77b2e0012345679</option>
                        <option value="client2">Client 2</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Manager</Form.Label>
                      <Form.Select
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Manager</option>
                        <option value="662fb9a2a77b2e0012345678">662fb9a2a77b2e0012345678</option>
                        <option value="manager2">Manager 2</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Expected Completion Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Priority</Form.Label>
                      <Form.Select
                        name="projectPriority"
                        value={formData.projectPriority}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Total Time Logged</Form.Label>
                      <Form.Control
                        type="time"
                        name="totalTime"
                        value={formData.totalTime}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
      
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted mb-1">Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
      
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted mb-1">Project Requirements</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="Creative Design"
                      name="creativeDesign"
                      checked={formData.projectRequirements.creativeDesign}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Artwork Adaptation"
                      name="artworkAdaptation"
                      checked={formData.projectRequirements.artworkAdaptation}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Prepress/File Preparation"
                      name="prepress"
                      checked={formData.projectRequirements.prepress}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="POS"
                      name="POS"
                      checked={formData.projectRequirements.POS}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Mockups"
                      name="mockups"
                      checked={formData.projectRequirements.mockups}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="3D Rendering"
                      name="rendering"
                      checked={formData.projectRequirements.rendering}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </Form.Group>
      
                <Form.Label className="text-muted mb-1">Budget Information</Form.Label>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder="Budget Amount"
                        name="budgetAmount"
                        value={formData.budgetAmount}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Currency</option>
                        <option value="AED">AED</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                        <option value="SAR">SAR</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
      
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button variant="secondary" className="px-4" style={{ minWidth: "120px" }} onClick={handleCancel}>Cancel</Button>
                  <Button variant="dark" type="submit" className="px-4" style={{ minWidth: "120px" }}>Create Project</Button>
                </div>
              </Form>
            </div>
          </Container>
        );
      }
      
      export default AddProjectList;
      






















      import React, { useEffect, useState } from 'react';
      import { Table, Badge, Button, Row, Col, Card, Modal, Form, Dropdown } from 'react-bootstrap';
      import { FaEye, FaEdit, FaUpload, FaPlus } from 'react-icons/fa';
      import { Link } from 'react-router-dom';
      import './Project.css';
      import { useDispatch, useSelector } from 'react-redux';
      import { fetchProject } from '../../../redux/slices/ProjectsSlice';
      
      function ProjectList() {
        const [activeTab, setActiveTab] = useState('All');
        const [currentPage, setCurrentPage] = useState(1);
      
       const dispatch =useDispatch()
      
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
      
      
      
      
      
      
        // All Projects 
      const { project, loading, error } = useSelector((state) => state.projects);
      console.log(project.data, "project");
      
      // const projectOptions = [
      //   "All",
      //   ...new Set(project.data.map((d) => d.project?.name).filter(Boolean)),
      // ];
      
      // const statusOptions = [
      //   "All",
      //   ...new Set(project.data.map((d) => d.status).filter(Boolean)),
      // ];
      
      useEffect(() => {
        dispatch(fetchProject());
      }, [dispatch]);
      
        const tabs = ['All', 'Active', 'In Progress', 'Completed', 'Closed', 'Cancelled', 'On Hold', 'Completed (To Be Invoiced)'];
      
        const filteredProjects = activeTab === 'All' 
          ? project.data
          : activeTab === 'Completed (To Be Invoiced)'
            ? project.data?.filter(project => project.status === 'Completed' && !project.invoiceCreated)
            : project.data?.filter(project => project.status === activeTab);
      
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
      





























      import React, { useState, useEffect } from 'react';
      import { Form, Button, Container, Row, Col } from 'react-bootstrap';
      import { useDispatch, useSelector } from 'react-redux';
      import { useNavigate, useParams } from 'react-router-dom';
      import { createProject, fetchProjectById, updateProject } from '../../../redux/slices/ProjectsSlice';
      import { toast } from "react-toastify";
      import "react-toastify/dist/ReactToastify.css";
      
      function AddProjectList() {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const { id } = useParams(); // Grab project ID from URL
        const [formData, setFormData] = useState({
          projectName: '',
          clientId: '',
          managerId: '',
          startDate: '',
          endDate: '',
          projectPriority: '',
          description: '',
          status: '',
          projectRequirements: {
            creativeDesign: false,
            artworkAdaptation: false,
            prepress: false,
            POS: false,
            mockups: false,
            rendering: false,
          },
          budgetAmount: '',
          currency: '',
          totalTime: ''
        });
      
        // Load existing project data in edit mode
        useEffect(() => {
          if (id) {
            dispatch(fetchProjectById(id)).then((res) => {
              const project = res.payload;
              if (project) {
                setFormData({
                  ...project,
                  projectRequirements: project.projectRequirements?.[0] || {}
                });
              }
            });
          }
        }, [id, dispatch]);
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
            ...prev,
            [name]: value
          }));
        };
      
        const handleCheckboxChange = (e) => {
          const { name, checked } = e.target;
          setFormData(prev => ({
            ...prev,
            projectRequirements: {
              ...prev.projectRequirements,
              [name]: checked
            }
          }));
        };
      
        const handleSubmit = e => {
          e.preventDefault();
          const payload = {
            ...formData,
            projectRequirements: [formData.projectRequirements]
          };
          if (id) {
            dispatch(updateProject({ id, data: payload }))
              .unwrap()
              .then(() => {
                toast.success("Project updated successfully!");
                navigate("/plantMachinery");
              })
              .catch(() => {
                toast.error("Failed to update project!");
              });
          } else {
            dispatch(createProject(payload))
              .unwrap()
              .then(() => {
                toast.success("Project created successfully!");
                navigate("/projectList");
              })
              .catch(() => {
                toast.error("Error creating project");
              });
          }
        };
      
        const handleCancel = () => {
          navigate("/plantMachinery");
        };
      
        return (
          <Container className="py-4">
            <div className="form-container p-4 rounded shadow-sm" style={{ backgroundColor: "white", margin: "0 auto" }}>
              <h2 className="mb-4">New Project</h2>
              <Form onSubmit={handleSubmit} >
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Client Name</Form.Label>
                      <Form.Select
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Client</option>
                        <option value="662fb9cba77b2e0012345679">662fb9cba77b2e0012345679</option>
                        <option value="client2">Client 2</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Manager</Form.Label>
                      <Form.Select
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Manager</option>
                        <option value="662fb9a2a77b2e0012345678">662fb9a2a77b2e0012345678</option>
                        <option value="manager2">Manager 2</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Expected Completion Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Priority</Form.Label>
                      <Form.Select
                        name="projectPriority"
                        value={formData.projectPriority}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Project Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Active Project">Active Project</option>
                        <option value="In Progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="Completed">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-muted mb-1">Total Time Logged</Form.Label>
                      <Form.Control
                        type="time"
                        name="totalTime"
                        value={formData.totalTime}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
      
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted mb-1">Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
      
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted mb-1">Project Requirements</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="Creative Design"
                      name="creativeDesign"
                      checked={formData.projectRequirements.creativeDesign}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Artwork Adaptation"
                      name="artworkAdaptation"
                      checked={formData.projectRequirements.artworkAdaptation}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Prepress/File Preparation"
                      name="prepress"
                      checked={formData.projectRequirements.prepress}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="POS"
                      name="POS"
                      checked={formData.projectRequirements.POS}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Mockups"
                      name="mockups"
                      checked={formData.projectRequirements.mockups}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="3D Rendering"
                      name="rendering"
                      checked={formData.projectRequirements.rendering}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </Form.Group>
      
                <Form.Label className="text-muted mb-1">Budget Information</Form.Label>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder="Budget Amount"
                        name="budgetAmount"
                        value={formData.budgetAmount}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Currency</option>
                        <option value="AED">AED</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                        <option value="SAR">SAR</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
      
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button variant="secondary" className="px-4" style={{ minWidth: "120px" }} onClick={handleCancel}>Cancel</Button>
                  <Button variant="dark" type="submit" className="px-4" style={{ minWidth: "120px" }}>Create Project</Button>
                </div>
              </Form>
            </div>
          </Container>
        );
      }
      
      export default AddProjectList;






import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createProject, fetchProjectById, updateProject } from '../../../redux/slices/ProjectsSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mode
  const location = useLocation();
  const { project } = location.state || {};

  const [formData, setFormData] = useState({
    projectName: '',
    clientId: '',
    managerId: '',
    startDate: '',
    endDate: '',
    projectPriority: '',
    description: '',
    status: '',
    projectRequirements: {
      creativeDesign: false,
      artworkAdaptation: false,
      prepress: false,
      POS: false,
      mockups: false,
      rendering: false,
    },
    budgetAmount: '',
    currency: '',
    totalTime: ''
  });

  useEffect(() => {
    if (project) {
      // Form pre-filled from location.state
      setFormData({
        ...project,
        projectRequirements: project.projectRequirements?.[0] || {}
      });
    } else if (id) {
      // Form pre-filled from API
      dispatch(fetchProjectById(id)).then((res) => {
        const fetchedProject = res.payload;
        if (fetchedProject) {
          setFormData({
            ...fetchedProject,
            projectRequirements: fetchedProject.projectRequirements?.[0] || {}
          });
        }
      });
    }
  }, [id, dispatch, project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      projectRequirements: {
        ...prev.projectRequirements,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      projectRequirements: [formData.projectRequirements]
    };

    if (id) {
      dispatch(updateProject({ id, data: payload }))
        .unwrap()
        .then(() => {
          toast.success("Project updated successfully!");
          navigate("/plantMachinery");
        })
        .catch(() => {
          toast.error("Failed to update project!");
        });
    } else {
      dispatch(createProject(payload))
        .unwrap()
        .then(() => {
          toast.success("Project created successfully!");
          navigate("/projectList");
        })
        .catch(() => {
          toast.error("Error creating project");
        });
    }
  };

  const handleCancel = () => {
    navigate("/plantMachinery");
  };

  return (
    <Container className="py-4">
      <div className="form-container p-4 rounded shadow-sm" style={{ backgroundColor: "white", margin: "0 auto" }}>
        <h2 className="mb-4">{id ? "Edit Project" : "New Project"}</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Client Name</Form.Label>
                <Form.Select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Client</option>
                  <option value="662fb9cba77b2e0012345679">Client 1</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Project Manager</Form.Label>
                <Form.Select
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Manager</option>
                  <option value="662fb9a2a77b2e0012345678">Manager 1</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Expected Completion Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Project Priority</Form.Label>
                <Form.Select
                  name="projectPriority"
                  value={formData.projectPriority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Project Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active Project">Active Project</option>
                  <option value="In Progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="Closed">Closed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="On Hold">On Hold</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-muted mb-1">Total Time Logged</Form.Label>
                <Form.Control
                  type="time"
                  name="totalTime"
                  value={formData.totalTime}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted mb-1">Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted mb-1">Project Requirements</Form.Label>
            <div>
              {['creativeDesign', 'artworkAdaptation', 'prepress', 'POS', 'mockups', 'rendering'].map((key) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  label={key.replace(/([A-Z])/g, ' $1')}
                  name={key}
                  checked={formData.projectRequirements[key]}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Label className="text-muted mb-1">Budget Information</Form.Label>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Budget Amount"
                  name="budgetAmount"
                  value={formData.budgetAmount}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="">Select Currency</option>
                  <option value="AED">AED</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="SAR">SAR</option>
                  <option value="USD">USD</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" className="px-4" style={{ minWidth: "120px" }} onClick={handleCancel}>Cancel</Button>
            <Button variant="dark" type="submit" className="px-4" style={{ minWidth: "120px" }}>
              {id ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default AddProjectList;

      
      























      import axios from 'axios';
      import React, { useEffect, useState } from 'react';
      import { useNavigate, useParams } from 'react-router-dom'; // ✅ Added useParams
      import { toast, ToastContainer } from 'react-toastify';
      import 'react-toastify/dist/ReactToastify.css';
      import Barcode from 'react-barcode';
      import Select from 'react-select';
      import { useDispatch, useSelector } from 'react-redux';
      import { fetchProject } from '../../../redux/slices/ProjectsSlice';
      import { createjob, fetchjobById } from '../../../redux/slices/JobsSlice';
      
      
      import { useLocation } from 'react-router-dom';
      
      function AddJobTracker() {
        const { id } = useParams(); 
        const navigate = useNavigate();
        const dispatch = useDispatch();
      
        const { project, loading, error } = useSelector((state) => state.projects);
      
        useEffect(() => {
          dispatch(fetchProject());
        }, [dispatch]);
      
        const [formData, setFormData] = useState({
          projectsId: '',
          brandName: '',
          subBrand: '',
          flavour: '',
          packType: '',
          packSize: '',
          priority: '',
          Status: '',
          totalTime: '',
          assign: '',
          barcode: 'POS-123456',
        });
      
        const brandOptions = [
          { value: 'Pepsi', label: 'Pepsi' },
          { value: 'CocaCola', label: 'CocaCola' },
          { value: 'Fanta', label: 'Fanta' },
        ];
      
        const flavourOptions = [
          { value: 'Orange', label: 'Orange' },
          { value: 'Lime', label: 'Lime' },
          { value: 'Ginger Ale', label: 'Ginger Ale' },
        ];
      
        const packSizeOptions = [
          { value: '250ml', label: '250ml' },
          { value: '500ml', label: '500ml' },
          { value: '1L', label: '1L' },
        ];
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
        };
      
        useEffect(() => {
          if (project && !id) {
            setFormData((prev) => ({
              ...prev,
              projectRequirements: project.projectRequirements?.[0] || {},
            }));
          } else if (id) {
            // If editing job
            dispatch(fetchjobById(id)).then((res) => {
              const fetchedProject = res.payload;
              if (fetchedProject) {
                setFormData({
                  ...fetchedProject,
                  projectRequirements: fetchedProject.projectRequirements?.[0] || {},
                });
              }
            });
          }
        }, [id, dispatch, project]);
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          if (id) {
            toast.info('Update logic not implemented in this code');
          } else {
            dispatch(createjob(formData))
              .unwrap()
              .then(() => {
                navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
                dispatch(fetchProject());
                toast.success('Project created successfully!');
              })
              .catch(() => {
                toast.error('Error creating project');
              });
          }
        };
      
        const handleCancel = () => {
          navigate('/projectList');
        };
      
        
        return (
          <>
            <ToastContainer />
            <div className="container mt-5">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h1 className="card-title h4 mb-4">Add New Jobs</h1>
                  <form className="row g-3" onSubmit={handleSubmit}>
                    {/* Project Name */}
                    <div className="col-md-6">
                      <label className="form-label">Project Name</label>
                      <select
                        name="projectsId"
                        className="form-control"
                        value={formData.projectsId}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Select a project
                        </option>
                        {project?.data?.map((project) => (
                          <option key={project._id} value={project._id}>
                            {project.projectName}
                          </option>
                        ))}
                      </select>
                    </div>
      
                    {/* Brand Name */}
                    <div className="col-md-6">
                      <label className="form-label">Brand Name</label>
                      <Select
                        options={brandOptions}
                        value={brandOptions.find((opt) => opt.value === formData.brandName)}
                        onChange={(option) =>
                          setFormData((prev) => ({ ...prev, brandName: option?.value || '' }))
                        }
                        isClearable
                      />
                    </div>
      
                    {/* Sub Brand */}
                    <div className="col-md-6">
                      <label className="form-label">Sub Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subBrand"
                        value={formData.subBrand}
                        onChange={handleChange}
                      />
                    </div>
      
                    {/* Flavour */}
                    <div className="col-md-6">
                      <label className="form-label">Flavour</label>
                      <Select
                        options={flavourOptions}
                        value={flavourOptions.find((opt) => opt.value === formData.flavour)}
                        onChange={(option) =>
                          setFormData((prev) => ({ ...prev, flavour: option?.value || '' }))
                        }
                        isClearable
                      />
                    </div>
      
                    {/* Pack Type */}
                    <div className="col-md-6">
                      <label className="form-label">Pack Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="packType"
                        value={formData.packType}
                        onChange={handleChange}
                      />
                    </div>
      
                    {/* Pack Size */}
                    <div className="col-md-6">
                      <label className="form-label">Pack Size</label>
                      <Select
                        options={packSizeOptions}
                        value={packSizeOptions.find((opt) => opt.value === formData.packSize)}
                        onChange={(option) =>
                          setFormData((prev) => ({ ...prev, packSize: option?.value || '' }))
                        }
                        isClearable
                      />
                    </div>
      
                    {/* Priority */}
                    <div className="col-md-6">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
      
                    {/* Status */}
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
      
                    {/* Total Time Logged */}
                    <div className="col-md-6">
                      <label className="form-label">Total Time Logged</label>
                      <input
                        type="time"
                        className="form-control"
                        name="totalTime"
                        value={formData.totalTime}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, totalTime: e.target.value }))
                        }
                      />
                    </div>
      
                    {/* assign */}
                    <div className="col-md-6">
                      <label className="form-label">Assign</label>
                      <select
                        className="form-select"
                        name="assign"
                        value={formData.assign}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Production">Production</option>
                        <option value="Designer">Designer</option>
                      </select>
                    </div>
      
                    {/* Barcode */}
                    <div className="col-md-1">
                      <Barcode value={formData.barcode} />
                    </div>
      
                    {/* Buttons */}
                    <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-dark">
                        Add Jobs
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        );
      }
      
      export default AddJobTracker;












       {/* {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJobs[job.jobNumber] || false}
                    onChange={() => handleCheckboxChange(job.jobNumber)}
                  />
                </td>
                <td>
                  <Link to={"/OvervieJobsTracker"}>{job.jobNumber}</Link>
                </td>
                <td>{job.projectName}</td>
                <td>{job.brandName}</td>
                <td>{job.subBrand}</td>
                <td>{job.flavour}</td>
                <td>{job.packType}</td>
                <td>{job.packSize}</td>
                <td>
                  <span className={getPriorityClass(job.priority)}>
                    {job.priority}
                  </span>
                </td>
                <td>
                  <span >
                    5\5\5\5
                  </span>
                </td>
                <th><span >
                  Designer
                </span></th>
                <td>{job.timeLogged}</td>
                <td>
                  <span
                    className={`badge ${getStatusClass(job.status)} px-2 py-1`}
                  >
                    {job.status}
                  </span>
                </td> */}
                {/* <td>{job.stage}</td> */}
                {/* <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm">
                      <FaFilePdf />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaUpload />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaLink />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaClock />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Link to={"/updateJobTracker"}>
                        <FaEdit />
                      </Link>
                    </Button> */}
                    {/* <Button variant="outline-secondary" size="sm">
                    <MdDeleteOutline />
                    </Button> */}
                  {/* </div>
                </td>
              </tr>
            ))} */}

             {/* <Button variant="outline-secondary" size="sm">
                    <MdDeleteOutline />
                    </Button> */}
      





















                    import axios from 'axios';
                    import React, { useEffect, useState } from 'react';
                    import { useLocation, useNavigate, useParams } from 'react-router-dom';
                    import { toast, ToastContainer } from 'react-toastify';
                    import 'react-toastify/dist/ReactToastify.css';
                    import Barcode from 'react-barcode';
                    import Select from 'react-select';
                    import { useDispatch, useSelector } from 'react-redux';
                    import { fetchProject } from '../../../redux/slices/ProjectsSlice';
                    import { createjob, fetchjobById, updatejob } from '../../../redux/slices/JobsSlice';
                    
                    
                    function AddJobTracker() {
                      const navigate = useNavigate();
                      const dispatch = useDispatch();
                      const { id } = useParams(); // for edit mode
                      const location = useLocation();
                      const { job } = location.state || {};
                    console.log(job);
                    
                      // All Projects
                      const { project, loading, error } = useSelector((state) => state.projects);
                    
                      useEffect(() => {
                        dispatch(fetchProject());
                      }, [dispatch]);
                    
                      const [formData, setFormData] = useState({
                        projectsId: '',
                        brandName: '',
                        subBrand: '',
                        flavour: '',
                        packType: '',
                        packSize: '',
                        priority: '',
                        Status: '',
                        totalTime: '',  
                        assign: '',
                        barcode:"POS-123456",  
                      });
                    
                      // Static options
                      const brandOptions = [
                        { value: 'Pepsi', label: 'Pepsi' },
                        { value: 'CocaCola', label: 'CocaCola' },
                        { value: 'Fanta', label: 'Fanta' },
                      ];
                    
                      const flavourOptions = [
                        { value: 'Orange', label: 'Orange' },
                        { value: 'Lime', label: 'Lime' },
                        { value: 'Ginger Ale', label: 'Ginger Ale' },
                      ];
                    
                      const packSizeOptions = [
                        { value: '250ml', label: '250ml' },
                        { value: '500ml', label: '500ml' },
                        { value: '1L', label: '1L' },
                      ];
                    
                      const handleChange = (e) => {
                        const { name, value } = e.target;
                        setFormData((prev) => ({ ...prev, [name]: value }));
                      };
                    
                      // const handleSubmit = async (e) => {
                      //   e.preventDefault();
                      //   console.log("Form Data Submitted:", formData);
                      //   dispatch(createjob(formData))
                      // };
                    
                    
                      // useEffect(() => {
                      //   if (job) {
                      //     setFormData((prev) => ({
                      //       ...prev,
                      //       ...job,
                      //       projectsId: job.project?._id || job.project?.projectId || '', 
                      //     }));
                      //   } else if (id) {
                      //     dispatch(fetchjobById(id)).then((res) => {
                      //       const fetchedJob = res.payload;
                      //       if (fetchedJob) {
                      //         setFormData((prev) => ({
                      //           ...prev,
                      //           ...fetchedJob,
                      //           projectsId: fetchedJob.project?._id || fetchedJob.project?.projectId || '', 
                      //         }));
                      //       }
                      //     });
                      //   }
                      // }, [id, job, dispatch]);
                      useEffect(() => {
                        if (job) {
                          setFormData((prev) => ({
                            ...prev,
                            ...job,
                            projectsId: Array.isArray(job.projectsId)
                              ? (typeof job.projectsId[0] === 'object' ? job.projectsId[0]._id : job.projectsId[0])
                              : job.project?._id || job.project?.projectId || '',
                          }));
                        } else if (id) {
                          dispatch(fetchjobById(id)).then((res) => {
                            const fetchedJob = res.payload;
                            if (fetchedJob) {
                              setFormData((prev) => ({
                                ...prev,
                                ...fetchedJob,
                                projectsId: Array.isArray(fetchedJob.projectsId)
                                  ? (typeof fetchedJob.projectsId[0] === 'object' ? fetchedJob.projectsId[0]._id : fetchedJob.projectsId[0])
                                  : fetchedJob.project?._id || fetchedJob.project?.projectId || '',
                              }));
                            }
                          });
                        }
                      }, [id, job, dispatch]);
                      
                      
                      
                    
                      const handleInputChange = (e) => {
                        const { name, value } = e.target;
                        setFormData(prev => ({
                          ...prev,
                          [name]: value
                        }));
                      };
                      const handleSubmit = (e) => {
                        e.preventDefault();
                      
                        // Wrap projectsId as array
                        const payload = {
                          ...formData,
                          projectsId: [formData.projectsId],  // convert to array
                        };
                      
                        if (id) {
                          dispatch(updatejob({ id, data: payload }))
                            .unwrap()
                            .then(() => {
                              toast.success("Job updated successfully!");
                              navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
                              dispatch(fetchProject());
                            })
                            .catch(() => {
                              toast.error("Failed to update job!");
                            });
                        } else {
                          dispatch(createjob(payload))  // send payload with array
                            .unwrap()
                            .then(() => {
                              toast.success("Job created successfully!");
                              navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
                              dispatch(fetchProject());
                            })
                            .catch(() => {
                              toast.error("Error creating job");
                            });
                        }
                      };
                      
                    
                    // 
                        const handleCancel = () => {
                          navigate("/projectList");
                        }
                        const Cancel =()=>{
                          navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
                        }
                      return (
                        <>
                          <ToastContainer />
                          <div className="container mt-5">
                            <div className="card shadow-sm">
                              <div className="card-body">
                                <h1 className="card-title h4 mb-4">Add New Jobs</h1>
                                <form className="row g-3" onSubmit={handleSubmit}>
                    
                                  {/* Project Name */}
                                  <div className="col-md-6">
                                    <label className="form-label">Project Name</label>
                                    <select
                                      name="projectsId"
                                      className="form-control"
                                      value={formData.projectsId}
                                      onChange={handleChange}
                                    >
                                      <option value="" disabled>Select a project</option>
                                      {project?.data?.map((project) => (
                                        <option key={project._id} value={project._id}>
                                          {project.projectName}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                    
                                  {/* Brand Name */}
                                  <div className="col-md-6">
                                    <label className="form-label">Brand Name</label>
                                    <Select
                                      options={brandOptions}
                                      value={brandOptions.find(opt => opt.value === formData.brandName)}
                                      onChange={(option) =>
                                        setFormData((prev) => ({ ...prev, brandName: option?.value || '' }))
                                      }
                                      isClearable
                                    />
                                  </div>
                    
                                  {/* Sub Brand */}
                                  <div className="col-md-6">
                                    <label className="form-label">Sub Brand</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="subBrand"
                                      value={formData.subBrand}
                                      onChange={handleChange}
                                    />
                                  </div>
                    
                                  {/* Flavour */}
                                  <div className="col-md-6">
                                    <label className="form-label">Flavour</label>
                                    <Select
                                      options={flavourOptions}
                                      value={flavourOptions.find(opt => opt.value === formData.flavour)}
                                      onChange={(option) =>
                                        setFormData((prev) => ({ ...prev, flavour: option?.value || '' }))
                                      }
                                      isClearable
                                    />
                                  </div>
                    
                                  {/* Pack Type */}
                                  <div className="col-md-6">
                                    <label className="form-label">Pack Type</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="packType"
                                      value={formData.packType}
                                      onChange={handleChange}
                                    />
                                  </div>
                    
                                  {/* Pack Size */}
                                  <div className="col-md-6">
                                    <label className="form-label">Pack Size</label>
                                    <Select
                                      options={packSizeOptions}
                                      value={packSizeOptions.find(opt => opt.value === formData.packSize)}
                                      onChange={(option) =>
                                        setFormData((prev) => ({ ...prev, packSize: option?.value || '' }))
                                      }
                                      isClearable
                                    />
                                  </div>
                    
                                  {/* Priority */}
                                  <div className="col-md-6">
                                    <label className="form-label">Priority</label>
                                    <select
                                      className="form-select"
                                      name="priority"
                                      value={formData.priority}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="low">Low</option>
                                      <option value="medium">Medium</option>
                                      <option value="high">High</option>
                                    </select>
                                  </div>
                    
                                  {/* Status */}
                                  <div className="col-md-6">
                                    <label className="form-label">Status</label>
                                    <select
                                      className="form-select"
                                      name="Status"
                                      value={formData.Status}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="open">Open</option>
                                      <option value="in_progress">In Progress</option>
                                      <option value="completed">Completed</option>
                                    </select>
                                  </div>
                    
                                  {/* Total Time Logged */}
                                  <div className="col-md-6">
                                    <label className="form-label">Total Time Logged</label>
                                    <input
                                      type="time"
                                      className="form-control"
                                      name="totalTime"
                                      value={formData.totalTime}
                                      onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, totalTime: e.target.value }))
                                      }
                                    />
                                  </div>
                    
                                  {/* assign */}
                                  <div className="col-md-6">
                                    <label className="form-label">assign</label>
                                    <select
                                      className="form-select"
                                      name="assign"
                                      value={formData.assign}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="Production">Production</option>
                                      <option value="Designer">Designer</option>
                                    </select>
                                  </div>
                    
                                  {/* Barcode */}
                                  <div className="col-md-1">
                                    <Barcode value="POS-123456" />
                                  </div>
                    
                                  {/* Buttons */}
                                  <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                                    <button type="button" className="btn btn-outline-secondary" onClick={()=>Cancel()}>Cancel</button>
                                    <button type="submit" className="btn btn-dark">Add Jobs</button>
                                  </div>
                    
                                </form>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                    
                    export default AddJobTracker;














                    import React, { useEffect, useState } from 'react';
                    import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
                    import { Modal, Form, Button } from 'react-bootstrap';
                    import { useDispatch, useSelector } from 'react-redux';
                    import { deletejob, fetchjobs, UpdateJobAssign } from '../../../../redux/slices/JobsSlice';
                    import Swal from 'sweetalert2';
                    
                    function ProjectJobsTab() {
                      const [selectedProduction, setSelectedProduction] = useState('');
                      const [selectedAdditional, setSelectedAdditional] = useState('');
                      const [selectedJob, setSelectedJob] = useState(null);
                      const [attachedFile, setAttachedFile] = useState(null);
                      const [selectedJobs, setSelectedJobs] = useState({});
                      const [errorMessage, setErrorMessage] = useState('');
                    
                      const [showAssignModal, setShowAssignModal] = useState(false);
                      const [selectedDesigner, setSelectedDesigner] = useState('');
                      const [assignmentDescription, setAssignmentDescription] = useState('');
                    
                      const jobs = [
                        {
                          id: "00001",
                          brandName: "Brand1",
                          subBrand: "SubBrand1",
                          flavour: "Flavour1",
                          packType: "Type1",
                          packSize: "Size 1ml",
                          packCode: "Code1",
                          deadline: "2024/01/20",
                          brief: "ViewBrief",
                          status: "Pending Upload",
                          statusVariant: "warning",
                        },
                        {
                          id: "00002",
                          brandName: "Brand2",
                          subBrand: "SubBrand2",
                          flavour: "Flavour2",
                          packType: "Type2",
                          packSize: "Size 2ml",
                          packCode: "Code2",
                          deadline: "2024/01/25",
                          brief: "ViewBrief",
                          status: "In Progress",
                          statusVariant: "info",
                        },
                        {
                          id: "00003",
                          brandName: "Brand3",
                          subBrand: "SubBrand3",
                          flavour: "Flavour3",
                          packType: "Type3",
                          packSize: "Size 3ml",
                          packCode: "Code3",
                          deadline: "2024/02/01",
                          brief: "ViewBrief",
                          status: "DraftSaved",
                          statusVariant: "secondary",
                        },
                      ];
                    
                      const handleCheckboxChange = (jobId) => {
                        setSelectedJobs((prev) => ({
                          ...prev,
                          [jobId]: !prev[jobId],
                        }));
                      };
                    
                      const handleSubmitAssignment = () => {
                        const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
                    
                        if (selectedJobIds.length === 0) {
                          setErrorMessage("Please select at least 1 job to assign.");
                          setTimeout(() => setErrorMessage(""), 3000);
                          return;
                        }
                    
                        if (!selectedDesigner) {
                          setErrorMessage("Please select a designer.");
                          setTimeout(() => setErrorMessage(""), 3000);
                          return;
                        }
                    
                        // ✅ Now send data to handleJobAssign
                        handleJobAssign(selectedJobIds, selectedDesigner);
                    
                        // Reset state and close modal
                        setShowAssignModal(false);
                        setSelectedProduction('');
                        setSelectedAdditional('');
                        setSelectedJob(null);
                        setSelectedDesigner('');
                        setAssignmentDescription('');
                      };
                    
                      const handleCSVImport = (event) => {
                        const file = event.target.files[0];
                        if (file) {
                          console.log("CSV file selected:", file.name);
                        }
                      };
                    
                      const getPriorityClass = (priority) => {
                        switch (priority.toLowerCase()) {
                          case "high":
                            return "text-danger";
                          case "medium":
                            return "text-warning";
                          case "low":
                            return "text-success";
                          default:
                            return "";
                        }
                      };
                      // ////////////////////////////////////////
                      const navigate = useNavigate();
                      const dispatch = useDispatch();
                      const location = useLocation();
                      const params = useParams();
                      const id = location.state?.id || params.id;
                      useEffect(() => {
                        console.log("Project ID:", id);
                      }, [id]);
                    
                      const { job } = useSelector((state) => state.jobs);
                      console.log(job.jobs, "all jobs");
                    
                      useEffect(() => {
                        dispatch(fetchjobs());
                      }, [dispatch]);
                    
                    
                      const handleDelete = (_id) => {
                        console.log(_id);
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(deletejob(_id))
                              .then(() => {
                                Swal.fire("Deleted!", "The document has been deleted.", "success");
                                dispatch(fetchjobs());
                              })
                              .catch(() => {
                                Swal.fire("Error!", "Something went wrong.", "error");
                              });
                          }
                        });
                      }
                    
                    
                      const handleUpdate = (job) => {
                        navigate(`/AddJobTracker`, { state: { job } });
                      };
                    
                      const JobDetails = (job) => {
                        navigate(`/OvervieJobsTracker`, { state: { job } });
                      }
                    
                    
                      const getStatusClass = (status) => {
                        switch (status.toLowerCase().trim()) {
                          case "in progress":
                          case "in_progress":
                            return "bg-warning text-dark";
                          case "review":
                            return "bg-info text-dark";
                          case "not started":
                            return "bg-secondary text-white";
                          case "completed":
                            return "bg-success text-white";
                          case "open":
                            return "bg-primary text-white";
                          default:
                            return "bg-light text-dark";
                        }
                      };
                    
                     const handleJobAssign = (selectedIds, assignTo) => {
                     
                      const payload = {
                        id: selectedIds,
                        assign: assignTo,
                      };
                      console.log("Assignment Payload:", payload);
                      dispatch(UpdateJobAssign(payload))
                      .then(() => {
                          // Swal.fire("Success!", "Jobs assigned successfully", "success");
                          dispatch(fetchjobs());
                        })
                        .catch(() => {
                          Swal.fire("Error!", "Something went wrong", "error");
                        });
                    };
                    
                    return (
                        <div className="card">
                          <div className="card-header d-flex align-content-center justify-content-between mt-3">
                            <h5 className="card-title mb-0">Jobs List</h5>
                            <div className="text-end">
                              {/* ✅ Assign Button always enabled, shows error if none selected */}
                              <Button
                                id="All_btn"
                                className="m-2"
                                variant="primary"
                                onClick={() => {
                                  const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
                                  if (selectedJobIds.length === 0) {
                                    setErrorMessage("Please select at least 1 job to assign.");
                                    setTimeout(() => setErrorMessage(""), 3000);
                                  } else {
                                    handleJobAssign(selectedJobIds); // ✅ Call with selected IDs
                                    setShowAssignModal(true);
                                  }
                                }}
                              >
                                Assign
                              </Button>
                    
                    
                              <label className="btn btn-success m-2">
                                <i className="bi bi-upload"></i> Import CSV
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={handleCSVImport}
                                  hidden
                                />
                              </label>
                    
                              <Link to={"/AddJobTracker"}>
                                <button id='All_btn' className="btn btn-primary">
                                  <i className="bi bi-plus"></i> Add New
                                </button>
                              </Link>
                            </div>
                          </div>
                    
                          <div className="card-body">
                            {/* ✅ Error message block */}
                            {errorMessage && (
                              <div className="alert alert-danger py-2" role="alert">
                                {errorMessage}
                              </div>
                            )}
                    
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>
                                      <input
                                        type="checkbox"
                                        onChange={() => {
                                          const isChecked = Object.keys(selectedJobs).length === jobs.length;
                                          const newSelectedJobs = {};
                                          jobs.forEach((job) => {
                                            newSelectedJobs[job.id] = !isChecked;
                                          });
                                          setSelectedJobs(newSelectedJobs);
                                        }}
                                      />
                                    </th>
                                    <th>JobsNo</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
                                    <th>Brand</th>
                                    <th>SubBrand</th>
                                    <th>Flavour</th>
                                    <th>PackType</th>
                                    <th>PackSize</th>
                                    <th>Priority</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Due Date</th>
                                    <th>Assing</th>
                                    <th>TotalTime</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {job?.jobs?.slice().reverse().map((job, index) => (
                                    <tr key={job._id}>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={selectedJobs[job._id] || false}
                                          onChange={() => handleCheckboxChange(job._id)}
                                        />
                                      </td>
                                      <td>
                                        <Link>
                                          {String(index + 1).padStart(4, '0')}
                                        </Link>
                                      </td>
                                      <td>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                                      <td>{job.brandName}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
                                      <td>{job.packType}</td>
                                      <td>{job.packSize}</td>
                                      <td>
                                        <span className={getPriorityClass(job.priority)}>
                                          {job.priority}
                                        </span>
                                      </td>
                                      <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                                      <td>{job.assign}</td>
                                      <td>{job.totalTime}</td>
                                      {/* <th>
                                        <Button id='All_btn' variant="success" style={{ width: "130px" }} size="sm" >
                                          {job.Status || "Active"}
                                        </Button></th> */}
                                      <td>
                                        <span
                                          className={`badge ${getStatusClass(job.Status)} px-2 py-1`}
                                        >
                                          {job.Status}
                                        </span>
                                      </td>
                                      <td className="d-flex">
                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => JobDetails(job)}>
                                          <i className="bi bi-eye"></i> View
                                        </button>
                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleUpdate(job)}>
                                          <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job._id)}>
                                          <i className="bi bi-trash"></i> Delete
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                    
                          {/* ✅ Job Assignment Modal */}
                          <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Assign Job</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>Select Designer</Form.Label>
                                  <Form.Select
                                    value={selectedDesigner}
                                    onChange={(e) => setSelectedDesigner(e.target.value)}
                                  >
                                    <option value="">-- Select --</option>
                                    <option value="production">Production</option>
                                    <option value="designer">Designer</option>
                                  </Form.Select>
                                </Form.Group>
                    
                                <Form.Group className="mb-3">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={assignmentDescription}
                                    onChange={(e) => setAssignmentDescription(e.target.value)}
                                    placeholder="Enter assignment details or instructions..."
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={handleSubmitAssignment}>
                                Assign
                              </Button>
                            </Modal.Footer>
                          </Modal>
                    
                        </div>
                      );
                    }
                    
                    export default ProjectJobsTab;
                    
                    





                    import React, { useEffect, useState } from 'react';
                    import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
                    import { Modal, Form, Button } from 'react-bootstrap';
                    import { useDispatch, useSelector } from 'react-redux';
                    import { deletejob, fetchjobs, UpdateJobAssign } from '../../../../redux/slices/JobsSlice';
                    import Swal from 'sweetalert2';
                    
                    function ProjectJobsTab() {
                      const [selectedProduction, setSelectedProduction] = useState('');
                      const [selectedAdditional, setSelectedAdditional] = useState('');
                      const [selectedJob, setSelectedJob] = useState(null);
                      const [attachedFile, setAttachedFile] = useState(null);
                      const [selectedJobs, setSelectedJobs] = useState({});
                      const [errorMessage, setErrorMessage] = useState('');
                    
                      const [showAssignModal, setShowAssignModal] = useState(false);
                      const [selectedDesigner, setSelectedDesigner] = useState('');
                      const [assignmentDescription, setAssignmentDescription] = useState('');
                    
                      const jobs = [
                        {
                          id: "00001",
                          brandName: "Brand1",
                          subBrand: "SubBrand1",
                          flavour: "Flavour1",
                          packType: "Type1",
                          packSize: "Size 1ml",
                          packCode: "Code1",
                          deadline: "2024/01/20",
                          brief: "ViewBrief",
                          status: "Pending Upload",
                          statusVariant: "warning",
                        },
                        {
                          id: "00002",
                          brandName: "Brand2",
                          subBrand: "SubBrand2",
                          flavour: "Flavour2",
                          packType: "Type2",
                          packSize: "Size 2ml",
                          packCode: "Code2",
                          deadline: "2024/01/25",
                          brief: "ViewBrief",
                          status: "In Progress",
                          statusVariant: "info",
                        },
                        {
                          id: "00003",
                          brandName: "Brand3",
                          subBrand: "SubBrand3",
                          flavour: "Flavour3",
                          packType: "Type3",
                          packSize: "Size 3ml",
                          packCode: "Code3",
                          deadline: "2024/02/01",
                          brief: "ViewBrief",
                          status: "DraftSaved",
                          statusVariant: "secondary",
                        },
                      ];
                    
                      const handleCheckboxChange = (jobId) => {
                        setSelectedJobs((prev) => ({
                          ...prev,
                          [jobId]: !prev[jobId],
                        }));
                      };
                    
                      const handleSubmitAssignment = () => {
                        const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
                    
                        if (selectedJobIds.length === 0) {
                          setErrorMessage("Please select at least 1 job to assign.");
                          setTimeout(() => setErrorMessage(""), 3000);
                          return;
                        }
                    
                        if (!selectedDesigner) {
                          setErrorMessage("Please select a designer.");
                          setTimeout(() => setErrorMessage(""), 3000);
                          return;
                        }
                    
                        // ✅ Now send data to handleJobAssign
                        handleJobAssign(selectedJobIds, selectedDesigner);
                    
                        // Reset state and close modal
                        setShowAssignModal(false);
                        setSelectedProduction('');
                        setSelectedAdditional('');
                        setSelectedJob(null);
                        setSelectedDesigner('');
                        setAssignmentDescription('');
                      };
                    
                      const handleCSVImport = (event) => {
                        const file = event.target.files[0];
                        if (file) {
                          console.log("CSV file selected:", file.name);
                        }
                      };
                    
                      const getPriorityClass = (priority) => {
                        switch (priority.toLowerCase()) {
                          case "high":
                            return "text-danger";
                          case "medium":
                            return "text-warning";
                          case "low":
                            return "text-success";
                          default:
                            return "";
                        }
                      };
                      // ////////////////////////////////////////
                      const navigate = useNavigate();
                      const dispatch = useDispatch();
                      const location = useLocation();
                      const params = useParams();
                      const id = location.state?.id || params.id;
                      useEffect(() => {
                        console.log("Project ID:", id);
                      }, [id]);
                    
                      const { job } = useSelector((state) => state.jobs);
                      console.log(job.jobs, "all jobs");
                    
                      useEffect(() => {
                        dispatch(fetchjobs());
                      }, [dispatch]);
                    
                    
                      const handleDelete = (_id) => {
                        console.log(_id);
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(deletejob(_id))
                              .then(() => {
                                Swal.fire("Deleted!", "The document has been deleted.", "success");
                                dispatch(fetchjobs());
                              })
                              .catch(() => {
                                Swal.fire("Error!", "Something went wrong.", "error");
                              });
                          }
                        });
                      }
                    
                    
                      const handleUpdate = (job) => {
                        navigate(`/AddJobTracker`, { state: { job } });
                      };
                    
                      const JobDetails = (job) => {
                        navigate(`/OvervieJobsTracker`, { state: { job } });
                      }
                    
                    
                      const getStatusClass = (status) => {
                        switch (status.toLowerCase().trim()) {
                          case "in progress":
                          case "in_progress":
                            return "bg-warning text-dark";
                          case "review":
                            return "bg-info text-dark";
                          case "not started":
                            return "bg-secondary text-white";
                          case "completed":
                            return "bg-success text-white";
                          case "open":
                            return "bg-primary text-white";
                          default:
                            return "bg-light text-dark";
                        }
                      };
                    
                      const handleJobAssign = (selectedIds, assignTo) => {
                    
                        const payload = {
                          id: selectedIds,
                          assign: assignTo,
                        };
                        console.log("Assignment Payload:", payload);
                        dispatch(UpdateJobAssign(payload))
                          .then(() => {
                            // Swal.fire("Success!", "Jobs assigned successfully", "success");
                            dispatch(fetchjobs());
                          })
                          .catch(() => {
                            Swal.fire("Error!", "Something went wrong", "error");
                          });
                      };
                    
                      return (
                        <div className="card">
                          <div className="card-header d-flex align-content-center justify-content-between mt-3">
                            <h5 className="card-title mb-0">Jobs List</h5>
                            <div className="text-end">
                              {/* ✅ Assign Button always enabled, shows error if none selected */}
                              <Button
                                id="All_btn"
                                className="m-2"
                                variant="primary"
                                onClick={() => {
                                  const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
                                  if (selectedJobIds.length === 0) {
                                    setErrorMessage("Please select at least 1 job to assign.");
                                    setTimeout(() => setErrorMessage(""), 3000);
                                  } else {
                                    handleJobAssign(selectedJobIds); // ✅ Call with selected IDs
                                    setShowAssignModal(true);
                                  }
                                }}
                              >
                                Assign
                              </Button>
                    
                    
                              <label className="btn btn-success m-2">
                                <i className="bi bi-upload"></i> Import CSV
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={handleCSVImport}
                                  hidden
                                />
                              </label>
                    
                              <Link to={"/AddJobTracker"}>
                                <button id='All_btn' className="btn btn-primary">
                                  <i className="bi bi-plus"></i> Add New
                                </button>
                              </Link>
                            </div>
                          </div>
                    
                          <div className="card-body">
                            {/* ✅ Error message block */}
                            {errorMessage && (
                              <div className="alert alert-danger py-2" role="alert">
                                {errorMessage}
                              </div>
                            )}
                    
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>
                                      <input
                                        type="checkbox"
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          const newSelectedJobs = {};
                                          job?.jobs?.forEach((job) => {
                                            newSelectedJobs[job._id] = checked;
                                          });
                                          setSelectedJobs(newSelectedJobs);
                                        }}
                                        checked={
                                          job?.jobs?.length > 0 &&
                                          job?.jobs?.every((j) => selectedJobs[j._id])
                                        }
                                      />
                                    </th>
                    
                                    <th>JobsNo</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
                                    <th>Brand</th>
                                    <th>SubBrand</th>
                                    <th>Flavour</th>
                                    <th>PackType</th>
                                    <th>PackSize</th>
                                    <th>Priority</th>
                                    <th style={{ whiteSpace: 'nowrap' }}>Due Date</th>
                                    <th>Assing</th>
                                    <th>TotalTime</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {job?.jobs?.slice().reverse().map((job, index) => (
                                    <tr key={job._id}>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={selectedJobs[job._id] || false}
                                          onChange={() => handleCheckboxChange(job._id)}
                                        />
                                      </td>
                                      <td>
                                        <Link>
                                          {String(index + 1).padStart(4, '0')}
                                        </Link>
                                      </td>
                                      <td>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                                      <td>{job.brandName}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
                                      <td>{job.packType}</td>
                                      <td>{job.packSize}</td>
                                      <td>
                                        <span className={getPriorityClass(job.priority)}>
                                          {job.priority}
                                        </span>
                                      </td>
                                      <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                                      <td>{job.assign}</td>
                                      <td>{job.totalTime}</td>
                                      {/* <th>
                                        <Button id='All_btn' variant="success" style={{ width: "130px" }} size="sm" >
                                          {job.Status || "Active"}
                                        </Button></th> */}
                                      <td>
                                        <span
                                          className={`badge ${getStatusClass(job.Status)} px-2 py-1`}
                                        >
                                          {job.Status}
                                        </span>
                                      </td>
                                      <td className="d-flex">
                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => JobDetails(job)}>
                                          <i className="bi bi-eye"></i> View
                                        </button>
                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleUpdate(job)}>
                                          <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job._id)}>
                                          <i className="bi bi-trash"></i> Delete
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                    
                          {/* ✅ Job Assignment Modal */}
                          <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Assign Job</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className="mb-3">
                                  <Form.Label>Select Designer</Form.Label>
                                  <Form.Select
                                    value={selectedDesigner}
                                    onChange={(e) => setSelectedDesigner(e.target.value)}
                                  >
                                    <option value="">-- Select --</option>
                                    <option value="Production">Production</option>
                                    <option value="Designer">Designer</option>
                                  </Form.Select>
                                </Form.Group>
                    
                                <Form.Group className="mb-3">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={assignmentDescription}
                                    onChange={(e) => setAssignmentDescription(e.target.value)}
                                    placeholder="Enter assignment details or instructions..."
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={handleSubmitAssignment}>
                                Assign
                              </Button>
                            </Modal.Footer>
                          </Modal>
                    
                        </div>
                      );
                    }
                    
                    export default ProjectJobsTab;
                    




























                    // import axios from 'axios';
                    // import React, { useState } from 'react';
                    // import Base_Url from '../../ApiUrl/ApiUrl';
                    // import { useNavigate } from 'react-router-dom';
                    // import { toast, ToastContainer } from 'react-toastify';
                    // import 'react-toastify/dist/ReactToastify.css';
                    // function AddClientManagement() {
                    //   const navigate = useNavigate();
                    //   const [formData, setFormData] = useState({
                    //     clientName: '',
                    //     industry: '',
                    //     clientWebsite: '',
                    //     clientAddress: '',
                    //     vatNumber: '',
                    //     csrCode: '',
                    //     clientStatus: 'active',
                    //     contactNumber: '',
                    //     jobTitle: '',
                    //     email: '',
                    //     phone: '',
                    //     department: '',
                    //     salesRepresentative: '',
                    //     billingAddress: '',
                    //     billingContact: '',
                    //     billingEmail: '',
                    //     billingPhone: '',
                    //     currency: 'USD',
                    //     paymentMethod: 'bank_transfer',
                    //     shippingAddress: '',
                    //     shippingContact: '',
                    //     shippingEmail: '',
                    //     shippingPhone: '',
                    //     shippingMethod: 'standard',
                    //     specialInstruction: '',
                    //     annualRevenue: '',
                    //     creditRating: '',
                    //     bankName: '',
                    //     accountNumber: '',
                    //     fiscalYearEnd: '',
                    //     financialContact: '',
                    //     accountCode: '',
                    //     accountType: 'receivable',
                    //     openingBalance: '',
                    //     balanceDate: '',
                    //     taxCategory: 'standard',
                    //     costCenter: '',
                    //     paymentTerms: 'net30',
                    //     creditLimit: '',
                    //     notes: ''
                    //   });
                    
                    //   const handleChange = (e) => {
                    //     const { name, value } = e.target;
                    //     setFormData((prev) => ({ ...prev, [name]: value }));
                    //   };
                    
                    //   const handleSubmit = async (e) => {
                    //     e.preventDefault();
                    //     try {
                    //       const res = await axios.post(`${Base_Url}/client/createClient`, formData);
                    //       console.log('Client Submitted:', res.data);
                      
                    //       toast.success('Client created successfully!'); // optional toast
                      
                    //       // Reset the form
                    //       setFormData({
                    //         clientName: '',
                    //         industry: '',
                    //         clientWebsite: '',
                    //         clientAddress: '',
                    //         vatNumber: '',
                    //         csrCode: '',
                    //         clientStatus: 'active',
                    //         contactNumber: '',
                    //         jobTitle: '',
                    //         email: '',
                    //         phone: '',
                    //         department: '',
                    //         salesRepresentative: '',
                    //         billingAddress: '',
                    //         billingContact: '',
                    //         billingEmail: '',
                    //         billingPhone: '',
                    //         currency: 'USD',
                    //         paymentMethod: 'bank_transfer',
                    //         shippingAddress: '',
                    //         shippingContact: '',
                    //         shippingEmail: '',
                    //         shippingPhone: '',
                    //         shippingMethod: 'standard',
                    //         specialInstruction: '',
                    //         annualRevenue: '',
                    //         creditRating: '',
                    //         bankName: '',
                    //         accountNumber: '',
                    //         fiscalYearEnd: '',
                    //         financialContact: '',
                    //         accountCode: '',
                    //         accountType: 'receivable',
                    //         openingBalance: '',
                    //         balanceDate: '',
                    //         taxCategory: 'standard',
                    //         costCenter: '',
                    //         paymentTerms: 'net30',
                    //         creditLimit: '',
                    //         notes: ''
                    //       });
                      
                    //       // Navigate to clientManagement page after delay (optional)
                    //       setTimeout(() => {
                    //         navigate('/clientManagement');
                    //       }, 1000); // delay for smoother transition
                    //     } catch (err) {
                    //       console.error('Submit Error:', err);
                    //       toast.error('Failed to create client.');
                    //     }
                    //   };
                    
                    //   return (
                    //     <>
                    //     <ToastContainer/>
                    //     <div className="container mt-5">
                    //       <div className="card shadow-sm">
                    //         <div className="card-body">
                    //           <h1 className="card-title h4 mb-4">Add Company</h1>   
                    //           <form className="row g-3" onSubmit={handleSubmit}>
                    //           <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
                    //            <div className='col-md-3'>
                               
                               
                    //               <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
                                
                    //                 <option value="Client">Client</option>
                    //                 <option value="Sup">Suppliers</option>
                    //                 <option value="Other">Other</option>
                    //               </select></div>  <div className="col-md-6"></div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Name</label>
                    //               <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="form-control" placeholder="Enter  name" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Industry</label>
                    //               <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
                    //                 <option value="">Select industry</option>
                    //                 <option value="manufacturing">Manufacturing</option>
                    //                 <option value="tech">Technology</option>
                    //                 <option value="retail">Retail</option>
                    //               </select>
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Website</label>
                    //               <input type="url" name="clientWebsite" value={formData.clientWebsite} onChange={handleChange} className="form-control" placeholder="https://" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Client Address</label>
                    //               <textarea className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
                    //             </div>  
                    //             <div className="col-md-6">
                    //               <label className="form-label">Tax ID/VAT Number</label>
                    //               <input type="text" name="vatNumber" value={formData.vatNumber} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">CSR Code</label>
                    //               <input type="text" name="csrCode" value={formData.csrCode} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Status</label>
                    //               <select className="form-select" name="clientStatus" value={formData.clientStatus} onChange={handleChange}>
                    //                 <option value="active">Active</option>
                    //                 <option value="inactive">Inactive</option>
                    //               </select>
                    //             </div>
                    
                    //             <h5 className="mb-3 mt-4">Primary Contact</h5>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Contact Name</label>
                    //               <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Job Title</label>
                    //               <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Email</label>
                    //               <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Phone</label>
                    //               <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Department</label>
                    //               <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" />
                    //             </div>
                    //             <div className="col-md-6">
                    //               <label className="form-label">Sales Representative</label>
                    //               <input type="text" name="salesRepresentative" value={formData.salesRepresentative} onChange={handleChange} className="form-control" />
                    //             </div>
                    //   {/* Billing Information */}
                    // <h5 className="mb-3 mt-4">Billing Information</h5>
                    // <div className="col-md-12">
                    //   <label className="form-label">Billing Address</label>
                    //   <textarea className="form-control" rows="3" name="billingAddress" value={formData.billingAddress} onChange={handleChange}></textarea>
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Billing Contact Name</label>
                    //   <input type="text" className="form-control" name="billingContact" value={formData.billingContact} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Billing Email</label>
                    //   <input type="email" className="form-control" name="billingEmail" value={formData.billingEmail} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Billing Phone</label>
                    //   <input type="tel" className="form-control" name="billingPhone" value={formData.billingPhone} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Currency</label>
                    //   <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
                    //     <option value="USD">USD</option>
                    //     <option value="EUR">EUR</option>
                    //     <option value="GBP">GBP</option>
                    //   </select>
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Preferred Payment Method</label>
                    //   <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                    //     <option value="bank_transfer">Bank Transfer</option>
                    //     <option value="credit_card">Credit Card</option>
                    //     <option value="check">Check</option>
                    //   </select>
                    // </div>
                    
                    // {/* Shipping Information */}
                    // <h5 className="mb-3 mt-4">Shipping Information</h5>
                    // <div className="col-md-12">
                    //   <label className="form-label">Shipping Address</label>
                    //   <textarea className="form-control" rows="3" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange}></textarea>
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Shipping Contact Name</label>
                    //   <input type="text" className="form-control" name="shippingContact" value={formData.shippingContact} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Shipping Email</label>
                    //   <input type="email" className="form-control" name="shippingEmail" value={formData.shippingEmail} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Shipping Phone</label>
                    //   <input type="tel" className="form-control" name="shippingPhone" value={formData.shippingPhone} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Preferred Shipping Method</label>
                    //   <select className="form-select" name="shippingMethod" value={formData.shippingMethod} onChange={handleChange}>
                    //     <option value="standard">Standard Ground</option>
                    //     <option value="express">Express</option>
                    //     <option value="overnight">Overnight</option>
                    //   </select>
                    // </div>
                    // <div className="col-md-12">
                    //   <label className="form-label">Special Instructions</label>
                    //   <textarea className="form-control" rows="3" name="specialInstruction" value={formData.specialInstruction} onChange={handleChange}></textarea>
                    // </div>
                    
                    // {/* Financial Information */}
                    // <h5 className="mb-3 mt-4">Financial Information</h5>
                    // <div className="col-md-6">
                    //   <label className="form-label">Annual Revenue</label>
                    //   <input type="number" className="form-control" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Credit Rating</label>
                    //   <input type="text" className="form-control" name="creditRating" value={formData.creditRating} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Bank Name</label>
                    //   <input type="text" className="form-control" name="bankName" value={formData.bankName} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Account Number</label>
                    //   <input type="text" className="form-control" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Fiscal Year End</label>
                    //   <input type="date" className="form-control" name="fiscalYearEnd" value={formData.fiscalYearEnd} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Financial Contact</label>
                    //   <input type="text" className="form-control" name="financialContact" value={formData.financialContact} onChange={handleChange} />
                    // </div>
                    
                    // {/* Ledger Information */}
                    // <h5 className="mb-3 mt-4">Ledger Information</h5>
                    // <div className="col-md-6">
                    //   <label className="form-label">Account Code</label>
                    //   <input type="text" className="form-control" name="accountCode" value={formData.accountCode} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Account Type</label>
                    //   <select className="form-select" name="accountType" value={formData.accountType} onChange={handleChange}>
                    //     <option value="receivable">Accounts Receivable</option>
                    //     <option value="payable">Accounts Payable</option>
                    //   </select>
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Opening Balance</label>
                    //   <input type="number" className="form-control" name="openingBalance" value={formData.openingBalance} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Balance Date</label>
                    //   <input type="date" className="form-control" name="balanceDate" value={formData.balanceDate} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Tax Category</label>
                    //   <select className="form-select" name="taxCategory" value={formData.taxCategory} onChange={handleChange}>
                    //     <option value="standard">Standard Rate</option>
                    //     <option value="reduced">Reduced Rate</option>
                    //     <option value="zero">Zero Rate</option>
                    //   </select>
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Cost Center</label>
                    //   <input type="text" className="form-control" name="costCenter" value={formData.costCenter} onChange={handleChange} />
                    // </div>
                    
                    // {/* Additional Information */}
                    // <h5 className="mb-3 mt-4">Additional Information</h5>
                    // <div className="col-md-6">
                    //   <label className="form-label">Payment Terms</label>
                    //   <select className="form-select" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange}>
                    //     <option value="net30">Net 30</option>
                    //     <option value="net60">Net 60</option>
                    //     <option value="net90">Net 90</option>
                    //   </select>
                    // </div>
                    // <div className="col-md-6">
                    //   <label className="form-label">Credit Limit</label>
                    //   <input type="number" className="form-control" name="creditLimit" value={formData.creditLimit} onChange={handleChange} />
                    // </div>
                    // <div className="col-md-12">
                    //   <label className="form-label">Notes</label>
                    //   <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional notes"></textarea>
                    // </div>
                    
                    
                    //             <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                    //               <button type="button" className="btn btn-outline-secondary">Cancel</button>
                    //               <button type="submit" id="btn-All" className="btn btn-dark">Create </button>
                    //             </div>
                    //           </form>
                    //         </div>
                    //       </div>
                    //     </div>
                    //     </>
                       
                    //   );
                    // }
                    
                    // export default AddClientManagement;
                    
                    
                    
                    
                    
                    
                    
                    
                    