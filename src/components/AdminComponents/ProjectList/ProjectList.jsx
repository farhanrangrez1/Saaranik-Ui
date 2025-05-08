import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Row, Col, Card, Modal, Form, Dropdown, Spinner } from 'react-bootstrap';
import { FaEye, FaEdit, FaUpload, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Project.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteproject, fetchProject } from '../../../redux/slices/ProjectsSlice';
import Swal from 'sweetalert2';

function ProjectList() {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { project, loading, error } = useSelector((state) => state.projects);
  const [selectedJobs, setSelectedJobs] = useState({});

  const tabs = [
    'All',
    'Active Project',
    'In Progress',
    'Completed',
    'Closed',
    'Cancelled',
    'On Hold',
    'Completed (To Be Invoiced)',
  ];

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const filteredProjects =
    activeTab === 'All'
      ? project.data
      : activeTab === 'Completed (To Be Invoiced)'
        ? project.data?.filter(
          (project) => project.status === 'Completed' && !project.invoiceCreated
        )
        : project.data?.filter((project) => project.status === activeTab);

  const handleCheckboxChange = (projectId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const handleDelete = (id) => {
    console.log(id);
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
    navigate(`/AddProjectList`, { state: { project } });
  };
  const CreatJobs =(id)=>{
    navigate(`/ProjectOverview`, { state: {id} });
  }
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
            <Button id="All_btn" variant="dark" size="sm">
              <FaPlus className="me-1" /> Add project
            </Button>
          </Link>
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
              <th style={{ whiteSpace: 'nowrap' }}>Total Time logged</th>
              <th>Client</th>
              <th style={{ whiteSpace: 'nowrap' }}>project Requirements</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.slice().reverse().map((project, index) => (
              <tr key={project.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJobs[project.id] || false}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                </td>
                <td onClick={()=>CreatJobs(project.id)}>
                  <Link>
                    {String(index + 1).padStart(4, '0')}
                  </Link>
                </td>
                <td>{project.projectName}</td>
                <td>{project.description}</td>
                <td>{new Date(project.startDate).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                <td>{new Date(project.endDate).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                <td>{project.totalTime}</td>
                <td>{project.client}Client</td>
                <th>
                  {project.projectRequirements && project.projectRequirements.length > 0
                    ? Object.entries(project.projectRequirements[0])
                      .filter(([_, value]) => value === true)
                      .map(([key]) => key)
                      .join(', ')
                    : 'N/A'}
                </th>

                <td>
                  <Button
                    id='All_btn'
                    variant="success"
                    style={{ width: "130px" }}
                    size="sm"
                  >
                    {project.status || "Active"}
                  </Button>
                </td>
                <td>
                  <div className="action-buttons d-flex">
                    {/* <Button style={{ color: "#0d6efd" }} variant="link" className="p-0 me-2">
                      <FaEye />
                    </Button> */}
                    <Button style={{ color: "#0d6efd" }} variant="link" className="p-0 me-2" onClick={() => handleUpdate(project)}>
                      <FaEdit />
                    </Button>
                    <Button
                      style={{ color: "red" }}
                      variant="link"
                      className="p-0"
                      onClick={() => handleDelete(project.id)}
                    >
                      <FaTrash />
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
      )}
    </div>
  );
}

export default ProjectList;
