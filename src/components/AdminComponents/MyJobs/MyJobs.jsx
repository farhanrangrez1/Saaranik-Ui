import React from "react";
import { Container, Row, Col, Button, Form, Table, Pagination, Badge, Modal } from "react-bootstrap";
import { FaPlus, FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from 'react';
import * as XLSX from 'xlsx';
function MyJobs() {
  const [showTimesheetModal, setShowTimesheetModal] = React.useState(false);
  const [selectedJobId, setSelectedJobId] = React.useState(null);
  const [showBriefModal, setShowBriefModal] = React.useState(false);
  const [selectedBrief, setSelectedBrief] = React.useState("");

  const handleReturnJob = () => {
    const hasTimesheet = false;
    if (!hasTimesheet) {
      alert('This jobs is send to the production ');
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
      packSize: "Size3ml",
      packCode: "Code3",
      deadline: "2024/02/01",
      brief: "ViewBrief",
      status: "DraftSaved",
      statusVariant: "secondary",
    },
  ];

  // fild add 
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
      // Aap yahan file ko backend pe bhej sakte ho
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

  return (
    <div className="p-4 m-2" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <h5 className="fw-bold mb-3 text-start">My Jobs</h5>

      {/* Filters and Action Buttons */}
      <Row className="mb-3 align-items-center">
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

        {/* Action Buttons */}
        <Col xs={12} lg={3} className="text-lg-end d-flex flex-wrap justify-content-lg-end gap-2">
          {/* <Link to={"/MyJobsHolidayPackageDesign"}>
            <Button id="All_btn" variant="dark" className="w-100 w-lg-auto">
              <FaPlus className="me-1" />
              Log Time
            </Button>
          </Link> */}
          <Button id="All_btn" variant="dark" className="w-lg-auto" onClick={() => handleReturnJob()}>
            Return Job
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Table responsive hover className="align-middle bg-white rounded shadow-sm overflow-hidden">
        <thead className="table-light">
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th className="text-nowrap">Job No</th>
            <th className="text-nowrap">Brand</th>
            <th className="text-nowrap">SubBrand</th>
            <th className="text-nowrap">Flavour</th>
            <th className="text-nowrap">PackType</th>
            <th className="text-nowrap">PackSize</th>
            <th className="text-nowrap">PackCode</th>
            <th className="text-nowrap">Deadline</th>
            <th className="text-nowrap">Brief</th>
            <th className="text-nowrap">Status</th>
            <th className="text-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <td><Link to={"/OvervieMyJobs"}>{job.id}</Link></td>
              <td>{job.brandName}</td>
              <td>{job.subBrand}</td>
              <td>{job.flavour}</td>
              <td>{job.packType}</td>
              <td>{job.packSize}</td>
              <td>{job.packCode}</td>
              <td className={job.status === "Pending Upload" ? "text-danger" : ""}>
                {job.deadline}
              </td>
              <td>
                <a
                  href="#"
                  className="text-primary text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedBrief(`Brief details for Job #${job.id}`);
                    setShowBriefModal(true);
                  }}
                >
                  {job.brief}
                </a>
              </td>
              <td>
                <Badge bg={job.statusVariant}>{job.status}</Badge>
              </td>
              <td className="d-flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {/* <Button
        size="sm"
        variant="dark"
        className="me-2"
        onClick={() => {
          const workbook = XLSX.utils.book_new();
          const worksheet = XLSX.utils.json_to_sheet(jobs.map(job => ({
            'Job #': job.id,
            'BrandName': job.brandName,
            'SubBrand': job.subBrand,
            'Flavour': job.flavour,
            'PackType': job.packType,
            'PackSize': job.packSize,
            'PackCode': job.packCode,
            'Deadline': job.deadline,
            'Brief': job.brief,
            'Status': job.status
          })));
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');
          XLSX.writeFile(workbook, 'jobs_data.xlsx');
        }}
      >
        <FaUpload className="me-1" />
        Excel
      </Button> */}
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
                <Link to={"/MyJobsHolidayPackageDesign"}> <Button id="All_btn" size="sm" variant="dark" onClick={() => handleLogTime(job.id)}>
                  LogTime
                </Button></Link>
                <Button id="All_btn" size="sm" variant="dark" onClick={() => handleLogTime(job.id)}>
                  CopyFN
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div >Showing 1 to 3 of 8 active jobs</div>
        <Pagination className="m-0">
          <Pagination.Prev disabled>Previous</Pagination.Prev>
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next>Next</Pagination.Next>
        </Pagination>
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
    </div>
  );
}

export default MyJobs;
