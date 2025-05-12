import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deletejob, fetchjobs, UpdateJobAssign } from '../../../../redux/slices/JobsSlice';
import Swal from 'sweetalert2';

function ProjectJobsTab() {
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;
  console.log("hello me project id", id);



  const [selectedProduction, setSelectedProduction] = useState('');
  const [selectedAdditional, setSelectedAdditional] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');

  const jobs = [
    {
      id: "00001",
      brandName: "Brand1",
      subBrand: "SubBrand1",
      flavour: "Flavour1",
      packType: "Type1",
      packSize: "Size 1ml",
      packCode: "Code1",
      deadline: "2024/01/20",
      brief: "ViewBrief",
      status: "Pending Upload",
      statusVariant: "warning",
    },
    {
      id: "00002",
      brandName: "Brand2",
      subBrand: "SubBrand2",
      flavour: "Flavour2",
      packType: "Type2",
      packSize: "Size 2ml",
      packCode: "Code2",
      deadline: "2024/01/25",
      brief: "ViewBrief",
      status: "In Progress",
      statusVariant: "info",
    },
    {
      id: "00003",
      brandName: "Brand3",
      subBrand: "SubBrand3",
      flavour: "Flavour3",
      packType: "Type3",
      packSize: "Size 3ml",
      packCode: "Code3",
      deadline: "2024/02/01",
      brief: "ViewBrief",
      status: "DraftSaved",
      statusVariant: "secondary",
    },
  ];

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

    // ✅ Now send data to handleJobAssign
    handleJobAssign(selectedJobIds, selectedDesigner);

    // Reset state and close modal
    setShowAssignModal(false);
    setSelectedProduction('');
    setSelectedAdditional('');
    setSelectedJob(null);
    setSelectedDesigner('');
    setAssignmentDescription('');
  };

  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("CSV file selected:", file.name);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
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
  // ////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  // const params = useParams();
  // const id = location.state?.id || params.id;
  useEffect(() => {
    console.log("Project ID:", id);
  }, [id]);


  // ///
  const { job } = useSelector((state) => state.jobs);
  console.log(job.jobs, "all jobs");

  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);


  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletejob(_id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchjobs());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  }


  const handleUpdate = (job) => {
    navigate(`/AddJobTracker`, { state: { job } });
  };

  const JobDetails = (job) => {
    navigate(`/OvervieJobsTracker`, { state: { job } });
  }


  const getStatusClass = (status) => {
    switch (status.toLowerCase().trim()) {
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
    <div className="card">
      <div className="card-header d-flex align-content-center justify-content-between mt-3">
        <h5 className="card-title mb-0">Jobs List</h5>
        <div className="text-end">
          {/* ✅ Assign Button always enabled, shows error if none selected */}
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
                handleJobAssign(selectedJobIds); // ✅ Call with selected IDs
                setShowAssignModal(true);
              }
            }}
          >
            Assign
          </Button>


          <label className="btn btn-success m-2">
            <i className="bi bi-upload"></i> Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVImport}
              hidden
            />
          </label>

          <Link
            to="/AddJobTracker"
            state={{ id }} // ID pass kar rahe hain yahan
          >
            <button id="All_btn" className="btn btn-primary">
              <i className="bi bi-plus"></i> Add Job
            </button>
          </Link>
        </div>
      </div>

      <div className="card-body">
        {/* ✅ Error message block */}
        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
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
                <th>JobsNo</th>
                <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
                <th>Brand</th>
                <th>SubBrand</th>
                <th>Flavour</th>
                <th>PackType</th>
                <th>PackSize</th>
                <th>Priority</th>
                <th style={{ whiteSpace: 'nowrap' }}>Due Date</th>
                <th>Assing</th>
                <th>TotalTime</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {job?.jobs?.slice().reverse().map((job, index) => (
                <tr key={job._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedJobs[job._id] || false}
                      onChange={() => handleCheckboxChange(job._id)}
                    />
                  </td>
                  <td>
                    <Link>
                      {String(index + 1).padStart(4, '0')}
                    </Link>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.projectId?.[0]?.projectName || 'N/A'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.brandName}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.subBrand}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.flavour}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.packType}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{job.packSize}</td>
                  <td>
                    <span className={getPriorityClass(job.priority)}>
                      {job.priority}
                    </span>
                  </td>
                  <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                  <td>{job.assign}</td>
                  <td>{new Date(job.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                  {/* <th>
                    <Button id='All_btn' variant="success" style={{ width: "130px" }} size="sm" >
                      {job.Status || "Active"}
                    </Button></th> */}
                  <td>
                    <span
                      className={`badge ${getStatusClass(job.Status)} px-2 py-1`}
                    >
                      {job.Status}
                    </span>
                  </td>
                  <td className="d-flex">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => JobDetails(job)}>
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleUpdate(job)}>
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job._id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Job Assignment Modal */}
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

    </div>
  );
}

export default ProjectJobsTab;
