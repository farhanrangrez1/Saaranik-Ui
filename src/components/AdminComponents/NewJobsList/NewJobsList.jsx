import React, { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Form, Table, Pagination, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs, UpdateJobAssign } from "../../../redux/slices/JobsSlice";
import {
  FaFilePdf,
  FaUpload,
  FaLink,
  FaClock,
  FaEdit,
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import Swal from 'sweetalert2';

function NewJobsList() {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProduction, setSelectedProduction] = useState('');
  const [selectedAdditional, setSelectedAdditional] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
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
    setSelectedJobs({});
  };

  const handleSubmitRejection = () => {
    console.log("Rejected job(s):", selectedJobs, "Reason:", rejectionReason);
    setShowRejectModal(false);
    setRejectionReason("");
  };


  // ///
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
    handleJobAssign(selectedJobIds, selectedDesigner);
    setShowAssignModal(false);
    setSelectedProduction('');
    setSelectedAdditional('');
    setSelectedJob(null);
    setSelectedDesigner('');
    setAssignmentDescription('');
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
    <div className="container bg-white p-4 mt-4 rounded shadow-sm">
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Job Assign</h5>
        <div className="d-flex gap-2 ">
          <Button onClick={handleRejectJobs} id="All_btn" className="m-2"
            variant="primary">
            Reject
          </Button>
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
                handleJobAssign(selectedJobIds); 
                setShowAssignModal(true);
              }
            }}
          >
            Assign
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
              <th>JobNo</th>
              <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
              <th>Brand</th>
              <th style={{ whiteSpace: 'nowrap' }}>Sub Brand</th>
              <th>Flavour</th>
              <th>PackType</th>
              <th>PackSize</th>
              <th>TimeLogged</th>
              <th>Due Date</th>
              <th>Assign</th>
              <th>Priority</th>
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

                <td style={{ whiteSpace: 'nowrap' }}>{job.brandName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.packType}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.packSize}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.assign}</td>
                <td>
                  <span className={getPriorityClass(job.priority)}>{job.priority}</span>
                </td>
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
