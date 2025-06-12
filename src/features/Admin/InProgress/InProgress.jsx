import { useEffect, useState } from "react";
import { Form, Table, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchjobs, filterStatus } from "../../../redux/slices/JobsSlice";
import { Dropdown } from "react-bootstrap";

function InProgress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;

  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("In Progress");

  const designers = [
    "Sarah Chen",
    "Mike Johnson",
    "Alex Wong",
    "John Smith",
    "Emma Davis"
  ];

  const { job, loading, error } = useSelector((state) => state.jobs);
  console.log("erjhgkjwerfgkelgbwer",job);
  
   const [Status, setStatus] = useState("in_progress");

  useEffect(() => {
    dispatch(filterStatus(Status)); // use variable here
  }, [dispatch, Status]);

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
    }
  };

  const handleUpdate = (job) => {
    navigate(`/admin/AddJobTracker`, { state: { job } });
  };

  const JobDetails = (job) => {
    navigate(`/admin/OvervieJobsTracker`, { state: { job } });
  }


const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const filteredProjects = job?.jobs || [];
const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

const paginatedProjects = filteredProjects.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  return (
    <div className="container bg-white p-4 mt-4 rounded shadow-sm">
      {/* Title */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0">Jobs In Progress </h5>
        {/* <Button id="All_btn" variant="dark" onClick={() => setShowDesignerModal(true)}>Change Designer</Button> */}
      </div>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <Form.Control type="text" placeholder="Search jobs..." className="w-auto" />
        <Form.Select className="" style={{ width: '140px' }} >
          <option>All Designers</option>
        </Form.Select>
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
              <th>PackCode</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Assign</th>
              <th>TimeLogged</th>
              <th>Status</th>
              <th></th>
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
                  <Link style={{ textDecoration: 'none' }}>{job.JobNo}</Link>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.brandName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.packType}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job.packSize}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{job?.packCode}</td>
                <td>
                  <span className={getPriorityClass(job.priority)}>{job.priority}</span>
                </td>
                <td>{new Date(job.createdAt).toLocaleDateString("en-GB")}</td>
                <td  onClick={() => handleDesignerClick(job)} style={{ whiteSpace: 'nowrap',cursor: 'pointer', color: 'darkblue' }}>
                  {job.assign}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  <span className={`badge ${getStatusClass(job.Status)} px-2 py-1`}>
                    {job.Status}
                  </span>
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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

      {/* Pagination */}
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {(currentPage - 1) * itemsPerPage + paginatedProjects.length} of {filteredProjects.length} entries
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
              <button className="page-link " onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default InProgress;
