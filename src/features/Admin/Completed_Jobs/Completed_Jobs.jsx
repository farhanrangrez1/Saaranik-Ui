import React, { useEffect, useState } from 'react';
import { LuDownload, LuEye, LuRotateCcw } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchjobs, filterStatus } from '../../../redux/slices/JobsSlice';
import { Button, Form, Table, ProgressBar, Pagination, Modal, Dropdown, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComments, FaDownload, FaEye } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

function Completed_Jobs() {
  const [selectedJobs, setSelectedJobs] = useState({});
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
    setError('');
  };

  const { job, loading, } = useSelector((state) => state.jobs);
  const [Status, setStatus] = useState("completed");

  useEffect(() => {
    dispatch(filterStatus(Status));
  }, [dispatch, Status]);

  const isAnySelected = Object.values(selectedJobs).some(Boolean);

  const handleReturnClick = () => {
    if (isAnySelected) {
      navigate("/admin/jobsView");
    } else {
      setError("Please select at least one job before proceeding.");
    }
  };

  const getPriorityClass = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high": return "text-danger";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "";
    }
  };

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase().trim()) {
      case "review": return "bg-info text-dark";
      case "not started": return "bg-secondary text-white";
      case "completed": return "bg-success text-white";
      case "open": return "bg-primary text-white";
      default: return "bg-light text-dark";
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const handleUpdate = (job) => {
    navigate(`/admin/AddJobTracker`, { state: { job } });
  };

  const JobDetails = (job) => {
    navigate(`/admin/OvervieJobsTracker`, { state: { job } });
  };

  const handleDesignerClick = (job) => {
    // Placeholder: Add your logic here
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = (job?.jobs || []).filter((j) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      (j.JobNo?.toString().toLowerCase().includes(search) || false) ||
      (j.projectId?.[0]?.projectName?.toLowerCase().includes(search) || false) ||
      (j.brandName?.toLowerCase().includes(search) || false) ||
      (j.subBrand?.toLowerCase().includes(search) || false) ||
      (j.flavour?.toLowerCase().includes(search) || false) ||
      (j.packType?.toLowerCase().includes(search) || false) ||
      (j.packSize?.toLowerCase().includes(search) || false) ||
      (j.packCode?.toLowerCase().includes(search) || false);

    const matchesProject =
      selectedProject === "All Projects" ||
      (j.projectId?.[0]?.projectName?.toLowerCase() === selectedProject.toLowerCase());

    return matchesSearch && matchesProject;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h4>Completed Jobs</h4>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          {/* <button className="btn btn-outline-primary">Back to Designer</button> */}
          <button className="btn btn-primary" onClick={handleReturnClick}>
            Return Completed Jobs
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-3">
        {/* Responsive Toggle Button */}
        <div className="d-md-none mb-3">
          <button className="btn btn-outline-secondary w-100" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>


        {/* Filters */}
        <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
          <Form.Control
            type="search"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "250px" }}
          />
          <Dropdown>
            <Dropdown.Toggle variant="light" id="project-dropdown">
              {selectedProject}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedProject("All Projects")}>
                All Projects
              </Dropdown.Item>
              {[...new Set((job?.jobs || []).map((j) => j.projectId?.[0]?.projectName || "N/A"))].map(
                (projectName, index) => (
                  <Dropdown.Item key={index} onClick={() => setSelectedProject(projectName)}>
                    {projectName}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th><input type="checkbox" /></th>
                <th>JobNo</th>
                <th>ProjectName</th>
                <th>Brand</th>
                <th>SubBrand</th>
                <th>Flavour</th>
                <th>PackType</th>
                <th>PackSize</th>
                <th>PackCode</th>
                <th>Priority</th>
                <th style={{ whiteSpace: "nowrap" }}>Date Completed</th>
                <th>Assign</th>
                <th>TimeLogged</th>
                <th style={{ whiteSpace: "nowrap" }}>Time Budget</th>
                <th style={{ whiteSpace: "nowrap" }}>Time Spent</th>
                <th>Status</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.length > 0 ? (
                paginatedProjects.slice().reverse().map((job, index) => (
                  <tr key={job._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedJobs[job._id] || false}
                        onChange={() => handleCheckboxChange(job._id)}
                      />
                    </td>
                    <td onClick={() => JobDetails(job)}>
                      <Link style={{ textDecoration: 'none' }}>{job.JobNo}</Link>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                    <td>{job.brandName}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{job.subBrand}</td>
                    <td>{job.flavour}</td>
                    <td>{job.packType}</td>
                    <td>{job.packSize}</td>
                    <td>{job.packCode}</td>
                    <td><span className={getPriorityClass(job.priority)}>{job.priority}</span></td>
                    <td>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                    <td onClick={() => handleDesignerClick(job)} style={{ whiteSpace: 'nowrap', cursor: 'pointer', color: 'darkblue' }}>
                      {job.assign}
                    </td>
                    <td>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>2h 15m</td>
                    <td>3h 30m</td>
                    <td>
                      <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                        {job.Status}
                      </span>
                    </td>
                    {/* <td>
                      <div className="d-flex gap-2">
                        <Button id="icone_btn" size="sm"><FaEye /></Button>
                        <Button id="icone_btn" size="sm"><FaDownload /></Button>
                      </div>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" className="text-center text-muted py-4">
                    No completed jobs found.
                  </td>
                </tr>
              )}
            </tbody>

          </Table>
        </div>

        {!loading && !error && (
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <div className="text-muted small">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedProjects.length} of {filteredProjects.length}
            </div>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                  &raquo;
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Completed_Jobs;
