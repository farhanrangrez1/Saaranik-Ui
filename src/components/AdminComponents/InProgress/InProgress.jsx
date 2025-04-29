import React, { useState } from "react";
import { Button, Form, Table, ProgressBar, Pagination, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";

function InProgress() {
  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState({});

  const designers = [
    "Sarah Chen",
    "Mike Johnson",
    "Alex Wong",
    "John Smith",
    "Emma Davis"
  ];

  const jobs = [
    {
      id: "00001",
      project: "Package Redesign",
      designer: "Sarah Chen",
      timeSpent: "12h 30m",
      progress: 75,
      status: "Assigned",
      briefLogs: [
        "Initial sketches done",
        "Color palette approved"
      ]
    },
    {
      id: "00002",
      project: "Brand Guidelines",
      designer: "Mike Johnson",
      timeSpent: "8h 45m",
      progress: 45,
      status: "In Progress",
      briefLogs: [
        "Logo variations prepared",
        "Typography system drafted"
      ]
    },
    {
      id: "00003",
      project: "Marketing Materials",
      designer: "Alex Wong",
      timeSpent: "15h 20m",
      progress: 90,
      status: "Review",
      briefLogs: [
        "Posters finalized",
        "Social media banners created"
      ]
    }
  ];

  const handleDesignerClick = (job) => {
    setSelectedJob(job);
    setShowDesignerModal(true);
  };

  const handleDesignerChange = (newDesigner) => {
    if (selectedJob) {
      selectedJob.designer = newDesigner;
    }
    setShowDesignerModal(false);
  };

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const allJobs = jobs.reduce((acc, job) => {
      acc[job.id] = isChecked;
      return acc;
    }, {});
    setSelectedJobs(allJobs);
  };

  return (
    <div className="container bg-white p-4 mt-4 rounded shadow-sm">
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">In Progress Jobs</h5>
        <Button variant="dark" onClick={() => setShowDesignerModal(true)}>Change Designer</Button>
      </div>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <Form.Control type="text" placeholder="Search jobs..." className="w-auto" />
        <Form.Select className="w-auto">
          <option>All Designers</option>
        </Form.Select>
        <Form.Select className="w-auto">
          <option>All Status</option>
        </Form.Select>
      </div>

      {/* Table */}
      <div className="border-start border-end rounded-2 overflow-hidden">
        <Table hover responsive className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th>Job No</th>
              <th>Project</th>
              <th>Designer</th>
              <th>Time Spent</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Brief Logs</th>
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
                  <Link to="/OvervieJobsTracker" style={{ textDecoration: "none", color: "blue" }}>
                    {job.id}
                  </Link>
                </td>
                <td>{job.project}</td>
                <td onClick={() => handleDesignerClick(job)} style={{ cursor: 'pointer', color: 'darkblue' }}>
                  {job.designer}
                </td>
                <td>{job.timeSpent}</td>
                <td style={{ minWidth: '160px' }}>
                  <ProgressBar now={job.progress} label={`${job.progress}%`} variant="success" />
                </td>
                <td>{job.status}</td>
                <td>
                  {job.briefLogs.map((log, index) => (
                    <div key={index}>
                      <small>• {log}</small>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>Showing 1 to {jobs.length} of {jobs.length} in-progress jobs</div>
        <Pagination className="m-0">
          <Pagination.Prev disabled />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Next disabled />
        </Pagination>
      </div>

      {/* Change Designer Modal */}
      <Modal show={showDesignerModal} onHide={() => setShowDesignerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Designer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Choose Designer</Form.Label>
            <Form.Select onChange={(e) => handleDesignerChange(e.target.value)}>
              <option value="">Select designer...</option>
              {designers.map((designer, index) => (
                <option key={index} value={designer}>{designer}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default InProgress;