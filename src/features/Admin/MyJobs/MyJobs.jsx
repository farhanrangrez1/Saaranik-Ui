import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button, Form, Table, Pagination, Badge, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs } from "../../../redux/slices/JobsSlice";
import {
  FaFilePdf,
  FaUpload,
  FaLink,
  FaClock,
  FaEdit,
  FaFilter,
} from "react-icons/fa";

function MyJobs() {
  const [showTimesheetModal, setShowTimesheetModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState("");
  const [showFilters, setShowFilters] = useState(false); // 👈 For responsive toggle

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReturnJob = () => {
    const hasTimesheet = false;
    if (!hasTimesheet) {
      alert('This jobs is send to the production');
      return;
    }
  };

  const handleUpload = (jobId) => {
    console.log('Upload for job:', jobId);
  };

  const handleLogTime = (jobId) => {
    setSelectedJobId(jobId);
    setShowTimesheetModal(true);
  };

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const allJobs = jobs.reduce((acc, job) => {
      acc[job.id] = isChecked;
      return acc;
    }, {});
    setSelectedJobs(allJobs);
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
      case "cancelled":
        return "bg-dark text-white";
    }
  };

  const { job, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = job?.jobs || [];
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopyFileName = (job, index, currentPage, itemsPerPage) => {
    const displayId = String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0');
    const fileName = `${displayId}_${job.projectName || ''}__${job.brandName || ''}_${job.subBrand || ''}_${job.flavour || ''}_${job.packType || ''}_${job.packSize || ''}_${job.packCode || ''}_${job.priority || ''}_${job.dueDate || ''}_${job.assign || ''}_${job.timeLogged || ''}_${job.status || ''}`;

    navigator.clipboard.writeText(fileName)
      .then(() => alert("Copied to clipboard: " + fileName))
      .catch((err) => console.error("Failed to copy!", err));
  };

  return (
    <div className="p-4 m-2" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <h5 className="fw-bold mb-3 text-start">My Jobs</h5>

      {/* Toggle Filter Button for Mobile */}
      <div className="d-lg-none mb-2 text-end">
        <Button
          variant="primary"
          size="sm"
          className="fw-bold shadow-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter className="me-1" />
          Filter
        </Button>
      </div>


      {/* Filters and Actions */}
      <Row className={`mb-3 align-items-center ${showFilters ? "" : "d-none d-lg-flex"}`}>
        <Col xs={12} lg={9} className="d-flex flex-wrap gap-2 mb-2 mb-lg-0">
          <Form.Control
            type="text"
            placeholder="Search jobs..."
            className="flex-grow-1"
            style={{ minWidth: "150px", maxWidth: "200px" }}
          />
          <Form.Select className="flex-shrink-0" style={{ minWidth: "140px", maxWidth: "160px" }}>
            <option>All Status</option>
          </Form.Select>
          <Form.Select className="flex-shrink-0" style={{ minWidth: "140px", maxWidth: "160px" }}>
            <option>All Deadlines</option>
          </Form.Select>
        </Col>

        <Col xs={12} lg={3} className="text-lg-end d-flex flex-wrap justify-content-lg-end gap-2">
          <Button id="All_btn" variant="dark" className="w-lg-auto" onClick={handleReturnJob}>
            Return Job
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <div className="table-responsive">
        <Table hover className="align-middle sticky-header">
          <thead className="bg-light">
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} /></th>
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
                <td><input type="checkbox" onChange={handleSelectAll} /></td>
                <td><Link>{String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0')}</Link></td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                <td>{job.brandName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                <td>{job.flavour}</td>
                <td>{job.packType}</td>
                <td>{job.packSize}</td>
                <td>{job.packCode}</td>
                <td><span className={getPriorityClass(job.priority)}>{job.priority}</span></td>
                <td>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                <td>{job.assign}</td>
                <td>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                    {job.Status}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Button
                    size="sm"
                    variant="dark"
                    className="me-2 d-flex"
                    onClick={handleUploadClick}
                    id="All_btn"
                  >
                    <FaUpload className="me-1" />
                    Upload
                  </Button>
                  <Link to={"/admin/MyJobsHolidayPackageDesign"}>
                    <Button id="All_btn" size="sm" variant="dark" onClick={() => handleLogTime(job.id)}>
                      LogTime
                    </Button>
                  </Link>
                  <Button
                    id="All_btn"
                    size="sm"
                    variant="dark"
                    onClick={() => handleCopyFileName(job, index, currentPage, itemsPerPage)}
                  >
                    CopyFN
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Brief Modal */}
      <Modal show={showBriefModal} onHide={() => setShowBriefModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Job Brief</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedBrief}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBriefModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pagination */}
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} of {filteredProjects.length}
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

export default MyJobs;
