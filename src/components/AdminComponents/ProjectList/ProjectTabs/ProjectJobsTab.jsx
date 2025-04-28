import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
// import papaparse from 'papaparse';


function ProjectJobsTab() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState('');
  const [selectedAdditional, setSelectedAdditional] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  

  const handleAssignJob = (job) => {
    setSelectedJob(job);
    setShowAssignModal(true);
  };

  const handleSubmitAssignment = () => {
    console.log('Assigning job:', selectedJob);
    console.log('Production:', selectedProduction);
    console.log('Additional:', selectedAdditional);
    setShowAssignModal(false);
    setSelectedProduction('');
    setSelectedAdditional('');
    setSelectedJob(null);
  };
  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log("Parsed CSV Data:", results.data);
        },
      });
    }
  };
  
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
  const [attachedFile, setAttachedFile] = useState(null);

  const [selectedJobs, setSelectedJobs] = useState({});
  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId], // Toggle the checkbox
    }));
  };

  return (
    <div className="card">
   <div className="card-header d-flex align-content-center justify-content-between mt-3">
  <h5 className="card-title mb-0">Jobs List</h5>
  <div className="text-end">
    <button
      className="btn btn-primary m-2"
      onClick={() => setShowAssignModal(true)}
    >
      Assign
    </button>

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
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
              <th>
                  <input
                    type="checkbox"
                    onChange={() => {
                      // Select all checkboxes when the header checkbox is clicked
                      const isChecked = Object.keys(selectedJobs).length === jobs.length;
                      const newSelectedJobs = {};
                      jobs.forEach((job) => {
                        newSelectedJobs[job.id] = !isChecked;
                      });
                      setSelectedJobs(newSelectedJobs);
                    }}
                  />
                </th>
                <th style={{ whiteSpace: "nowrap" }}>Jobs No</th>
               
                <th>Brand</th>
                <th>SubBrand</th>
                <th>PackType</th>
                <th>Size</th>
                 <th>Pack Code</th>
                <th>Status</th>
                {/* <th>PackCode</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index}>
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
                  <td>{job.packType}</td>
                  <td>{job.packSize}</td>
                  <td>{job.packCode}</td>
                  <td>{job.packType}</td>
                  {/* <td>
                    <span className={badge bg-${job.statusVariant}}>
                      {job.status}
                    </span>
                  </td> */}
                  <td className="d-flex">
                  
                    <button className="btn btn-sm btn-outline-primary me-2">
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

      {/* Job Assignment Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group className="mb-3">
    <Form.Label>Designer</Form.Label>
    <Form.Select
      value={selectedAdditional}
      onChange={(e) => setSelectedAdditional(e.target.value)}
    >
      <option value="">Select Designer</option>
      <option value="additional1">Additional 1</option>
      <option value="additional2">Additional 2</option>
      <option value="additional3">Additional 3</option>
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Attach Document</Form.Label>
    <Form.Control
      type="file"
      accept=".pdf,.doc,.docx,.jpg,.png"
      onChange={(e) => {
        const file = e.target.files[0];
        console.log("Selected File:", file);
        // You can store it in state or handle upload
      }}
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