import React from 'react'
import { LuDownload, LuEye, LuRotateCcw } from "react-icons/lu"; // Lucide icons
import { Link } from 'react-router-dom';


function Completed_Jobs() {
  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Completed Jobs</h4>
        
        <div className="d-flex gap-2">
          {/* <Link to="/designer"> */}
            <button className="btn btn-outline-primary">Back to Designer</button>
          {/* </Link> */}
          <Link to={"/jobsView"}> <button className="btn btn-primary">Return Completed Jobs</button>          </Link>
        </div>
      </div>
      <div className="card p-3">
        {/* Filters and Actions Section */}
        <div className="row mb-3 align-items-center">
          <div className="col-lg-9 col-md-8 col-sm-12 d-flex flex-wrap gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              style={{ width: "200px" }}
            />
            <select className="form-select" style={{ width: "150px" }}>
              <option>All Time Periods</option>
            </select>
            <select className="form-select" style={{ width: "150px" }}>
              <option>All Projects</option>
            </select>
          </div>
          {/* <div className="col-lg-3 col-md-4 col-sm-12 text-end">
            <Link to={"/jobsView"}>
              <button id='btn-All' className="btn btn-dark w-100 w-md-auto">Export Data</button>
            </Link>
          </div> */}
        </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table align-middle mb-0 no-vertical-border">
          <thead className="table-light">
            <tr>
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
            <tr>
              <td>00001</td>
              <td>Brand 1</td>
              <td>SubBrand1</td>
              <td>Flavour1</td>
              <td>Type1</td>
              <td>Size1ml</td>
              <td>Code1</td>
              <td>2h 15m</td>
              <td>Sarah Chen</td>
              <td>2023-12-15</td>
              <td>2h 15m</td>
              <td className="gap-5">
                <LuDownload className="text-primary" role="button" />
                <LuEye role="button" />
                <LuRotateCcw role="button" />
              </td>


            </tr>
            <tr>
              <td>00002</td>
              <td>Brand 2</td>
              <td>SubBrand2</td>
              <td>Flavour2</td>
              <td>Type2</td>
              <td>Size2ml</td>
              <td>Code2</td>
              <td>3h 30m</td>
              <td>MikeJohnson</td>
              <td>2023-12-14</td>
              <td>3h 30m</td>
              <td className=" gap-2">
                <LuDownload className="text-primary" role="button" />
                <LuEye role="button" />
                <LuRotateCcw role="button" />
              </td>
            </tr>
            <tr>
              <td>00003</td>
              <td>Brand3</td>
              <td>Sub Brand3</td>
              <td>Flavour3</td>
              <td>Type3</td>
              <td>Size 3ml</td>
              <td>Code3</td>
              <td>2h 45m</td>
              <td>Alex Wong</td>
              <td>2023-12-13</td>
              <td>2h 45m</td>
              <td className="gap-2">
                <LuDownload className="text-primary" role="button" />
                <LuEye role="button" />
                <LuRotateCcw role="button" />
              </td>

            </tr>
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
  )
}

export default Completed_Jobs
