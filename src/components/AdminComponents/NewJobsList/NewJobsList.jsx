import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Form, Table, Pagination, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function NewJobsList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState("");


  const [selectedProduction, setSelectedProduction] = useState("");
  const [selectedAdditional, setSelectedAdditional] = useState("");
  const [description, setDescription] = useState("");

  const jobs = [
    {
      id: "00001",
      project: "PackageRedesign",
      client: "AcmeCorp",
      brief: "Redesign product packaging for summer collection...",
      date: "2024-02-20",
    },
    {
      id: "00002",
      project: "BrandGuidelines",
      client: "TechSolutions",
      brief: "Create comprehensive brand guidelines document...",
      date: "2024-02-19",
    },
    {
      id: "00003",
      project: "MarketingMaterials",
      client: "GlobalInc",
      brief: "Design new marketing collateral for Q2 campaign...",
      date: "2024-02-18",
    },
  ];

  const [selectedJobs, setSelectedJobs] = useState({});

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
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
    setSelectedJob(job);
    setShowAssignModal(true);
  };

  const handleSubmitAssignment = () => {
    console.log("Assigned job:", {
      job: selectedJob,
      productionManager: selectedProduction,
      designer: selectedAdditional,
      description,
    });

    // Close modal and reset
    setShowAssignModal(false);
    setSelectedProduction("");
    setSelectedAdditional("");
    setDescription("");
  };

  return (
    <div className="container bg-white p-4 mt-4 rounded shadow-sm">
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Job Assign</h5>
        <div className="d-flex gap-2">
          <Link to={""}>
            <Button id="All_btn" variant="dark">
              Reject
            </Button>
          </Link>
          <Button
            onClick={() => handleAssignJob(null)}
            id="All_btn"
            variant="dark"
          >
            + Assign
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <Form.Control type="text" placeholder="Search jobs..." className="w-auto" />
        <Form.Select className="w-auto">
          <option>All Clients</option>
        </Form.Select>
        <Form.Select className="w-auto">
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
                  const isChecked = Object.keys(selectedJobs).length === jobs.length;
                  const newSelectedJobs = {};
                  jobs.forEach((job) => {
                    newSelectedJobs[job.id] = !isChecked;
                  });
                  setSelectedJobs(newSelectedJobs);
                }}
              />
            </th>
            <th style={{ whiteSpace: "nowrap" }}>Job No</th>
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
                    onClick={() => handleAssignJob(job)}
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

      {/* Description Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Job Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <p><strong>Job ID:</strong> {selectedJob.id}</p>
              <p><strong>Project:</strong> {selectedJob.project}</p>
              <p><strong>Client:</strong> {selectedJob.client}</p>
              <p><strong>Description:</strong></p>
              <p>{selectedJob.brief}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assign Job Modal */}
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
    <option value="">-- Select Designer --</option>
    <option value="designer1">Raj Sharma</option>
    <option value="designer2">Pooja Verma</option>
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
    </div>
  );
}

export default NewJobsList;
