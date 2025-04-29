import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './TimesheetWorklog.css';

function TimesheetWorklog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [currentPage, setCurrentPage] = useState(1);

  const timeEntries = [
    {
      date: '2024-01-15',
      jobId: 'JOB-2024-001',
      taskDescription: 'Package Design - Initial Concepts',
      hours: 6.5,
      status: 'Approved'
    },
    {
      date: '2024-01-15',
      jobId: 'JOB-2024-002',
      taskDescription: 'Product Catalog - Layout Design',
      hours: 4,
      status: 'Pending'
    },
    {
      date: '2024-01-14',
      jobId: 'JOB-2024-003',
      taskDescription: 'Brand Guidelines - Logo Variations',
      hours: 8,
      status: 'Approved'
    }
  ];

  const discrepancies = [
    {
      name: 'John Doe',
      issue: 'Missing time entry on 14/01/2024'
    },
    {
      name: 'Jane Smith',
      issue: 'Overlapping entries on 15/01/2024'
    }
  ];

  const summaryData = {
    hoursThisWeek: 32.5,
    leaveBalance: '15 days',
    pendingApproval: '8.5 hrs',
    overtime: '2.5 hrs'
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatHours = (hoursDecimal) => {
    const hours = Math.floor(hoursDecimal);
    const minutes = Math.round((hoursDecimal - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} hrs`;
  };

  return (
    <div className="p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Timesheet & Worklog</h4>
        <Link id="All_btn" to="/AddTimesheetWorklog" className="btn btn-dark">
          + New Time Entry
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 summary-card summary-card-primary">
            <div className="card-body p-4">
              <div className="small text-primary fw-semibold mb-2">Hours This Week</div>
              <div className="h3 mb-0 fw-bold text-primary">{summaryData.hoursThisWeek}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 summary-card summary-card-success">
            <div className="card-body p-4">
              <div className="small text-success fw-semibold mb-2">Leave Balance</div>
              <div className="h3 mb-0 fw-bold text-success">{summaryData.leaveBalance}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 summary-card summary-card-warning">
            <div className="card-body p-4">
              <div className="small text-warning fw-semibold mb-2">Pending Approval</div>
              <div className="h3 mb-0 fw-bold text-warning">{summaryData.pendingApproval}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 summary-card summary-card-info">
            <div className="card-body p-4">
              <div className="small text-info fw-semibold mb-2">Overtime</div>
              <div className="h3 mb-0 fw-bold text-info">{summaryData.overtime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option>All Projects</option>
            <option>Project A</option>
            <option>Project B</option>
            <option>Project C</option>
          </select>
        </div>
      </div>

      {/* Time Entries Table */}
      <div className="card shadow-sm custom-table-card mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr className="bg-light">
                <th className="py-3">Date</th>
                <th className="py-3">Job ID</th>
                <th className="py-3">Task Description</th>
                <th className="py-3">Hours</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map((entry, index) => (
                <tr key={index}>
                  <td className="py-3">{formatDate(entry.date)}</td>
                  <td className="py-3">{entry.jobId}</td>
                  <td className="py-3">{entry.taskDescription}</td>
                  <td className="py-3">{formatHours(entry.hours)}</td>
                  <td className="py-3">
                    <span className={`badge rounded-pill ${entry.status === 'Approved' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} px-3 py-2`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3 text-end">
                    <button className="btn btn-link text-dark p-0 me-3 action-btn">
                      <FaPencilAlt />
                    </button>
                    <button className="btn btn-link text-danger p-0 action-btn">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timesheet Discrepancies */}
      <div className="card shadow-sm custom-table-card mb-4">
        <div className="card-header bg-light fw-semibold">
          Timesheet Discrepancies
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr className="bg-light">
                <th className="py-3">Employee Name</th>
                <th className="py-3">Issue</th>
              </tr>
            </thead>
            <tbody>
              {discrepancies.map((entry, index) => (
                <tr key={index}>
                  <td className="py-3">{entry.name}</td>
                  <td className="py-3">{entry.issue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4 py-3 border-top">
        <div className="text-muted">
          <small>Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">3</span> of <span className="fw-semibold">12</span> entries</small>
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  );
}

export default TimesheetWorklog;
