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
                    
                    





                    // ////////////
                    import React, { useState } from 'react';
                    import Base_Url from '../../ApiUrl/ApiUrl';
                    import { useLocation, useNavigate, useParams } from 'react-router-dom';
                    import { toast, ToastContainer } from 'react-toastify';
                    import 'react-toastify/dist/ReactToastify.css';
                    import { useDispatch } from 'react-redux';
                    import { createClients } from '../../../redux/slices/ClientSlice';
                    import "react-toastify/dist/ReactToastify.css";
                    
                    
                    function AddClientManagement() {
                      const navigate = useNavigate();
                      const dispatch = useDispatch();
                      const { id } = useParams(); // for edit mode
                      const location = useLocation();
                      const { client } = location.state || {};
                      console.log(client);
                    
                      // Initial form state
                      const [formData, setFormData] = useState({
                        clientName: '',
                        industry: '',
                        website: '',
                        clientAddress: '',
                        TaxID_VATNumber: '',
                        CSRCode: '',
                        Status: 'Active'
                      });
                    
                      // Contact persons state
                      const [contactPersons, setContactPersons] = useState([
                        {
                          contactName: '',
                          jobTitle: '',
                          email: '',
                          phone: '',
                          department: '',
                          salesRepresentative: ''
                        }
                      ]);
                    
                      // Billing information state
                      const [billingInformation, setBillingInformation] = useState([
                        {
                          billingAddress: '',
                          billingContactName: '',
                          billingEmail: '',
                          billingPhone: '',
                          currency: '',
                          preferredPaymentMethod: ''
                        }
                      ]);
                      // Shipping information state
                      const [shippingInformation, setShippingInformation] = useState([
                        {
                          shippingAddress: '',
                          shippingContactName: '',
                          shippingEmail: '',
                          shippingPhone: '',
                          preferredShippingMethod: '',
                          specialInstructions: ''
                        }
                      ]);
                      // Financial information state
                      const [financialInformation, setFinancialInformation] = useState([
                        {
                          annualRevenue: '',
                          creditRating: '',
                          bankName: '',
                          accountNumber: '',
                          fiscalYearEnd: '',
                          financialContact: ''
                        }
                      ]);
                    
                      // Ledger information state
                      const [ledgerInformation, setLedgerInformation] = useState([
                        {
                          accountCode: '',
                          accountType: '',
                          openingBalance: '',
                          balanceDate: '',
                          taxCategory: '',
                          costCenter: ''
                        }
                      ]);
                    
                      // Additional information state
                      const [additionalInformation, setAdditionalInformation] = useState({
                        paymentTerms: '',
                        creditLimit: '',
                        notes: ''
                      });
                    
                    
                    
                      
                      // Handle basic form field changes
                      const handleChange = (e) => {
                        const { name, value } = e.target;
                        setFormData(prev => ({
                          ...prev,
                          [name]: value
                        }));
                      };
                    
                      // Handle contact person changes
                      const handleContactChange = (index, e) => {
                        const { name, value } = e.target;
                        const updatedContacts = [...contactPersons];
                        updatedContacts[index] = {
                          ...updatedContacts[index],
                          [name]: value
                        };
                        setContactPersons(updatedContacts);
                      };
                    
                      // Handle billing information changes
                      const handleBillingChange = (index, e) => {
                        const { name, value } = e.target;
                        const updatedBilling = [...billingInformation];
                        updatedBilling[index] = {
                          ...updatedBilling[index],
                          [name]: value
                        };
                        setBillingInformation(updatedBilling);
                      };
                    
                      // Handle shipping information changes
                      const handleShippingChange = (index, e) => {
                        const { name, value } = e.target;
                        const updatedShipping = [...shippingInformation];
                        updatedShipping[index] = {
                          ...updatedShipping[index],
                          [name]: value
                        };
                        setShippingInformation(updatedShipping);
                      };
                    
                      // Handle financial information changes
                      const handleFinancialChange = (index, e) => {
                        const { name, value } = e.target;
                        const updatedFinancial = [...financialInformation];
                        updatedFinancial[index] = {
                          ...updatedFinancial[index],
                          [name]: value
                        };
                        setFinancialInformation(updatedFinancial);
                      };
                    
                      // Handle ledger information changes
                      const handleLedgerChange = (index, e) => {
                        const { name, value } = e.target;
                        const updatedLedger = [...ledgerInformation];
                        updatedLedger[index] = {
                          ...updatedLedger[index],
                          [name]: value
                        };
                        setLedgerInformation(updatedLedger);
                      };
                    
                    
                      const handleAdditionalChange = (e) => {
                        const { name, value } = e.target;
                        setAdditionalInformation(prev => ({
                          ...prev,
                          [name]: value
                        }));
                      };
                    
                      // Handle form submission
                    //   const handleSubmit = async (e) => {
                    //     e.preventDefault();
                    
                    //     const fullData = {
                    //       ...formData,
                    //       contactPersons,
                    //       billingInformation,
                    //       shippingInformation,
                    //       financialInformation,
                    //       ledgerInformation,
                    //       additionalInformation
                    //     };
                    
                    //     console.log('Full Data Object:', fullData);
                    //  dispatch(createClients(fullData))
                    //     if (id) {
                    //       dispatch(createClients(fullData))
                    //         .unwrap()
                    //         .then(() => {
                    //           toast.success("Project updated successfully!");
                    //           // navigate("/plantMachinery");
                    //         })
                    //         .catch(() => {
                    //           toast.error("Failed to update project!");
                    //         });
                    //     } else {
                    //           dispatch(createClients(fullData))
                    //         .unwrap()
                    //         .then(() => {
                    //           toast.success("Project created successfully!");
                    //           // navigate("/projectList");
                    //         })
                    //         .catch(() => {
                    //           toast.error("Error creating project");
                    //         });
                    //     }
                    //   };
                    
                    
                    
                      const handleSubmit = async (e) => {
                        e.preventDefault();
                    
                        const fullData = {
                          ...formData,
                          contactPersons,
                          billingInformation,
                          shippingInformation,
                          financialInformation,
                          ledgerInformation,
                          additionalInformation
                        };
                              dispatch(createClients(fullData))
                            .unwrap()
                            .then(() => {
                              toast.success("Project created successfully!");
                              navigate("/clientManagement");
                            })
                            .catch(() => {
                              toast.error("Error creating project");
                            });
                        
                      };
                    
                    
                      return (
                        <>
                          <ToastContainer />
                          <div className="container mt-5">
                            <div className="card shadow-sm">
                              <div className="card-body">
                                <h1 className="card-title h4 mb-4">Add Company</h1>
                                <form className="row g-3" onSubmit={handleSubmit}>
                                  <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
                                  <div className="col-md-6"></div>
                                  <div className="col-md-6">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="form-control" placeholder="Enter  name" />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">Industry</label>
                                    <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
                                      <option value="">Select industry</option>
                                      <option value="manufacturing">Manufacturing</option>
                                      <option value="tech">Technology</option>
                                      <option value="retail">Retail</option>
                                    </select>
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">Website</label>
                                    <input type="url" name="website" value={formData.website} onChange={handleChange} className="form-control" placeholder="https://" />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">Client Address</label>
                                    <textarea className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">Tax ID/VAT Number</label>
                                    <input type="text" name="TaxID_VATNumber" value={formData.TaxID_VATNumber} onChange={handleChange} className="form-control" />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">CSR Code</label>
                                    <input type="text" name="CSRCode" value={formData.CSRCode} onChange={handleChange} className="form-control" />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="form-label">Status</label>
                                    <select className="form-select" name="Status" value={formData.Status} onChange={handleChange}>
                                      <option value="active">Active</option>
                                      <option value="inactive">Inactive</option>
                                    </select>
                                  </div>
                                  <div className='col-md-12 row'>
                                    <h5 className="mb-3 mt-4">Contact Persons</h5>
                    
                                    {contactPersons.map((contact, index) => (
                                      <div className="border p-3 mb-3" key={index}>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <label className="form-label">Contact Name</label>
                                            <input
                                              type="text"
                                              name="contactName"
                                              value={contact.contactName}
                                              onChange={(e) => handleContactChange(index, e)}
                                              className="form-control"
                                              placeholder="Enter Contact Name"
                                            />
                                          </div>
                    
                                          <div className="col-md-6">
                                            <label className="form-label">Job Title</label>
                                            <input
                                              type="text"
                                              name="jobTitle"
                                              value={contact.jobTitle}
                                              onChange={(e) => handleContactChange(index, e)}
                                              className="form-control"
                                              placeholder="Enter Job Title"
                                            />
                                          </div>
                    
                                          <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input
                                              type="email"
                                              name="email"
                                              value={contact.email}
                                              onChange={(e) => handleContactChange(index, e)}
                                              className="form-control"
                                              placeholder="Enter Email"
                                            />
                                          </div>
                    
                                          <div className="col-md-6">
                                            <label className="form-label">Phone</label>
                                            <input
                                              type="tel"
                                              name="phone"
                                              value={contact.phone}
                                              onChange={(e) => handleContactChange(index, e)}
                                              className="form-control"
                                              placeholder="Enter Phone"
                                            />
                                          </div>
                    
                                          <div className="col-md-6">
                                            <label className="form-label">Department</label>
                                            <input
                                              type="text"
                                              name="department"
                                              value={contact.department}
                                              onChange={(e) => handleContactChange(index, e)}
                                              className="form-control"
                                              placeholder="Enter Department"
                                            />
                                          </div>
                    
                                          <div className="col-md-6">
                                            <label className="form-label">Sales Representative</label>
                                            <input
                                              type="text"
                                              name="salesRepresentative"
                                              value={contact.salesRepresentative}
                                              onChange={(e) => handleContactChange(index, e)}
                                              className="form-control"
                                              placeholder="Enter Sales Representative"
                                            />
                                          </div>
                    
                                          <div className="col-md-12 mt-2 d-flex justify-content-end">
                                            {contactPersons.length > 1 && (
                                              <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                  const updatedContacts = [...contactPersons];
                                                  updatedContacts.splice(index, 1);
                                                  setContactPersons(updatedContacts);
                                                }}
                                              >
                                                Remove
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                    
                                    {/* Add More Button */}
                                    <div className="mb-3">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                          setContactPersons([
                                            ...contactPersons,
                                            {
                                              contactName: '',
                                              jobTitle: '',
                                              email: '',
                                              phone: '',
                                              department: '',
                                              salesRepresentative: ''
                                            }
                                          ]);
                                        }}
                                      >
                                        + Add Another Contact
                                      </button>
                                    </div>
                                  </div>
                    
                                  {/* Billing Information */}
                                  <div className='col-md-12 row'>
                                    <h5 className="mb-3 mt-4">Billing Information</h5>
                                    <div className="col-md-12">
                                      <label className="form-label">Billing Address</label>
                                      <textarea className="form-control" rows="3" name="billingAddress" value={billingInformation[0].billingAddress} onChange={(e) => handleBillingChange(0, e)}></textarea>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Billing Contact Name</label>
                                      <input type="text" className="form-control" name="billingContactName" value={billingInformation[0].billingContactName} onChange={(e) => handleBillingChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Billing Email</label>
                                      <input type="email" className="form-control" name="billingEmail" value={billingInformation[0].billingEmail} onChange={(e) => handleBillingChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Billing Phone</label>
                                      <input type="tel" className="form-control" name="billingPhone" value={billingInformation[0].billingPhone} onChange={(e) => handleBillingChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Currency</label>
                                      <select className="form-select" name="currency" value={billingInformation[0].currency} onChange={(e) => handleBillingChange(0, e)}>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                      </select>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Preferred Payment Method</label>
                                      <select className="form-select" name="preferredPaymentMethod" value={billingInformation[0].preferredPaymentMethod} onChange={(e) => handleBillingChange(0, e)}>
                                        <option value="">Select Payment Method</option>
                                        <option value="BankTransfer">BankTransfer</option>
                                        <option value="CreditCard">CreditCard</option>
                                        <option value="Check">Check</option>
                                      </select>
                                    </div>
                    
                                    {/* Shipping Information */}
                                    <h5 className="mb-3 mt-4">Shipping Information</h5>
                                    <div className="col-md-12">
                                      <label className="form-label">Shipping Address</label>
                                      <textarea className="form-control" rows="3" name="shippingAddress" value={shippingInformation[0].shippingAddress} onChange={(e) => handleShippingChange(0, e)}></textarea>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Shipping Contact Name</label>
                                      <input type="text" className="form-control" name="shippingContactName" value={shippingInformation[0].shippingContactName} onChange={(e) => handleShippingChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Shipping Email</label>
                                      <input type="email" className="form-control" name="shippingEmail" value={shippingInformation[0].shippingEmail} onChange={(e) => handleShippingChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Shipping Phone</label>
                                      <input type="tel" className="form-control" name="shippingPhone" value={shippingInformation[0].shippingPhone} onChange={(e) => handleShippingChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Preferred Shipping Method</label>
                                      <select className="form-select" name="preferredShippingMethod" value={shippingInformation[0].preferredShippingMethod} onChange={(e) => handleShippingChange(0, e)}>
                                        <option value="">Select Shipping Method</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Express">Express</option>
                                        <option value="Overnight">Overnight</option>
                                        <option value="Ground">Ground</option>
                                      </select>
                                    </div>
                                    <div className="col-md-12">
                                      <label className="form-label">Special Instructions</label>
                                      <textarea className="form-control" rows="3" name="specialInstructions" value={shippingInformation[0].specialInstructions} onChange={(e) => handleShippingChange(0, e)}></textarea>
                                    </div>
                    
                                    {/* Financial Information */}
                                    <h5 className="mb-3 mt-4">Financial Information</h5>
                                    <div className="col-md-6">
                                      <label className="form-label">Annual Revenue</label>
                                      <input type="number" className="form-control" name="annualRevenue" value={financialInformation[0].annualRevenue} onChange={(e) => handleFinancialChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Credit Rating</label>
                                      <input type="text" className="form-control" name="creditRating" value={financialInformation[0].creditRating} onChange={(e) => handleFinancialChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Bank Name</label>
                                      <input type="text" className="form-control" name="bankName" value={financialInformation[0].bankName} onChange={(e) => handleFinancialChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Account Number</label>
                                      <input type="text" className="form-control" name="accountNumber" value={financialInformation[0].accountNumber} onChange={(e) => handleFinancialChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Fiscal Year End</label>
                                      <input type="date" className="form-control" name="fiscalYearEnd" value={financialInformation[0].fiscalYearEnd} onChange={(e) => handleFinancialChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Financial Contact</label>
                                      <input type="text" className="form-control" name="financialContact" value={financialInformation[0].financialContact} onChange={(e) => handleFinancialChange(0, e)} />
                                    </div>
                    
                                    {/* Ledger Information */}
                                    <h5 className="mb-3 mt-4">Ledger Information</h5>
                                    <div className="col-md-6">
                                      <label className="form-label">Account Code</label>
                                      <input type="text" className="form-control" name="accountCode" value={ledgerInformation[0].accountCode} onChange={(e) => handleLedgerChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Account Type</label>
                                      <select className="form-select" name="accountType" value={ledgerInformation[0].accountType} onChange={(e) => handleLedgerChange(0, e)}>
                                        <option value="">Select Account Type</option>
                                        <option value="AccountsReceivable">AccountsReceivable</option>
                                        <option value="AccountsPayable">AccountsPayable</option>
                                      </select>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Opening Balance</label>
                                      <input type="number" className="form-control" name="openingBalance" value={ledgerInformation[0].openingBalance} onChange={(e) => handleLedgerChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Balance Date</label>
                                      <input type="date" className="form-control" name="balanceDate" value={ledgerInformation[0].balanceDate} onChange={(e) => handleLedgerChange(0, e)} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Tax Category</label>
                                      <select className="form-select" name="taxCategory" value={ledgerInformation[0].taxCategory} onChange={(e) => handleLedgerChange(0, e)}>
                                        <option value="standard">Standard Rate</option>
                                        <option value="reduced">Reduced Rate</option>
                                        <option value="zero">Zero Rate</option>
                                      </select>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Cost Center</label>
                                      <input type="text" className="form-control" name="costCenter" value={ledgerInformation[0].costCenter} onChange={(e) => handleLedgerChange(0, e)} />
                                    </div>
                    
                                    {/* Additional Information */}
                                    <h5 className="mb-3 mt-4">Additional Information</h5>
                                    <div className="col-md-6">
                                      <label className="form-label">Payment Terms</label>
                                      <select className="form-select" name="paymentTerms" value={additionalInformation.paymentTerms} onChange={handleAdditionalChange}>
                                        <option value="net30">Net 30</option>
                                        <option value="net60">Net 60</option>
                                        <option value="net90">Net 90</option>
                                      </select>
                                    </div>
                                    <div className="col-md-6">
                                      <label className="form-label">Credit Limit</label>
                                      <input type="number" className="form-control" name="creditLimit" value={additionalInformation.creditLimit} onChange={handleAdditionalChange} />
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <label className="form-label">Notes</label>
                                    <textarea className="form-control" rows="3" name="notes" value={additionalInformation.notes} onChange={handleAdditionalChange} placeholder="Additional notes"></textarea>
                                  </div>
                    
                    
                                  <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                                    <button type="button" className="btn btn-outline-secondary">Cancel</button>
                                    <button type="submit" id="btn-All" className="btn btn-dark">Create </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </>
                    
                      );
                    }
                    
                    export default AddClientManagement;
                    
                    
                    















                    
// Api complete code api working rol ok 
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { usersLogin } from "../../redux/slices/userSlice";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     try {
//       setLoading(true);
//       const res = await axios.post("https://xt2cpwt7-8000.inc1.devtunnels.ms/api/user/login", { email, password });
//       console.log("API Response:", res.data);

//       const { role, token } = res.data.user;
//       // if (!role) {
//       //   alert("Role is undefined in the response.");
//       //   return;
//       // }
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("userRole", role);
        
//           toast.success("Project created successfully!");
//       if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (role === "productionManager") {
//         navigate("/production/dashboard");
//       } else if (role === "employee") {
//         navigate("/employee/tasks");
//       } else if (role === "client") {
//         navigate("/client/overview");
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//        toast.error(res.data.message ||"Error Login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <main className="w-100" style={{ maxWidth: "550px" }}>
//         <div className="login-container bg-white p-4 rounded shadow-sm">
//           <h4 className="text-center mb-4">Welcome Back</h4>

//           <form onSubmit={handleLogin}>
//             <div className="form-floating mb-3">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <label htmlFor="email">Email address</label>
//             </div>

//             <div className="form-floating mb-3">
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 required
//               />
//               <label htmlFor="password">Password</label>
//             </div>

//             <div className="d-flex justify-content-between mb-4">
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" id="remember" />
//                 <label className="form-check-label text-secondary" htmlFor="remember">
//                   Remember me
//                 </label>
//               </div>
//               <a href="#" className="text-decoration-none text-secondary">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="btn w-100 text-white"
//               id="All_btn"
//               style={{ padding: "10px", borderRadius: "5px" }}
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Log In"}
//             </button>

//             <p className="text-center mt-3 mb-0">
//               <span className="text-secondary">Don't have an account?</span>
//               <Link to="/signup" className="text-decoration-none ms-1">
//                 Sign up
//               </Link>
//             </p>

//             <button
//               className="social-signup btn w-100 mb-3 d-flex align-items-center justify-content-center"
//               style={{
//                 backgroundColor: "#ffffff",
//                 color: "#5F6368",
//                 border: "1px solid #dadce0",
//                 fontSize: "14px",
//                 fontWeight: "500",
//                 padding: "10px 0",
//                 borderRadius: "4px",
//                 transition: "all 0.3s ease",
//                 marginTop: "20px",
//               }}
//               type="button"
//             >
//               <i className="fab fa-google me-2" style={{ fontSize: "18px", color: "#4285F4" }} />
//               Continue with Google
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;

                    
                    
                    
                    
                    
                    














                    import React, { useState } from 'react';
                    import UserRoleModal from './UserRoleModal';
                    import { FaEdit, FaTrashAlt } from 'react-icons/fa';
                    import { Link } from 'react-router-dom';
                    
                    function UserRoles() {
                      const [users, setUsers] = useState([
                        {
                          id: 1,
                          name: 'John Smith',
                          email: 'john.smith@example.com',
                          role: 'Admin',
                          status: 'Active',
                          permissions: 'Full Access'
                        },
                        {
                          id: 2,
                          name: 'Sarah Johnson',
                          email: 'sarah.j@example.com',
                          role: 'Manager',
                          status: 'Active',
                          permissions: 'Limited Access'
                        },
                        {
                          id: 3,
                          name: 'Michael Brown',
                          email: 'm.brown@example.com',
                          role: 'Designer',
                          status: 'Pending',
                          permissions: 'Design Tools Only'
                        }
                      ]);
                    
                      const [searchTerm, setSearchTerm] = useState('');
                      const [currentPage, setCurrentPage] = useState(1);
                      const itemsPerPage = 12;
                    
                      // Filter users based on search term
                      const filteredUsers = users.filter(user =>
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      );
                    
                      // Calculate pagination
                      const indexOfLastItem = currentPage * itemsPerPage;
                      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                      const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
                      const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
                    
                      const handleSearch = (e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      };
                    
                      const handlePageChange = (pageNumber) => {
                        setCurrentPage(pageNumber);
                      };
                    
                      const [showModal, setShowModal] = useState(false);
                      const [editingUser, setEditingUser] = useState(null);
                    
                      const handleEditUser = (userId) => {
                        const userToEdit = users.find(user => user.id === userId);
                        setEditingUser(userToEdit);
                        setShowModal(true);
                      };
                    
                      const handleDeleteUser = (userId) => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                          setUsers(users.filter(user => user.id !== userId));
                        }
                      };
                    
                    
                      return (
                        <div className=" p-4 m-3" style={{backgroundColor:"white",borderRadius:"10px",}}>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex gap-2 align-items-center">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={handleSearch}
                                style={{ width: '200px' }}
                              />
                              <button className="btn btn-outline-secondary">All Roles</button>
                            </div>
                           <Link to={"/UserRoleModal"}> <button id="All_btn" className="btn btn-dark">
                              + Add User
                            </button></Link>
                          </div>
                    
                          <div className="card shadow-sm">
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                  <thead>
                                    <tr>
                                      <th>User</th>
                                      <th>Role</th>
                                      <th>Status</th>
                                      <th>Permissions</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {currentUsers.map(user => (
                                      <tr key={user.id}>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                              {user.name.charAt(0)}
                                            </div>
                                            <div>
                                              <div className="fw-semibold">{user.name}</div>
                                              <div className="text-muted small">{user.email}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <span className={`badge ${user.role === 'Admin' ? 'text-bg-dark' : user.role === 'Manager' ? 'text-bg-primary' : 'text-bg-info'}`}>
                                            {user.role}
                                          </span>
                                        </td>
                                        <td>
                                          <span className={`badge ${user.status === 'Active' ? 'text-bg-success' : 'text-bg-warning'}`}>
                                            {user.status}
                                          </span>
                                        </td>
                                        <td>{user.permissions}</td>
                                        <td>
                                          <div className="d-flex gap-2">
                                            <button
                                              className="btn btn-sm btn-outline-secondary"
                                              onClick={() => handleEditUser(user.id)}
                                            >
                                              <FaEdit />
                                            </button>
                                            <button
                                              className="btn btn-sm btn-outline-danger"
                                              onClick={() => handleDeleteUser(user.id)}
                                            >
                                              <FaTrashAlt />
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                    
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="text-muted small">
                              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
                            </div>
                            <nav>
                              <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
                                  </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                </li>
                              </ul>
                            </nav>
                          </div>
                    
                    
                     
                        </div>
                      );
                    }
                    
                    export default UserRoles;
                    














                    import React, { useEffect, useState } from 'react';
                    import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
                    import { Modal, Form, Button } from 'react-bootstrap';
                    import { useDispatch, useSelector } from 'react-redux';
                    import { deletejob, fetchjobs, UpdateJobAssign } from '../../../../redux/slices/JobsSlice';
                    import Swal from 'sweetalert2';
                    
                    function ProjectJobsTab() {
                      const location = useLocation();
                      const params = useParams();
                      const id = location.state?.id || params.id;
                      console.log("hello me project id", id);
                    
                    
                    
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
                      // const location = useLocation();
                      // const params = useParams();
                      // const id = location.state?.id || params.id;
                      useEffect(() => {
                        console.log("Project ID:", id);
                      }, [id]);
                    
                    
                      // ///
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
                        case "cancelled":
                          return "bg-dark text-white";
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
                    
                              <Link
                                to="/AddJobTracker"
                                state={{ id }} // ID pass kar rahe hain yahan
                              >
                                <button id="All_btn" className="btn btn-primary">
                                  <i className="bi bi-plus"></i> Add Job
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
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.brandName}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.packType}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>{job.packSize}</td>
                                      <td>
                                        <span className={getPriorityClass(job.priority)}>
                                          {job.priority}
                                        </span>
                                      </td>
                                      <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                                      <td>{job.assign}</td>
                                      <td>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
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
                                          <i className="bi bi-trash"></i> Remove 
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
                    























                    import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

function UserRoleModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const {user} = location.state || {};
  const userId = location.state?.id;
console.log("hhhhhhhhhh",user);

  const [formData, setFormData] = useState({
    roleName: '',
    roleDescription: '',
    permissions: {
      dashboardAccess: false,
      clientManagement: false,
      projectManagement: false,
      designTools: false,
      financialManagement: false,
      userManagement: false,
      reportGeneration: false,
      systemSettings: false
    },
    accessLevel: 'fullAccess'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 useEffect(() => {
  if (user) {
    setFormData(prev => ({
      ...prev,
      roleName: user.roleName || '',
      roleDescription: user.roleDescription || '',
      permissions: {
        ...prev.permissions,
        ...user.permissions
      },
      accessLevel: user.accessLevel || 'fullAccess'
    }));
  }
}, [user]);


  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };

  const handleAccessLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      accessLevel: e.target.value
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

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Role</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <input type="text"
                className="form-control"
                name="roleName"
                value={formData.roleName}
                onChange={handleInputChange}
                placeholder="Enter role name"
                required/>
            </div>

            <div className="mb-3">
              <label className="form-label">Role Description</label>
              <textarea
                className="form-control"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleInputChange}
                placeholder="Brief description of the role"
                rows="3" />
            </div>

            <div className="mb-4">
              <label className="form-label">Permissions</label>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-check">
                    <input type="checkbox"  className="form-check-input"
                      name="dashboardAccess"
                      checked={formData.permissions.dashboardAccess}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Dashboard Access</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                      name="clientManagement"
                      checked={formData.permissions.clientManagement}
                      onChange={handlePermissionChange}/>
                    <label className="form-check-label">Client Management</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox"
                      className="form-check-input"
                      name="projectManagement"
                      checked={formData.permissions.projectManagement}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Project Management</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="designTools"
                      checked={formData.permissions.designTools}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Design Tools</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="financialManagement"
                      checked={formData.permissions.financialManagement}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Financial Management</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="userManagement"
                      checked={formData.permissions.userManagement}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">User Management</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="reportGeneration"
                      checked={formData.permissions.reportGeneration}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Report Generation</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox"
                      className="form-check-input"
                      name="systemSettings"
                      checked={formData.permissions.systemSettings}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">System Settings</label>
                  </div>
                </div>
              </div>
            </div>


            <div className="mb-4">
              <label className="form-label">Access Level</label>
              <div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="accessLevel"
                    value="fullAccess"
                    checked={formData.accessLevel === 'fullAccess'}
                    onChange={handleAccessLevelChange}
                  />
                  <label className="form-check-label">Full Access</label>
                </div>
                <div className="form-check">
                  <input
                     type="radio"
                    className="form-check-input"
                    name="accessLevel"
                    value="limitedAccess"
                    checked={formData.accessLevel === 'limitedAccess'}
                    onChange={handleAccessLevelChange}
                  />
                  <label className="form-check-label">Limited Access</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="accessLevel"
                    value="viewOnly"
                    checked={formData.accessLevel === 'viewOnly'}
                    onChange={handleAccessLevelChange}
                  />
                  <label className="form-check-label">View Only</label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-dark">Create Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRoleModal;







import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function UserRoleModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  const userId = location.state?.id;
  console.log("hhhhhhhhhh", user);

  const [formData, setFormData] = useState({
    roleName: '',
    roleDescription: '',
    permissions: {
      dashboardAccess: false,
      clientManagement: false,
      projectManagement: false,
      designTools: false,
      financialManagement: false,
      userManagement: false,
      reportGeneration: false,
      systemSettings: false
    },
    accessLevel: 'fullAccess'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
    if (job && project?.data?.length) {
      let projectId = '';

      // Safely extract project ID from nested projectsId array
      if (Array.isArray(job.projectId) && job.projectId.length > 0) {
        projectId = job.projectId[0]._id;
      } else if (Array.isArray(job.projectsId) && job.projectsId.length > 0) {
        projectId = typeof job.projectsId[0] === 'object'
          ? job.projectsId[0]._id
          : job.projectsId[0];
      }

      setFormData((prev) => ({
        ...prev,
        ...job,
        projectsId: projectId,
      }));
    }
  }, [job, project?.data]);

  const handlePermissionChange = (e) => {
    const { name } = e.target;
    const updatedPermissions = Object.fromEntries(
      Object.keys(formData.permissions).map((key) => [key, key === name])
    );

    setFormData(prev => ({
      ...prev,
      permissions: updatedPermissions
    }));
  };

  const handleAccessLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      accessLevel: e.target.value
    }));
  };




   const handleSubmit = (e) => {
      e.preventDefault();
  
    const filteredPermissions = Object.fromEntries(
      Object.entries(formData.permissions).filter(([_, value]) => value === true)
    );

    const payload = {
      roleName: formData.roleName,
      roleDescription: formData.roleDescription,
      permissions: filteredPermissions,
      accessLevel: formData.accessLevel
    };

    console.log('Payload to be sent:', payload);
    
      // Wrap projectsId as array
      // const payload = {
      //   ...formData,
      //   projectsId: [formData.projectsId],  
      // };
  
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const filteredPermissions = Object.fromEntries(
  //     Object.entries(formData.permissions).filter(([_, value]) => value === true)
  //   );

  //   const payload = {
  //     roleName: formData.roleName,
  //     roleDescription: formData.roleDescription,
  //     permissions: filteredPermissions,
  //     accessLevel: formData.accessLevel
  //   };

  //   console.log('Payload to be sent:', payload);
  //   try {
  //     await axios.post('/api/roles', payload);
  //     navigate(-1);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     alert('Failed to create role. Please try again.');
  //   }
  // };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Role</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <select
                className="form-select"
                name="roleName"
                value={formData.roleName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
                <option value="Production">Production</option>
                <option value="Employee">Employee</option>
              </select>
            </div>


            <div className="mb-3">
              <label className="form-label">Role Description</label>
              <textarea
                className="form-control"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleInputChange}
                placeholder="Brief description of the role"
                rows="3" />
            </div>

            <div className="mb-4">
              <label className="form-label">Permissions (Select Only One)</label>
              <div className="row g-3">
                {Object.keys(formData.permissions).map((key) => (
                  <div className="col-md-6" key={key}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={key}
                        checked={formData.permissions[key]}
                        onChange={handlePermissionChange}
                      />
                      <label className="form-check-label text-capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Access Level</label>
              <div>
                {['fullAccess', 'limitedAccess', 'viewOnly'].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="accessLevel"
                      value={level}
                      checked={formData.accessLevel === level}
                      onChange={handleAccessLevelChange}
                    />
                    <label className="form-check-label text-capitalize">{level.replace(/([A-Z])/g, ' $1')}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-dark">Create Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRoleModal;






// ////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function UserRoleModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  const userId = location.state?.id;
  console.log("hhhhhhhhhh", user);

  
  const [formData, setFormData] = useState({
    roleName: '',
    roleDescription: '',
    permissions: {
      dashboardAccess: false,
      clientManagement: false,
      projectManagement: false,
      designTools: false,
      financialManagement: false,
      userManagement: false,
      reportGeneration: false,
      systemSettings: false
    },
    accessLevel: 'fullAccess'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
    if (user && project?.data?.length) {
      let userId = '';

      // Safely extract project ID from nested projectsId array
      if (Array.isArray(user.userId) && user.userId.length > 0) {
        userId = user.userId[0]._id;
      } else if (Array.isArray(user.projectsId) && user.projectsId.length > 0) {
        userId = typeof user.projectsId[0] === 'object'
          ? user.projectsId[0]._id
          : user.projectsId[0];
      }

      setFormData((prev) => ({
        ...prev,
        ...user,
        projectsId: userId,
      }));
    }
  }, [user, project?.data]);

  const handlePermissionChange = (e) => {
    const { name } = e.target;
    const updatedPermissions = Object.fromEntries(
      Object.keys(formData.permissions).map((key) => [key, key === name])
    );

    setFormData(prev => ({
      ...prev,
      permissions: updatedPermissions
    }));
  };

  const handleAccessLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      accessLevel: e.target.value
    }));
  };




   const handleSubmit = (e) => {
      e.preventDefault();
  
    const filteredPermissions = Object.fromEntries(
      Object.entries(formData.permissions).filter(([_, value]) => value === true)
    );

    const payload = {
      roleName: formData.roleName,
      roleDescription: formData.roleDescription,
      permissions: filteredPermissions,
      accessLevel: formData.accessLevel
    };

    console.log('Payload to be sent:', payload);
    
      // Wrap projectsId as array
      // const payload = {
      //   ...formData,
      //   projectsId: [formData.projectsId],  
      // };
  
      if (id) {
        dispatch(updateuser({ id, data: payload }))
          .unwrap()
          .then(() => {
            toast.success("user updated successfully!");
            navigate('/ProjectOverview', { state: { openTab: 'users' } });
            dispatch(fetchProject());
          })
          .catch(() => {
            toast.error("Failed to update user!");
          });
      } else {
        dispatch(createuser(payload))  // send payload with array
          .unwrap()
          .then(() => {
            toast.success("user created successfully!");
            navigate('/ProjectOverview', { state: { openTab: 'users' } });
            dispatch(fetchProject());
          })
          .catch(() => {
            toast.error("Error creating user");
          });
      }
    };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const filteredPermissions = Object.fromEntries(
  //     Object.entries(formData.permissions).filter(([_, value]) => value === true)
  //   );

  //   const payload = {
  //     roleName: formData.roleName,
  //     roleDescription: formData.roleDescription,
  //     permissions: filteredPermissions,
  //     accessLevel: formData.accessLevel
  //   };

  //   console.log('Payload to be sent:', payload);
  //   try {
  //     await axios.post('/api/roles', payload);
  //     navigate(-1);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     alert('Failed to create role. Please try again.');
  //   }
  // };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Role</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <select
                className="form-select"
                name="roleName"
                value={formData.roleName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
                <option value="Production">Production</option>
                <option value="Employee">Employee</option>
              </select>
            </div>


            <div className="mb-3">
              <label className="form-label">Role Description</label>
              <textarea
                className="form-control"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleInputChange}
                placeholder="Brief description of the role"
                rows="3" />
            </div>

            <div className="mb-4">
              <label className="form-label">Permissions (Select Only One)</label>
              <div className="row g-3">
                {Object.keys(formData.permissions).map((key) => (
                  <div className="col-md-6" key={key}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={key}
                        checked={formData.permissions[key]}
                        onChange={handlePermissionChange}
                      />
                      <label className="form-check-label text-capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Access Level</label>
              <div>
                {['fullAccess', 'limitedAccess', 'viewOnly'].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="accessLevel"
                      value={level}
                      checked={formData.accessLevel === level}
                      onChange={handleAccessLevelChange}
                    />
                    <label className="form-check-label text-capitalize">{level.replace(/([A-Z])/g, ' $1')}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-dark">Create Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRoleModal;









////////////////////////////
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function UserRoleModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const {user} = location.state || {};
  const userId = location.state?.id;
  console.log("hhhhhhhhhh",user);
  
  const [formData, setFormData] = useState({
    roleName: '',
    roleDescription: '',
    permissions: {
      dashboardAccess: false,
      clientManagement: false,
      projectManagement: false,
      designTools: false,
      financialManagement: false,
      userManagement: false,
      reportGeneration: false,
      systemSettings: false
    },
    accessLevel: 'fullAccess'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (e) => {
    const { name } = e.target;
    const updatedPermissions = Object.fromEntries(
      Object.keys(formData.permissions).map((key) => [key, key === name])
    );

    setFormData(prev => ({
      ...prev,
      permissions: updatedPermissions
    }));
  };

  const handleAccessLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      accessLevel: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredPermissions = Object.fromEntries(
      Object.entries(formData.permissions).filter(([_, value]) => value === true)
    );

    const payload = {
      roleName: formData.roleName,
      roleDescription: formData.roleDescription,
      permissions: filteredPermissions,
      accessLevel: formData.accessLevel
    };

    console.log('Payload to be sent:', payload);
    try {
      await axios.post('/api/roles', payload);
      navigate(-1);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create role. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Role</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <select
                className="form-select"
                name="roleName"
                value={formData.roleName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
                <option value="Production">Production</option>
                <option value="Employee">Employee</option>
              </select>
            </div>


            <div className="mb-3">
              <label className="form-label">Role Description</label>
              <textarea
                className="form-control"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleInputChange}
                placeholder="Brief description of the role"
                rows="3" />
            </div>

            <div className="mb-4">
              <label className="form-label">Permissions (Select Only One)</label>
              <div className="row g-3">
                {Object.keys(formData.permissions).map((key) => (
                  <div className="col-md-6" key={key}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={key}
                        checked={formData.permissions[key]}
                        onChange={handlePermissionChange}
                      />
                      <label className="form-check-label text-capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Access Level</label>
              <div>
                {['fullAccess', 'limitedAccess', 'viewOnly'].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="accessLevel"
                      value={level}
                      checked={formData.accessLevel === level}
                      onChange={handleAccessLevelChange}
                    />
                    <label className="form-check-label text-capitalize">{level.replace(/([A-Z])/g, ' $1')}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-dark">Create Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRoleModal;




















// 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createCostEstimate } from "../../../redux/slices/costEstimatesSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];

const poStatuses = ["Pending", "Approved", "Rejected"];
const statuses = ["Active", "Inactive", "Completed"];

function AddCostEstimates() {
const navigate = useNavigate();
const dispatch = useDispatch()

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: ["6821a7b537e654e25af3da1d"],
    projectsId: ["681f1eb87397dc2b7e25eba2"],
    projectName: "681f1eb87397dc2b7e25eba2",
    estimateDate: "",
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    Status: "Active",
  });

  const [taxRate, setTaxRate] = useState(0.05);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        VATRate: taxRate * 100,
        lineItems: items,
      };
      console.log("Submitted Data:", payload);
      dispatch(createCostEstimate(payload))
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to create estimate!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Client</label>
              <select
                className="form-select"
                name="clientId"
                value={formData.clientId}
                onChange={handleFormChange}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Number</label>
              <input
                type="text"
                className="form-control"
                name="projectsId"
                value={formData.projectsId}
                // onChange={handleProjectNumberChange}
                placeholder="Enter project number"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                readOnly
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Date</label>
              <input
                type="date"
                className="form-control"
                name="estimateDate"
                value={formData.estimateDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">PO Status</label>
              <select
                className="form-select"
                name="POStatus"
                value={formData.POStatus}
                onChange={handleFormChange}
              >
                {poStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleFormChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="fw-semibold mb-3">Line Items</h6>
          {/* Line Items UI (Same as before) */}
          {items.map((item, index) => (
            <div
              className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
              key={index}
              style={{ background: "#f9f9f9", borderRadius: "8px" }}
            >
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <span>
                  {formData.currency} {item.amount.toFixed(2)}
                </span>
              </div>
              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn border rounded px-3 py-1 mb-4 text-dark"
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label">VAT Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={(taxRate * 100).toFixed(2)}
                onChange={(e) =>
                  setTaxRate(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) / 100)
                }
              />
              <div className="mt-3">
                Subtotal: {formData.currency} {subtotal.toFixed(2)}<br />
                VAT: {formData.currency} {tax.toFixed(2)}<br />
                <strong>Total: {formData.currency} {total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="4"
                name="Notes"
                value={formData.Notes}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to="/CostEstimates">
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;






















import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createCostEstimate } from "../../../redux/slices/costEstimatesSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];

const poStatuses = ["Pending", "Approved", "Rejected"];
const statuses = ["Active", "Inactive", "Completed"];

function AddCostEstimates() {
const navigate = useNavigate();
const dispatch = useDispatch()

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: ["6821a7b537e654e25af3da1d"],
    projectsId: ["681f1eb87397dc2b7e25eba2"],
    projectName: "681f1eb87397dc2b7e25eba2",
    estimateDate: "",
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    Status: "Active",
  });

  const [taxRate, setTaxRate] = useState(0.05);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        VATRate: taxRate * 100,
        lineItems: items,
      };
      console.log("Submitted Data:", payload);
      dispatch(createCostEstimate(payload))
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to create estimate!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Client</label>
              <select
                className="form-select"
                name="clientId"
                value={formData.clientId}
                onChange={handleFormChange}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Number</label>
              <input
                type="text"
                className="form-control"
                name="projectsId"
                value={formData.projectsId}
                // onChange={handleProjectNumberChange}
                placeholder="Enter project number"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                readOnly
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Date</label>
              <input
                type="date"
                className="form-control"
                name="estimateDate"
                value={formData.estimateDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">PO Status</label>
              <select
                className="form-select"
                name="POStatus"
                value={formData.POStatus}
                onChange={handleFormChange}
              >
                {poStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleFormChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="fw-semibold mb-3">Line Items</h6>
           <div className="row fw-semibold text-muted mb-2 px-2">
            <div className="col-md-5">Description</div>
            <div className="col-md-2">Quantity</div>
            <div className="col-md-2">Rate</div>
            <div className="col-md-2">Amount</div>
            <div className="col-md-1 text-end"></div>
          </div>
          {/* Line Items UI (Same as before) */}
          {items.map((item, index) => (
            <div
              className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
              key={index}
              style={{ background: "#f9f9f9", borderRadius: "8px" }}
            >
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <span>
                  {formData.currency} {item.amount.toFixed(2)}
                </span>
              </div>
              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn border rounded px-3 py-1 mb-4 text-dark"
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label">VAT Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={(taxRate * 100).toFixed(2)}
                onChange={(e) =>
                  setTaxRate(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) / 100)
                }
              />
              <div className="mt-3">
                Subtotal: {formData.currency} {subtotal.toFixed(2)}<br />
                VAT: {formData.currency} {tax.toFixed(2)}<br />
                <strong>Total: {formData.currency} {total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="4"
                name="Notes"
                value={formData.Notes}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to="/CostEstimates">
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;




























import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createCostEstimate } from "../../../redux/slices/costEstimatesSlice";
import { fetchProject } from "../../../redux/slices/ProjectsSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];

const poStatuses = ["Pending", "Approved", "Rejected"];
const statuses = ["Active", "Inactive", "Completed"];

function AddCostEstimates() {

const navigate = useNavigate();
const dispatch = useDispatch()

// Projects al lis name   
const { project, loading, error } = useSelector((state) => state.projects);

  const selectedProjectName = project?.data?.find(p => p._id === formData.projectsId)?.projectName || "";

  const reversedProjectList = project?.data?.slice().reverse() || [];
    useEffect(() => {
      dispatch(fetchProject());
    }, [dispatch]);

  

    // /////
  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: ["6821a7b537e654e25af3da1d"],
    projectsId: ["681f1eb87397dc2b7e25eba2"],
    projectName: "681f1eb87397dc2b7e25eba2",
    estimateDate: "",
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    Status: "Active",
  });

  const [taxRate, setTaxRate] = useState(0.05);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        VATRate: taxRate * 100,
        lineItems: items,
      };
      console.log("Submitted Data:", payload);
      dispatch(createCostEstimate(payload))
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to create estimate!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Client</label>
              <select
                className="form-select"
                name="clientId"
                value={formData.clientId}
                onChange={handleFormChange}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Number</label>
              <input
                type="text"
                className="form-control"
                name="projectsId"
                value={formData.projectsId}
                // onChange={handleProjectNumberChange}
                placeholder="Enter project number"
              />
                 <option value={selectedProjectName}>
                    {selectedProjectName}
                  </option>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                readOnly
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Date</label>
              <input
                type="date"
                className="form-control"
                name="estimateDate"
                value={formData.estimateDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">PO Status</label>
              <select
                className="form-select"
                name="POStatus"
                value={formData.POStatus}
                onChange={handleFormChange}
              >
                {poStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleFormChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="fw-semibold mb-3">Line Items</h6>
           <div className="row fw-semibold text-muted mb-2 px-2">
            <div className="col-md-5">Description</div>
            <div className="col-md-2">Quantity</div>
            <div className="col-md-2">Rate</div>
            <div className="col-md-2">Amount</div>
            <div className="col-md-1 text-end"></div>
          </div>
          {/* Line Items UI (Same as before) */}
          {items.map((item, index) => (
            <div
              className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
              key={index}
              style={{ background: "#f9f9f9", borderRadius: "8px" }}
            >
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <span>
                  {formData.currency} {item.amount.toFixed(2)}
                </span>
              </div>
              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn border rounded px-3 py-1 mb-4 text-dark"
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label">VAT Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={(taxRate * 100).toFixed(2)}
                onChange={(e) =>
                  setTaxRate(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) / 100)
                }
              />
              <div className="mt-3">
                Subtotal: {formData.currency} {subtotal.toFixed(2)}<br />
                VAT: {formData.currency} {tax.toFixed(2)}<br />
                <strong>Total: {formData.currency} {total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="4"
                name="Notes"
                value={formData.Notes}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to="/CostEstimates">
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;















import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createCostEstimate } from "../../../redux/slices/costEstimatesSlice";
import { fetchProject } from "../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../redux/slices/ClientSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];
const poStatuses = ["Pending", "Approved", "Rejected"];
const statuses = ["Active", "Inactive", "Completed"];


function AddCostEstimates() {
  const location = useLocation();
  const po = location.state?.po;
  const id = po?._id;
  console.log("ID from PO", po);



  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Projects al lis name   
  const { project, loading, error } = useSelector((state) => state.projects);
  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);
  const reversedProjectList = project?.data?.slice().reverse() || [];

  //  all client 
  const { Clients } = useSelector((state) => state.client);
  useEffect(() => {
    if (Clients && project?.data?.length) {
      const foundProject = project.data.find(p => p._id === Clients);
      if (foundProject) {
        setFormData(prev => ({
          ...prev,
          projectsId: foundProject._id,
        }));
      }
    }
  }, [Clients, project]);

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);



  // /////
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: [""],
    projectsId: [""],
    estimateDate: "",
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    Status: "Active",
  });
  useEffect(() => {
    if (job && project?.data?.length) {
      let projectId = '';
      if (Array.isArray(job.projectId) && job.projectId.length > 0) {
        projectId = job.projectId[0]._id;
      } else if (Array.isArray(job.projectsId) && job.projectsId.length > 0) {
        projectId = typeof job.projectsId[0] === 'object'
          ? job.projectsId[0]._id
          : job.projectsId[0];
      }
      setFormData((prev) => ({
        ...prev,
        ...job,
        projectsId: projectId,
      }));
    }
  }, [job, project?.data]);

  const [taxRate, setTaxRate] = useState(0.05);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      VATRate: taxRate * 100,
      lineItems: items,
    };
  
    if (id) {
      dispatch(({ id, data: payload }))
        .unwrap()
        .then(() => {
          toast.success("Job updated successfully!");
          navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
          // dispatch(fetchProject());
        })
        .catch(() => {
          toast.error("Failed to update job!");
        });
    } else {
     dispatch(createCostEstimate(payload))
        .unwrap()
        .then(() => {
          toast.success("Job created successfully!");
          navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
          // dispatch(fetchProject());
        })
        .catch(() => {
          toast.error("Error creating job");
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Client</label>
              <select
                className="form-select"
                name="clientId"
                value={formData.clientId[0] || ""}
                onChange={(e) => {
                  const selectedClientId = e.target.value;
                  setFormData({
                    ...formData,
                    clientId: [selectedClientId], // value as array
                  });
                }}
                required
              >
                <option value="">Select Client</option>
                {Clients?.data?.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project</label>
              <select
                className="form-select"
                name="projectsId"
                value={formData.projectsId[0] || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedProject = project?.data?.find(p => p._id === selectedId);
                  setFormData({
                    ...formData,
                    projectsId: [selectedId],
                    projectName: selectedProject?.projectName || "",
                  });
                }}
              >
                <option value="">Select a project</option>
                {reversedProjectList.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.projectName}
                  </option>
                ))}
              </select>

            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Date</label>
              <input
                type="date"
                className="form-control"
                name="estimateDate"
                value={formData.estimateDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">PO Status</label>
              <select
                className="form-select"
                name="POStatus"
                value={formData.POStatus}
                onChange={handleFormChange}
              >
                {poStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleFormChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="fw-semibold mb-3">Line Items</h6>
          <div className="row fw-semibold text-muted mb-2 px-2">
            <div className="col-md-5">Description</div>
            <div className="col-md-2">Quantity</div>
            <div className="col-md-2">Rate</div>
            <div className="col-md-2">Amount</div>
            <div className="col-md-1 text-end"></div>
          </div>
          {/* Line Items UI (Same as before) */}
          {items.map((item, index) => (
            <div
              className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
              key={index}
              style={{ background: "#f9f9f9", borderRadius: "8px" }}
            >
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <span>
                  {formData.currency} {item.amount.toFixed(2)}
                </span>
              </div>
              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn border rounded px-3 py-1 mb-4 text-dark"
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label">VAT Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={(taxRate * 100).toFixed(2)}
                onChange={(e) =>
                  setTaxRate(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) / 100)
                }
              />
              <div className="mt-3">
                Subtotal: {formData.currency} {subtotal.toFixed(2)}<br />
                VAT: {formData.currency} {tax.toFixed(2)}<br />
                <strong>Total: {formData.currency} {total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="4"
                name="Notes"
                value={formData.Notes}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to="/CostEstimates">
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;


























import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createCostEstimate, updateCostEstimate } from "../../../redux/slices/costEstimatesSlice";
import { fetchProject } from "../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../redux/slices/ClientSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];

const poStatuses = ["Pending", "Approved", "Rejected"];
const statuses = ["Active", "Inactive", "Completed"];

function AddCostEstimates() {
  const location = useLocation();
  const po = location.state?.po;
  const id = po?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { project } = useSelector((state) => state.projects);
  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);
  const reversedProjectList = project?.data?.slice().reverse() || [];

  const { Clients } = useSelector((state) => state.client);
  useEffect(() => {
    if (Clients && project?.data?.length) {
      const foundProject = project.data.find(p => p._id === Clients);
      if (foundProject) {
        setFormData(prev => ({
          ...prev,
          projectsId: foundProject._id,
        }));
      }
    }
  }, [Clients, project]);

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: [""],
    projectsId: [""],
    estimateDate: "",
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    Status: "Active",
  });

 useEffect(() => {
  if (po && project?.data?.length) {
    let projectId = '';
    if (Array.isArray(po.projectId) && po.projectId.length > 0) {
      projectId = po.projectId[0]._id;
    } else if (Array.isArray(po.projects) && po.projects.length > 0) {
      projectId = typeof po.projects[0] === 'object'
        ? po.projects[0]._id
        : po.projects[0];
    }

    const clientId = Array.isArray(po.clients) && po.clients.length > 0
      ? po.clients[0]._id
      : "";

    setFormData((prev) => ({
      ...prev,
      ...po,
      projectsId: projectId ? [projectId] : [""],
      clientId: clientId ? [clientId] : [""],
      Notes: po.Notes || "",
      currency: po.currency || "USD",
      estimateDate: po.estimateDate ? po.estimateDate.substring(0, 10) : "",
      validUntil: po.validUntil ? po.validUntil.substring(0, 10) : "",
    }));

    if (Array.isArray(po.lineItems) && po.lineItems.length > 0) {
      setItems(po.lineItems);
    }
  }
}, [po, project?.data]);

  const [taxRate, setTaxRate] = useState(0.05);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

 const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    ...formData,
    VATRate: taxRate * 100,
    lineItems: items,
  };

  const isDuplicate = location.state?.isDuplicate;
  if (isDuplicate || !id) {
    dispatch(createCostEstimate(payload))
      .unwrap()
      .then(() => {
        toast.success("Estimates created successfully!");
        navigate('/CostEstimates', { state: { openTab: 'jobs' } });
      })
      .catch(() => {
        toast.error("Failed to create estimates");
      });
  } else {
    dispatch(updateCostEstimate({ id, data: payload }))
      .unwrap()
      .then(() => {
        toast.success("Estimates updated successfully!");
        navigate('/CostEstimates', { state: { openTab: 'jobs' } });
      })
      .catch(() => {
        toast.error("Failed to update estimates");
      });
  }
};

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Client</label>
              <select
                className="form-select"
                name="clientId"
                value={formData.clientId[0] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientId: [e.target.value],
                  })
                }
              >
                <option value="">Select Client</option>
                {Clients?.data?.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project</label>
              <select
                className="form-select"
                name="projectsId"
                value={formData.projectsId[0] || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedProject = project?.data?.find(p => p._id === selectedId);
                  setFormData({
                    ...formData,
                    projectsId: [selectedId],
                    projectName: selectedProject?.projectName || "",
                  });
                }}
              >
                <option value="">Select a project</option>
                {reversedProjectList.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.projectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Date</label>
              <input
                type="date"
                className="form-control"
                name="estimateDate"
                value={formData.estimateDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">PO Status</label>
              <select
                className="form-select"
                name="POStatus"
                value={formData.POStatus}
                onChange={handleFormChange}
              >
                {poStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleFormChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="fw-semibold mb-3">Line Items</h6>
          <div className="row fw-semibold text-muted mb-2 px-2">
            <div className="col-md-5">Description</div>
            <div className="col-md-2">Quantity</div>
            <div className="col-md-2">Rate</div>
            <div className="col-md-2">Amount</div>
            <div className="col-md-1 text-end"></div>
          </div>

          {items.map((item, index) => (
            <div
              className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
              key={index}
              style={{ background: "#f9f9f9", borderRadius: "8px" }}
            >
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <span>
                  {formData.currency} {item.amount.toFixed(2)}
                </span>
              </div>
              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn border rounded px-3 py-1 mb-4 text-dark"
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label">VAT Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={(taxRate * 100).toFixed(2)}
                onChange={(e) =>
                  setTaxRate(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) / 100)
                }
              />
              <div className="mt-3">
                Subtotal: {formData.currency} {subtotal.toFixed(2)}<br />
                VAT: {formData.currency} {tax.toFixed(2)}<br />
                <strong>Total: {formData.currency} {total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="4"
                name="Notes"
                value={formData.Notes}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to="/CostEstimates">
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;



















     {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects?.length || 0)} of {filteredProjects?.length || 0} entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                Next
              </button>
            </li>
          </ul>
        </div>
      )}