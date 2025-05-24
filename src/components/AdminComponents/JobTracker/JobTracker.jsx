import React, { useEffect, useState } from "react";
import { Button, Form, Table, Dropdown } from "react-bootstrap";
import {
  FaFilePdf,
  FaUpload,
  FaLink,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs } from "../../../redux/slices/JobsSlice";
import Swal from "sweetalert2";

function JobTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedJobs, setSelectedJobs] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;

  const { job, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prevSelectedJobs) => ({
      ...prevSelectedJobs,
      [jobId]: !prevSelectedJobs[jobId],
    }));
  };

  const getPriorityClass = (priority) => {
    switch ((priority || "").toLowerCase()) {
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

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase().trim()) {
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

  // ✅ Filter jobs from Redux store
  const filteredJobs = (job?.jobs || []).filter((j) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      j.jobNumber?.toLowerCase().includes(search) ||
      j.project?.projectName?.toLowerCase().includes(search) ||
      j.brandName?.toLowerCase().includes(search) ||
      j.subBrand?.toLowerCase().includes(search) ||
      j.flavour?.toLowerCase().includes(search) ||
      j.packType?.toLowerCase().includes(search) ||
      j.packSize?.toLowerCase().includes(search);

    const matchesProject =
      selectedProject === "All Projects" ||
      j.project?.projectName === selectedProject;

    const matchesPriority =
      selectedPriority === "All Priorities" ||
      j.priority?.toLowerCase() === selectedPriority.toLowerCase();

    const matchesStatus =
      selectedStatus === "All Status" ||
      j.Status?.toLowerCase() === selectedStatus.toLowerCase();



    return (
      matchesSearch &&
      matchesProject &&
      matchesPriority &&
      matchesStatus
    );
  });

  const handleUpdate = (job) => {
    navigate(`/AddJobTracker`, { state: { job } });
  };


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = job?.jobs || [];
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    const JobDetails = (job) => {
    navigate(`/OvervieJobsTracker`, { state: { job } });
  }

  return (
    <div className="p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="job-title mb-0">Job Tracker</h2>
      </div>

      {/* Filters */}
      <div className="filters d-flex flex-wrap gap-2 mb-4">
        <Form.Control
          type="search"
          placeholder="Search by Job #, Project Name, Brand, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "250px" }}
        />

        <Dropdown>
          <Dropdown.Toggle variant="light" id="project-dropdown">
            {selectedProject}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedProject("All Projects")}>All Projects</Dropdown.Item>
            {job?.jobs?.map((j, i) => (
              <Dropdown.Item key={i} onClick={() => setSelectedProject(j.project?.projectName || "N/A")}>
                {j.project?.projectName || "N/A"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="light" id="priority-dropdown">
            {selectedPriority}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {["All Priorities", "High", "Medium", "Low"].map((item) => (
              <Dropdown.Item key={item} onClick={() => setSelectedPriority(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="light" id="status-dropdown">
            {selectedStatus}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {["All Status", "In Progress", "Review", "Not Started", "Completed"].map((item) => (
              <Dropdown.Item key={item} onClick={() => setSelectedStatus(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

      </div>

      {/* Table */}
      <div className="table-responsive" >
        <Table hover className="align-middle sticky-header">
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
              <th>Due Date</th>
              <th>Assign</th>
              <th>TimeLogged</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjects.slice().reverse().map((job, index) => (
              <tr key={job._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJobs[job._id] || false}
                    onChange={() => handleCheckboxChange(job._id)}
                  />
                </td>
                  <td onClick={() => JobDetails(job)}>
                                  <Link>
                                    {String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0')}</Link>
                                </td>

                <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>

                <td>{job.brandName}</td>
                <td style={{ whiteSpace: "nowrap" }}>{job.subBrand}</td>
                <td>{job.flavour}</td>
                <td>{job.packType}</td>
                <td>{job.packSize}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job?.packCode}</td>
                <td>
                  <span className={getPriorityClass(job.priority)}>{job.priority}</span>
                </td>
                <td>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                <td>{job.assign}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                    {job.Status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button id="icone_btn" size="sm"><FaFilePdf /></Button>
                    <Button id="icone_btn" size="sm"><FaUpload /></Button>
                    <Button id="icone_btn" size="sm"><FaLink /></Button>
                    <Button id="icone_btn" size="sm"><FaClock /></Button>
                    <Button
                      id="icone_btn"
                      size="sm"
                      onClick={() => handleUpdate(job)}
                    >
                      <FaEdit />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedProjects.length} of {filteredProjects.length} entries
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
    </div>
  );
}

export default JobTracker;
