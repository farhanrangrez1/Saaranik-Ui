import React, { useState } from 'react';
import { LuDownload, LuEye, LuRotateCcw } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

function Completed_Jobs() {
  const [selectedJobs, setSelectedJobs] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (jobNumber) => {
    setSelectedJobs((prevSelectedJobs) => ({
      ...prevSelectedJobs,
      [jobNumber]: !prevSelectedJobs[jobNumber],
    }));
    setError(''); // Reset error if user selects something
  };

  const isAnySelected = Object.values(selectedJobs).some(Boolean);

  const handleReturnClick = () => {
    if (isAnySelected) {
      navigate("/jobsView");
    } else {
      setError("Please select at least one job before proceeding.");
    }
  };

  const jobData = [
    {
      jobNumber: "00001",
      brand: "Brand1",
      subBrand: "SubBrand1",
      flavour: "Flavour1",
      type: "Type1",
      size: "Size1ml",
      code: "Code1",
      completed: "2023-12-15",
      timeSpent: "2h 15m",
      budget: "2h 15m",
      designer: "SarahChen",
    },
    {
      jobNumber: "00002",
      brand: "Brand2",
      subBrand: "SubBrand2",
      flavour: "Flavour2",
      type: "Type2",
      size: "Size2ml",
      code: "Code2",
      completed: "2023-12-14",
      timeSpent: "3h 30m",
      budget: "3h 30m",
      designer: "MikeJohnson",
    },
    {
      jobNumber: "00003",
      brand: "Brand3",
      subBrand: "SubBrand3",
      flavour: "Flavour3",
      type: "Type3",
      size: "Size 3ml",
      code: "Code3",
      completed: "2023-12-13",
      timeSpent: "2h 45m",
      budget: "2h 45m",
      designer: "AlexWong",
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Completed Jobs</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">Back to Designer</button>
          <button
            className="btn btn-primary"
            onClick={handleReturnClick}
          >
            Return Completed Jobs
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card p-3">
        {/* Filters Section */}
        <div className="row mb-3 align-items-center">
          <div className="col-lg-9 col-md-8 col-sm-12 d-flex flex-wrap gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              style={{ width: "200px" }}
            />
            <select className="form-select" style={{ width: "160px" }}>
 
              <option>All Time Periods</option>
            </select>
             <select className="form-select" style={{ width: "150px" }}>
              <option>All Projects</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table align-middle mb-0 no-vertical-border">
            <thead className="table-light">
              <tr>
                <th>
                  <input type="checkbox" disabled />
                </th>
                <th style={{ whiteSpace: "nowrap" }}>Job No</th>
                <th>Brand</th>
                <th>SubBrand</th>
                <th>Flavour</th>
                <th>PackType</th>
                <th>PackSize</th>
                <th>PackCode</th>
                <th style={{ whiteSpace: "nowrap" }}>Date Completed</th>
                <th>Designer</th>
                <th style={{ whiteSpace: "nowrap" }}>Time Budget</th>
                <th style={{ whiteSpace: "nowrap" }}>Time Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map((job) => (
                <tr key={job.jobNumber}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedJobs[job.jobNumber] || false}
                      onChange={() => handleCheckboxChange(job.jobNumber)}
                    />
                  </td>
                  <td>{job.jobNumber}</td>
                  <td>{job.brand}</td>
                  <td>{job.subBrand}</td>
                  <td>{job.flavour}</td>
                  <td>{job.type}</td>
                  <td>{job.size}</td>
                  <td>{job.code}</td>
                  <td>{job.completed}</td>
                  <td>{job.designer}</td>
                  <td>{job.budget}</td>
                  <td>{job.timeSpent}</td>
                  <td className="gap-2">
                    <LuDownload className="text-primary" role="button" />
                    <LuEye role="button" />
                    <LuRotateCcw role="button" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
          <div className="mb-2 mb-md-0">Showing 1 to 3 of 12 completed jobs</div>
          <nav>
            <ul className="pagination mb-0">
              <li className="page-item disabled">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Completed_Jobs;
