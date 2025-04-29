import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';

function ProjectJobsTab() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState('');
  const [selectedAdditional, setSelectedAdditional] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

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
    console.log("Assigning jobs:", selectedJobs);
    setShowAssignModal(false);
    setSelectedProduction('');
    setSelectedAdditional('');
    setSelectedJob(null);
    setSelectedDesigner('');
  };

  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("CSV file selected:", file.name);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex align-content-center justify-content-between mt-3">
        <h5 className="card-title mb-0">Jobs List</h5>
        <div className="text-end">
          {/* ✅ Assign Button always enabled, shows error if none selected */}
          <Button
            className="m-2"
            variant="primary"
            onClick={() => {
              const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
              if (selectedJobIds.length === 0) {
                setErrorMessage("Please select at least 1 job to assign.");
                setTimeout(() => setErrorMessage(""), 3000);
              } else {
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

          <Link to={"/AddJobTracker"}>
            <button className="btn btn-primary">
              <i className="bi bi-plus"></i> Add New
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
                <th>JobsNo</th>
                <th>Brand</th>
                <th>SubBrand</th>
                <th>Flavour</th>
                <th>PackType</th>
                <th>PackSize</th>
                <th>PackCode</th>
                <th>Status</th>
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
                  <td><Link to={"/OvervieJobsTracker"}>{job.id}</Link></td>
                  <td>{job.brandName}</td>
                  <td>{job.subBrand}</td>
                  <td>{job.flavour}</td>
                  <td>{job.packType}</td>
                  <td>{job.packSize}</td>
                  <td>{job.packCode}</td>
                     <th>
                      <Button className='' variant="success" style={{width:"150px"}} size="sm" >
                                              {job.status || "Active"}
                                             </Button></th>
                  <td className="d-flex">
                    <Link to={"/OvervieJobsTracker"}>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-eye"></i> View
                      </button>
                    </Link>
                    <button className="btn btn-sm btn-outline-primary me-1">
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
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
                <option value="production">Production</option>
                <option value="designer">Designer</option>
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

export default ProjectJobsTab;
