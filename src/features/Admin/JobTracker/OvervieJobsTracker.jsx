// import React, { useRef } from 'react';
// import { Card, Row, Col, Button, ProgressBar, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FaPlus, FaUpload } from "react-icons/fa";

// const OvervieJobsTracker = ({ onClose }) => {
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       alert(`Selected file: ${file.name}`);
//       // Aap apni file handling logic yahan likh sakte hain
//     }
//   };

//   const assignments = [
//     {
//       date: '25/03/2025',
//       title: '',
//       assignedTo: 'Designer',
//       timeSpent: '3:00',
//     },
//     {
//       date: '25/03/2025',
//       title: '',
//       assignedTo: 'Designer',
//       timeSpent: '3:00',
//     },
//     {
//       date: '25/03/2025',
//       title: '',
//       assignedTo: 'Designer',
//       timeSpent: '3:00',
//     },
//   ];

//   return (
//     <div className="container mt-5">
//       <Card className="shadow-lg p-4 border-0 rounded-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h4 className="mb-0 fw-bold text-primary">Job Details</h4>
//           <Link to={"/JobTracker"}>
//             <Button variant="outline-secondary" size="sm" onClick={onClose}>Close</Button>
//           </Link>
//         </div>

//         <Row className="mb-4">
//           <Col md={6}>
//             <p><strong>Job No:</strong><br />Banner Design - Spring Campaign</p>
//           </Col>
//           <Col md={6}>
//             <p><strong>Status:</strong><br />In Progress</p>
//           </Col>
//           <Col md={6}>
//             <p><strong>Due Date:</strong><br />April 25, 2025</p>
//           </Col>
//           <Col md={12}>
//             <p><strong>Instructions:</strong><br />Create a visually appealing banner for the Spring Sale. Use pastel color palette and add product highlights.</p>
//           </Col>
//         </Row>

//         <h5 className="fw-bold text-primary mb-3">Progress</h5>

//         <Row className="mb-4">
//           <Col md={12}>
//             <Card className="p-3 text-center border-0 shadow-sm">
//               <h6 className="mb-2">Job Progress</h6>
//               <ProgressBar now={45} variant="info" />
//               <small className="text-muted mt-1 d-block">45% Completed</small>
//             </Card>
//           </Col>
//         </Row>

//         <h5 className="fw-bold text-danger mb-3">Assignments:</h5>
//         <Table responsive hover className="align-middle bg-white rounded shadow-sm overflow-hidden">
//           <thead className="table-light">
//             <tr>
//               <th className="text-nowrap">Date</th>
//               <th className="text-nowrap">Instruction</th>
//               <th className="text-nowrap">Assigned To</th>
//               <th className="text-nowrap">Time Spent</th>
//               <th className="text-nowrap">Uploaded File/Link</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignments.map((assignment, index) => (
//               <tr key={index}>
//                 <td>{assignment.date}</td>
//                 <td>
//                   <a
//                     href="#"
//                     className=" text-decoration-none"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       alert(`Details for: ${assignment.title}`);
//                     }}
//                   >
//                     {assignment.title} - wasaadasdadasdsa
//                   </a>
//                 </td>
//                 <td className="">{assignment.assignedTo}</td>
//                 <td className="">{assignment.timeSpent}</td>
             
//                 <td className="d-flex gap-2">
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     style={{ display: 'none' }}
//                     onChange={handleFileChange}
//                   />

//                   <Button
//                     size="sm"
//                     variant="dark"
//                     className="me-2"
//                     onClick={() => {
//                       const workbook = XLSX.utils.book_new();
//                       const worksheet = XLSX.utils.json_to_sheet(jobs.map(job => ({
//                         'Job #': job.id,
//                         'BrandName': job.brandName,
//                         'SubBrand': job.subBrand,
//                         'Flavour': job.flavour,
//                         'PackType': job.packType,
//                         'PackSize': job.packSize,
//                         'PackCode': job.packCode,
//                         'Deadline': job.deadline,
//                         'Brief': job.brief,
//                         'Status': job.status
//                       })));
//                       XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');
//                       XLSX.writeFile(workbook, 'jobs_data.xlsx');
//                     }}
//                   >
//                     <FaUpload className="me-1" />
//                     Excel
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>
//     </div>
//   );
// };

// export default OvervieJobsTracker;








