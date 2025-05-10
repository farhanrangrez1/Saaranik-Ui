import React, { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Form, Table, Pagination, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs } from "../../../redux/slices/JobsSlice";
import {
  FaFilePdf,
  FaUpload,
  FaLink,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";

function NewJobsList() {
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false); // ✅ For Reject
  const [selectedDesigner, setSelectedDesigner] = useState("");
// <<<<<<< HEAD

  const [selectedProduction, setSelectedProduction] = useState("");
  const [selectedAdditional, setSelectedAdditional] = useState("");
  const [description, setDescription] = useState("");
// =======
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState({});
  const [rejectionReason, setRejectionReason] = useState(""); // ✅ Rejection Reason
// >>>>>>> 7030ed47741b4a462cc3812504d13dbf81dfb9d2

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const jobs = [
    {
      id: "00001",
      project: "PackageRedesign",
      client: "AcmeCorp",
      brief: "Redesign...",
      date: "2024-02-20",
    },
    {
      id: "00002",
      project: "BrandGuidelines",
      client: "TechSolutions",
      brief: "Create...",
      date: "2024-02-19",
    },
    {
      id: "00003",
      project: "MarketingMaterials",
      client: "GlobalInc",
      brief: "Design...",
      date: "2024-02-18",
    },
  ];

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const handleShowDescription = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleAssignJob = (job) => {
    if (job === null) {
      const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
      if (selectedJobIds.length === 0) {
        setErrorMessage("Please select at least 1 job to assign.");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
    }
    setSelectedJob(job);
    setShowAssignModal(true);
  };

  const handleRejectJobs = () => {
    const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
    if (selectedJobIds.length === 0) {
      setErrorMessage("Please select at least 1 job to reject.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    // Success message
    setSuccessMessage("Jobs rejected successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);

    // Reset selected jobs after rejection
    setSelectedJobs({});
  };

  const handleSubmitAssignment = () => {
    console.log("Assigned job(s):", selectedJobs);
    setShowAssignModal(false);
    setSelectedDesigner("");
  };

  const handleSubmitRejection = () => {
    console.log("Rejected job(s):", selectedJobs, "Reason:", rejectionReason);
    setShowRejectModal(false);
    setRejectionReason("");
  };














  // ////////////////////////////////////////
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState("All Projects");
    const [selectedPriority, setSelectedPriority] = useState("All Priorities");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [selectedStage, setSelectedStage] = useState("All Stages");
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const id = location.state?.id || params.id;
  
    const { job } = useSelector((state) => state.jobs);
  
    useEffect(() => {
      dispatch(fetchjobs());
    }, [dispatch]);

  
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
  
  return (
    <div className="container bg-white p-4 mt-4 rounded shadow-sm">
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Job Assign</h5>
        <div className="d-flex gap-2">
          <Button onClick={handleRejectJobs} id="All_btn" variant="dark">
            Reject
          </Button>
          <Button onClick={() => handleAssignJob(null)} id="All_btn" variant="dark">
            + Assign
          </Button>
        </div>
      </div>

      {/* Show Messages */}
      {errorMessage && (
        <div className="alert alert-danger py-2" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success py-2" role="alert">
          {successMessage}
        </div>
      )}

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <Form.Control
          type="text"
          placeholder="Search jobs..."
          className="w-auto"
        />
        <Form.Select className="" style={{ width: "120px" }}>
          <option>All Clients</option>
        </Form.Select>
        
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

      {/* Table */}
     <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                <th>Priority</th>
                <th>Due Date</th>
                <th>Assign</th>
                <th>TimeLogged</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.slice().reverse().map((job, index) => (
                <tr key={job._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedJobs[job._id] || false}
                      onChange={() => handleCheckboxChange(job._id)}
                    />
                  </td>
                  <td>
                    <span
                      style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => JobDetails(job)}
                    >
                      {String(index + 1).padStart(4, '0')}
                    </span>
                  </td>
  
                  <td>{job.projectId?.[0]?.projectName || 'N/A'}</td>

                  <td>{job.brandName}</td>
                  <td>{job.subBrand}</td>
                  <td>{job.flavour}</td>
                  <td>{job.packType}</td>
                  <td>{job.packSize}</td>
                  <td>
                    <span className={getPriorityClass(job.priority)}>{job.priority}</span>
                  </td>
                  <td>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                  <td>{job.assign}</td>
                  <td>{job.totalTime}</td>
                  <td>
                    <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                      {job.Status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button id="icone_btn"  size="sm"><FaFilePdf /></Button>
                      <Button id="icone_btn"  size="sm"><FaUpload /></Button>
                      <Button id="icone_btn" size="sm"><FaLink /></Button>
                      <Button id="icone_btn"  size="sm"><FaClock /></Button>
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
      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <div>Showing 1 to 3 of 12 entries</div>
        <Pagination className="m-0">
          <Pagination.Prev disabled />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>

      {/* Assign Modal */}
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
                <option value="designer1">Production</option>
                <option value="designer2">Designer</option>
              </Form.Select>
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

      {/* Reject Modal */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-warning">
            Are you sure you want to reject this job?
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Reason for Rejection</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmitRejection}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewJobsList;
