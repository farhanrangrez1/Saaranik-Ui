import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaCalendarAlt, FaPencilAlt, FaTrashAlt, FaFilter, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './TimesheetWorklog.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTimesheetWorklog, fetchTimesheetWorklogs } from '../../../redux/slices/TimesheetWorklogSlice';
import Swal from 'sweetalert2';

function TimesheetWorklog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All timesheet');
  const [filtersOpen, setFiltersOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const { timesheetWorklog, error, loading } = useSelector((state) => state.TimesheetWorklogs);
   console.log(timesheetWorklog.TimesheetWorklogss);
 
   useEffect(() => {
     dispatch(fetchTimesheetWorklogs());
   }, [dispatch]);
 
   const itemsPerPage = 7;
   const totalPages = Math.ceil((timesheetWorklog.TimesheetWorklogss?.length || 0) / itemsPerPage);
   const paginatedTimeLogss = timesheetWorklog.TimesheetWorklogss?.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );
 
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to mark this job as Cancelled?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as Cancelled!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTimesheetWorklog(_id))
          .unwrap()
          .then(() => {
            Swal.fire("Updated!", "The job has been marked as Cancelled.", "success");
            dispatch(fetchTimesheetWorklogs());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong while updating.", "error");
          });
      }
    });
  };

  const handleUpdate = (entry) => {
    navigate(`/admin/AddTimesheetWorklog`, { state: { entry } });
  };

  const formatHours = (hoursDecimal) => {
    const hours = Math.floor(hoursDecimal);
    const minutes = Math.round((hoursDecimal - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} hrs`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Timesheet Discrepancies dummy data (unchanged)
  const discrepancies = [
    { name: 'John Doe', issue: 'Missing time entry on 14/01/2024' },
    { name: 'Jane Smith', issue: 'Overlapping entries on 15/01/2024' }
  ];

  // Close filters dropdown if clicked outside (for better UX)
  const filterRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFiltersOpen(false);
      }
    }
    if (filtersOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filtersOpen]);

  
  function timeStringToDecimalHours(time24) {
    if (!time24) return 0;
    const [hourStr, minuteStr] = time24.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr || '0', 10);
    return hour + minute / 60;
  }
  return (
    <div className="p-4 m-2" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2">
        <h4 className="mb-0">Timesheet & Worklog</h4>
        <Link id="All_btn" to="/admin/AddTimesheetWorklog" className="btn btn-dark">
          + New Time Entry
        </Link>
      </div> */}

      {/* Responsive Filters */}
      <div className="mb-4">
        {/* Large screens: show filters inline */}
        <div className="d-none d-md-flex row g-3">
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
              <option>All timesheet</option>
              <option>Project A</option>
              <option>Project B</option>
              <option>Project C</option>
            </select>
          </div>
        </div>

        {/* Small screens: show button to toggle filters */}
        <div className="d-flex d-md-none justify-content-start" ref={filterRef} style={{ position: 'relative' }}>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="mobileFilters"
          >
            <FaFilter /> Filters
          </button>

          {filtersOpen && (
            <div
              id="mobileFilters"
              className="card p-3 shadow"
              style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'white',
                borderRadius: '0.25rem',
                boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 0.15)'
              }}
            >
              <div className="mb-3">
                <label htmlFor="mobileSearch" className="form-label visually-hidden">Search Entries</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    id="mobileSearch"
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="mobileProjectSelect" className="form-label">Select Project</label>
                <select
                  id="mobileProjectSelect"
                  className="form-select"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option>All timesheet</option>
                  <option>Project A</option>
                  <option>Project B</option>
                  <option>Project C</option>
                </select>
              </div>
              <div className="mt-3 text-end">
                <button className="btn btn-secondary btn-sm" onClick={() => setFiltersOpen(false)}>
                  <FaTimes /> Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time Entries Table */}
      <div className="card shadow-sm custom-table-card mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr className="bg-light">
              <th>JobID</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Employee Name</th>
                  <th>Date</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Start Time</th>
                  <th style={{ whiteSpace: 'nowrap' }}>End Time</th>
                  <th>Hours</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Task Description</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
               {paginatedTimeLogss?.map((log, index) => {
                           const extraHoursDecimal = timeStringToDecimalHours(log.extraHours);
                           const hoursDecimal = timeStringToDecimalHours(log.hours);
         
                           const isHoursDiscrepant = hoursDecimal > 8;
                           const isExtraHoursDiscrepant = extraHoursDecimal < 8;
                           return (
                             <tr key={index}>
                               <td className="no-border-bottom">
                                 #JOB{log.jobId?.[0]?.JobNo || '----'}
                               </td>
                               <td style={{ whiteSpace: 'nowrap' }} key={index}>
                                 {log.projectId?.[0]?.projectName || 'No Project Name'}
                               </td>
                               <td style={{ whiteSpace: 'nowrap' }} key={index}>
                                 {log.employeeId?.[0]
                                   ? `${log.employeeId[0].firstName} ${log.employeeId[0].lastName}`
                                   : 'No Employee'}
                               </td>
                               <td>{new Date(log.date).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                               <td>
                                 {log.startTime}
                               </td>
                               <td>
                                 {log.endTime}
                               </td>
                               {/* <td>
                                 {(!log.extraHours || log.extraHours === '0' || log.extraHours === '0:00') ? '-' : formatTimeTo12Hour(log.extraHours)}
                               </td> */}
                               <td>
                                 {log.hours}
                               </td>
                               {/* <td
                                 style={{
                                   color: isHoursDiscrepant ? 'red' : 'inherit',
                                   fontWeight: isHoursDiscrepant ? 'bold' : 'normal',
                                   whiteSpace: 'nowrap',
                                 }}
                               >
                                 {formatTimeTo12Hour(log.hours)}
                               </td> */}
                               <td style={{ whiteSpace: 'nowrap' }}>{log.taskDescription}</td>
                               <td className="py-3">
                                 <span className={`badge rounded-pill ${log.status === 'Approved' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} px-3 py-2`}>
                                   {log.status}
                                 </span>
                               </td>
                               <td className="text-end" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <button
                                   className="btn btn-link text-dark p-0 me-3"
                                   onClick={() => handleEdit(log)}
                                 >
                                   <FaPencilAlt />
                                 </button>
                                 {/* <button
                                   className="btn btn-link text-danger p-0"
                                   onClick={() => handleDelete(log._id)}
                                 >
                                   <FaTrashAlt />
                                 </button> */}
                               </td>
                             </tr>
                           );
                         })}
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
         {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-muted small">
            Showing 1 to {paginatedTimeLogss?.length || 0} of {timesheetWorklog.TimesheetWorklogss?.length || 0} entries
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

export default TimesheetWorklog;