import React, { useRef } from "react";
import { Card, Row, Col, Button, ProgressBar, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import { useDispatch } from "react-redux";

const OvervieJobsTracker = ({ onClose }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
    }
  };

  const assignments = [
    {
      date: "25/03/2025",
      title: "Design Brief",
      assignedTo: "Designer",
      timeSpent: "3:00",
    },
    {
      date: "25/03/2025",
      title: "Color Palette Selection",
      assignedTo: "Designer",
      timeSpent: "3:00",
    },
    {
      date: "25/03/2025",
      title: "Client Review",
      assignedTo: "Designer",
      timeSpent: "3:00",
    },
  ];

  // Sample job data
  const jobs = {
    jobNo: "Banner Design - Spring Campaign",
    status: "In Progress",
    dueDate: "April 25, 2025",
    instructions:
      "Create a visually appealing banner for the Spring Sale. Use pastel color palette and add product highlights.",
    brand: "BrandA",
    subBrand: "SubBrandA",
    flavour: "Vanilla",
    packType: "Box",
    packSize: "500g",
    priority: "High",
  };


  // /////
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // for edit mode
    const location = useLocation();
    const { job } = location.state || {};
  console.log(job);

  return (
    <div className="container mt-5">
      <Card className="shadow-lg p-4 border-0 rounded-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold text-primary">Job Details</h4>
          <Link to={"/admin/JobTracker"}>
            <Button variant="outline-secondary" size="sm">
              Close
            </Button>
          </Link>
        </div>

        {/* Job Information Section */}
        <Row className="mb-4">
          <Col md={6}>
            <p>
              <strong>Job No:</strong>
              <br />
              {jobs.jobNo}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Status:</strong>
              <br />
              {job?.Status}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Due Date:</strong>
              <br />
              <td>{new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
            </p>
          </Col>
          <Col md={12}>
            <p>
              <strong>Instructions:</strong>
              <br />
              {jobs.instructions}
            </p>
          </Col>
        </Row>

        {/* Job Additional Information */}

        <Row className="mb-4">
  <Col md={4} className="mb-3">
    <h6 className="text-bold">Brand:</h6>
    <p className="mb-0">{job?.brandName}</p>
  </Col>

  <Col md={4} className="mb-3">
    <h6 className="text-bold">Flavour:</h6>
    <p className="mb-0">{job?.flavour}</p>
  </Col>

  <Col md={4} className="mb-3">
    <h6 className="text-bold">SubBrand:</h6>
    <p className="mb-0">{job?.subBrand}</p>
  </Col>
</Row>

<Row className="mb-4">
  <Col md={4} className="mb-3">
    <h6 className="text-bold">Pack Type:</h6>
    <p className="mb-0">{job?.packType}</p>
  </Col>

  <Col md={4} className="mb-3">
    <h6 className="text-bold">Pack Size:</h6>
    <p className="mb-0">{job?.packSize}</p>
  </Col>

  <Col md={4} className="mb-3">
    <h6 className="text-bold">Priority:</h6>
    <p className="mb-0">{job?.priority}</p>
  </Col>
</Row>

<Row className="mb-4">
  <Col md={4} className="mb-3">
    <h6 className="text-bold">Project Name:</h6>
    <p className="mb-0">{job?.packType}</p>
  </Col>

  <Col md={4} className="mb-3">
    <h6 className="text-bold">Assign:</h6>
    <p className="mb-0">{job?.assign}</p>
  </Col>

  <Col md={4} className="mb-3">
    <h6 className="text-bold">Total Time:</h6>
    <p className="mb-0">{job?.totalTime}</p>
  </Col>
</Row>

{/* <div className="col-md-6 text-center mt-4">
  <label className="form-label">Project Barcode</label>
  <div className="border p-3 d-inline-block bg-light rounded shadow-sm">
  
    <div className="mt-2 fw-bold">POS-123456</div>
  </div>
</div> */}
<div className="col-md-6 mt-4 mb-4">
<label className="fw-bold">Project Barcode</label>
<div className="mt-2 form-label ">{job?.barcode || "POS-123456"}</div>
</div>

        {/* Progress Section */}
        <h5 className="fw-bold text-primary mb-3">Progress</h5>
        <Row className="mb-4">
          <Col md={12}>
            <Card className="p-3 text-center border-0 shadow-sm">
              <h6 className="mb-2">Job Progress</h6>
              <ProgressBar now={45} variant="info" />
              <small className="text-muted mt-1 d-block">45% Completed</small>
            </Card>
          </Col>
        </Row>

        {/* Assignments Table */}
        <h5 className="fw-bold text-danger mb-3">Assignments:</h5>
        <Table
          responsive
          hover
          className="align-middle bg-white rounded shadow-sm overflow-hidden"
        >
          <thead className="table-light">
            <tr>
              <th className="text-nowrap">Date</th>
              <th className="text-nowrap">Instruction</th>
              <th className="text-nowrap">Assigned To</th>
              <th className="text-nowrap">Time Spent</th>
              <th className="text-nowrap">Uploaded File/Link</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.date}</td>
                <td>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Details for: ${assignment.title}`);
                    }}
                  >
                    {assignment.title}
                  </a>
                </td>
                <td>{assignment.assignedTo}</td>
                <td>{assignment.timeSpent}</td>
                <td className="d-flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Button
                    size="sm"
                    variant="dark"
                    className="me-2"
                    onClick={() => {
                      alert("Excel export functionality");
                    }}
                  >
                    <FaUpload className="me-1" />
                    Excel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default OvervieJobsTracker;



