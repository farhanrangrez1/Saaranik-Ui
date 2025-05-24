import React, { useEffect, useState } from 'react';
import { LuDownload, LuEye, LuRotateCcw } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchjobs } from '../../../redux/slices/JobsSlice';


import { Button, Form, Table, ProgressBar, Pagination, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

import {

  FaDownload,
  FaEye
} from "react-icons/fa";

import { Dropdown } from "react-bootstrap";

function Completed_Jobs() {
  const [selectedJobs, setSelectedJobs] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (jobNumber) => {
    setSelectedJobs((prevSelectedJobs) => ({
      ...prevSelectedJobs,
      [jobNumber]: !prevSelectedJobs[jobNumber],
    }));
    setError(''); // Reset error if user selects something
  };

  const isAnySelected = Object.values(selectedJobs).some(Boolean);

  const handleReturnClick = () => {
    if (isAnySelected) {
      navigate("/jobsView");
    } else {
      setError("Please select at least one job before proceeding.");
    }
  };

  const jobData = [
    {
      jobNumber: "00001",
      brand: "Brand1",
      subBrand: "SubBrand1",
      flavour: "Flavour1",
      type: "Type1",
      size: "Size1ml",
      code: "Code1",
      completed: "2023-12-15",
      timeSpent: "2h 15m",
      budget: "2h 15m",
      designer: "SarahChen",
    },
    {
      jobNumber: "00002",
      brand: "Brand2",
      subBrand: "SubBrand2",
      flavour: "Flavour2",
      type: "Type2",
      size: "Size2ml",
      code: "Code2",
      completed: "2023-12-14",
      timeSpent: "3h 30m",
      budget: "3h 30m",
      designer: "MikeJohnson",
    },
    {
      jobNumber: "00003",
      brand: "Brand3",
      subBrand: "SubBrand3",
      flavour: "Flavour3",
      type: "Type3",
      size: "Size 3ml",
      code: "Code3",
      completed: "2023-12-13",
      timeSpent: "2h 45m",
      budget: "2h 45m",
      designer: "AlexWong",
    },
  ];















  // ////////////////////


  // //////////////////
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("completed");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  // const [selectedJobs, setSelectedJobs] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;

  const { job, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  // const handleCheckboxChange = (jobId) => {
  //   setSelectedJobs((prevSelectedJobs) => ({
  //     ...prevSelectedJobs,
  //     [jobId]: !prevSelectedJobs[jobId],
  //   }));
  // };

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

    const matchesStage =
      selectedStage === "All Stages" ||
      j.stage?.toLowerCase() === selectedStage.toLowerCase();

    return (
      matchesSearch &&
      matchesProject &&
      matchesPriority &&
      matchesStatus &&
      matchesStage
    );
  });

  const handleUpdate = (job) => {
    navigate(`/AddJobTracker`, { state: { job } });
  };

  const JobDetails = (job) => {
    navigate(`/OvervieJobsTracker`, { state: { job } });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = (job?.jobs || []).filter(j => (j?.Status || "").toLowerCase() === "completed");
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Completed Jobs</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">Back to Designer</button>
          <button
            className="btn btn-primary"
            onClick={handleReturnClick}
          >
            Return Completed Jobs
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card p-3">
        {/* Filters Section */}
        <div className="row mb-3 align-items-center">
          <div className="col-lg-9 col-md-8 col-sm-12 d-flex flex-wrap gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              style={{ width: "200px" }}
            />
            <select className="form-select" style={{ width: "160px" }}>

              <option>All Time Periods</option>
            </select>
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
          </div>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
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
                <th style={{ whiteSpace: 'nowrap' }}>PackCode</th>
                <th>Priority</th>
                <th style={{ whiteSpace: "nowrap" }}>Date Completed</th>
                <th>Assign</th>
                <th>TimeLogged</th>
                <th style={{ whiteSpace: "nowrap" }}>Time Budget</th>
                <th style={{ whiteSpace: "nowrap" }}>Time Spent</th>
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

                  <td>{job.projectId?.[0]?.projectName || 'N/A'}</td>

                  <td>{job.brandName}</td>
                  <td>{job.subBrand}</td>
                  <td>{job.flavour}</td>
                  <td>{job.packType}</td>
                  <td>{job.packSize}</td>
                   <td style={{ whiteSpace: 'nowrap' }}>{job?.packCode}</td>
                  <td>
                    <span className={getPriorityClass(job.priority)}>{job.priority}</span>
                  </td>
                  
                  <td>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                  <td onClick={() => handleDesignerClick(job)} style={{ cursor: 'pointer', color: 'darkblue' }}>
                    {job.assign}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                  <th>2h 15m</th>
                  <th>3h 30m</th>
                  <td>
                    <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                      {job.Status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">

                      <Button id="icone_btn" size="sm" >
                        <FaEye />
                      </Button>
                      <Button id="icone_btn" size="sm" >
                        <FaDownload />
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
    </div>
  );
}

export default Completed_Jobs;
