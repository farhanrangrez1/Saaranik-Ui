import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Form, Table, Pagination, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

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
        <Form.Select className=""style={{ width: "130px" }}>
          <option>All Projects</option>
        </Form.Select>
      </div>

      {/* Table */}
      <Table hover responsive className="align-middle">
        <thead className="table-light">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => {
                  const isChecked =
                    Object.keys(selectedJobs).length === jobs.length;
                  const newSelectedJobs = {};
                  jobs.forEach((job) => (newSelectedJobs[job.id] = !isChecked));
                  setSelectedJobs(newSelectedJobs);
                }}
              />
            </th>
            <th>JobNo</th>
            <th>Brand</th>
            <th>SubBrand</th>
            <th>Flavour</th>
            <th>PackType</th>
            <th>PackSize</th>
            <th>PackCode</th>
            <th>Brief</th>
            <th>DateReceived</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedJobs[job.id] || false}
                  onChange={() => handleCheckboxChange(job.id)}
                />
              </td>
              <td>
                <Link to={"/OvervieJobsTracker"}>{job.id}</Link>
              </td>
              <td>{job.project}</td>
              <td>{job.client}</td>
              <td>Flavour1</td>
              <td>Type1</td>
              <td>Size1</td>
              <td>Code1</td>
              <td>
                <FaEye
                  className="text-primary me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShowDescription(job)}
                  title="View Description"
                />
              </td>
              <td>{job.date}</td>
              <td>
                <div className="d-flex gap-2">
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAssignButtonClick()}
                  >
                    Assign
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
