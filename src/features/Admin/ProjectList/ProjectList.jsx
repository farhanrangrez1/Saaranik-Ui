import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Row, Col, Card, Modal, Form, Dropdown, Spinner } from 'react-bootstrap';
import { FaEye, FaEdit, FaUpload, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Project.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteproject, fetchProject } from '../../../redux/slices/ProjectsSlice';
import Swal from 'sweetalert2';
import { fetchClient } from '../../../redux/slices/ClientSlice';
import { Project_job_Id } from '../../../redux/slices/JobsSlice';

function ProjectList() {
  const [activeTab, setActiveTab] = useState('Active Project');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // 👈 Add search state

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { project, loading, error } = useSelector((state) => state.projects);
  const [selectedJobs, setSelectedJobs] = useState({});

  const tabs = [
    'Active Project',
    'In Progress',
    'Completed',
    'Closed',
    'Cancelled',
    'On Hold',
    'All',
  ];

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const filteredProjects = (
    activeTab === 'All'
      ? project.data
      : activeTab === 'Completed (To Be Invoiced)'
        ? project.data?.filter(
          (project) => project.status === 'Completed' && !project.invoiceCreated
        )
        : project.data?.filter((project) => project.status === activeTab)
  )?.filter((project) => {
    // Split searchTerm by spaces, ignore empty terms
    const terms = searchTerm.trim().split(/\s+/).filter(Boolean);
    // If no search terms, include all
    if (terms.length === 0) return true;
    // Prepare searchable fields as strings
    const fields = [
      project.projectName,
      project.projectNo,
      project.description,
      project.client,
      project.startDate ? new Date(project.startDate).toLocaleDateString('en-GB').replace(/\/20/, '/') : '',
      project.endDate ? new Date(project.endDate).toLocaleDateString('en-GB').replace(/\/20/, '/') : '',
      project.projectRequirements && project.projectRequirements.length > 0
        ? Object.entries(project.projectRequirements[0])
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
          .join(', ')
        : ''
    ].map(f => (f || '').toString().toLowerCase());
    // Every term must be found in at least one field
    return terms.every(term =>
      fields.some(field => field.includes(term.toLowerCase()))
    );
  });

  const handleCheckboxChange = (projectId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleDelete = (id) => {
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
        dispatch(deleteproject(id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchProject());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  }

  const handleUpdate = (project) => {
    navigate(`/admin/AddProjectList`, { state: { project } });
  };

  // const CreatJobs = (id) => {
  //   navigate(`/admin/ProjectOverview/${id}`, { state: { id, openTab: 'jobs' } });
  // };

  const CreatJobs = (project) => {
    navigate(`/admin/ProjectOverview/${project.id}`, {
      state: {
        id: project.id,
        openTab: 'jobs',
        projectDatah: project
      }
    });
  };

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase().trim()) {
      case "active project":
        return "bg-primary text-white";
      case "in progress":
      case "in_progress":
        return "bg-warning text-dark";
      case "completed":
        return "bg-success text-white";
      case "closed":
        return "bg-dark text-white";
      case "cancelled":
        return "bg-danger text-white";
      case "on hold":
        return "bg-info text-dark";
      case "review":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      case "open":
        return "bg-primary text-white";
      default:
        return "bg-light text-dark";
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil((filteredProjects?.length || 0) / itemsPerPage);
  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="project-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold">Project List</h5>
      </div>

      {/* Search and Actions */}
      <div className="mb-4">
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 👈 Handle input
            />
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-md-end gap-2">
            <Button variant="outline-secondary" size="sm">
              <FaUpload className="me-1" /> Import
            </Button>
            <Link to={"/admin/AddProjectList"}>
              <Button id="All_btn" variant="dark" size="sm">
                <FaPlus className="me-1" /> Add project
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Project Status Tabs */}
      <div className="project-tabs mb-4">
        <ul className="nav nav-tabs d-none d-md-flex">
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

        <div className="d-flex d-md-none">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-tabs" className="w-100">
              {activeTab}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {tabs.map((tab) => (
                <Dropdown.Item
                  key={tab}
                  active={tab === activeTab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <div className="mt-2">Loading projects...</div>
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="text-danger text-center my-5">
          Failed to load projects. Please try again later.
        </div>
      )}

      {/* Projects Table */}
      {!loading && !error && filteredProjects?.length > 0 && (
        <Table responsive className="project-table mb-4">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={() => {
                    const isChecked =
                      Object.keys(selectedJobs).length === project.data.length;
                    const newSelectedJobs = {};
                    project.data.forEach((project) => {
                      newSelectedJobs[project.id] = !isChecked;
                    });
                    setSelectedJobs(newSelectedJobs);
                  }}
                />
              </th>
              <th style={{ whiteSpace: 'nowrap' }}>Project No</th>
              <th style={{ textWrap: 'nowrap' }}>Project Name</th>
              <th>Description</th>
              <th style={{ whiteSpace: 'nowrap' }}>Start Date</th>
              <th style={{ whiteSpace: 'nowrap' }}>End Date</th>
              <th>Client</th>
              <th style={{ whiteSpace: 'nowrap' }}>project Requirements</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjects.slice().reverse().map((project, index) => (
              <tr key={project.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJobs[project.id] || false}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                </td>
                {/* <td onClick={() => CreatJobs(project.id)}>
                  <Link style={{ textDecoration: 'none' }}>{project.projectNo}</Link>
                </td> */}
                <td onClick={() => CreatJobs(project)}>
                  <Link style={{ textDecoration: 'none' }}>{project.projectNo}</Link>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{project.projectName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{project.description}</td>
                <td>{new Date(project.startDate).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                <td>{new Date(project.endDate).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{project?.clientId.clientName}</td>
                <th>
                  {project.projectRequirements && project.projectRequirements.length > 0
                    ? Object.entries(project.projectRequirements[0])
                      .filter(([_, value]) => value === true)
                      .map(([key]) => key)
                      .join(', ')
                    : 'N/A'}
                </th>
                <td>
                  <span className={`badge ${getStatusClass(project.status)} px-2 py-1`}>
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons d-flex">
                    <Button style={{ color: "#0d6efd" }} variant="link" className="p-0 me-2" onClick={() => handleUpdate(project)}>
                      <FaEdit />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Pagination */}
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing 1 to {filteredProjects?.length || 0} of {project.data?.length || 0} entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                <span aria-hidden="true">&laquo;</span>
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
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
