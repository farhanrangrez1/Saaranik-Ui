import React, { useState, useMemo } from 'react';
import { FaSearch, FaCalendarAlt, FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';
import AddTimeLog from './AddTimeLog';
import Extrahr from './Extrahr';
import { Link } from 'react-router-dom';

function TimeLogs() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProject, setSelectedProject] = useState('All Projects');

  const [timeLogs, setTimeLogs] = useState([
    {
      date: '2024/01/19',
      jobId: '#JOB102',
      project: 'Holiday Package',
      hours: 4.5,
      taskNotes: 'Initial concept development and sketching',
      day: 14,
      ExtraHours: "12"
    },
    {
      date: '2024/01/19',
      jobId: '#JOB101',
      project: 'ProductCatalog',
      hours: 6.0,
      taskNotes: 'Layout design and photo editing',
      day: "16",
      ExtraHours: "25"
    },
    {
      date: '2024/01/18',
      jobId: '#JOB102',
      project: 'HolidaywPackage ',
      hours: 5.5,
      taskNotes: 'Color palette selection and mockups',
      day: "22",
      ExtraHours: "9.5"
    },
    {
      date: '2024/01/18',
      jobId: '#JOB100',
      project: 'BrandGuidelines',
      hours: 8,
      taskNotes: 'Typography system and logo variations',
      day: "28",
    }
  ]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(timeLogs.length / itemsPerPage);

  const filteredLogs = useMemo(() => {
    return timeLogs.filter(log => {
      const matchesSearch = searchQuery.toLowerCase() === '' ||
        log.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.taskNotes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = selectedDate === '' || log.date === selectedDate;

      const matchesProject = selectedProject === 'All Projects' ||
        log.project === selectedProject;

      return matchesSearch && matchesDate && matchesProject;
    });
  }, [timeLogs, searchQuery, selectedDate, selectedProject]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage]);

  const totalHours = filteredLogs.reduce((sum, log) => sum + log.hours, 0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddTimeLog = () => {
    setShowAddModal(true);
  };

  const handleEdit = (jobId) => {
    const logToEdit = timeLogs.find(log => log.jobId === jobId);
    setEditingLog(logToEdit);
    setShowAddModal(true);
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this time log?')) {
      setTimeLogs(prev => prev.filter(log => log.jobId !== jobId));
    }
  };

  const handleAddOrUpdate = (formData) => {
    if (editingLog) {
      setTimeLogs(prev =>
        prev.map(log =>
          log.jobId === editingLog.jobId ? { ...formData } : log
        )
      );
      setEditingLog(null);
    } else {
      setTimeLogs(prev => [...prev, formData]);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingLog(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Time Logs</h4>
        <div className="d-flex gap-3">
          <Link to={"/Extrahr"}>
            <button className="btn btn-dark d-flex align-items-center gap-2">
              <FaPlus /> Extra time
            </button>
          </Link>
          <Link to={"/AddTimelog"}>
            <button className="btn btn-dark d-flex align-items-center gap-2">
              <FaPlus /> Add Time Log
            </button>
          </Link>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search time logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaCalendarAlt className="text-muted" />
            </span>
            <input
              type="date"
              className="form-control border-start-0"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
            <option>Holiday Package Design</option>
            <option>Product Catalog</option>
            <option>Brand Guidelines</option>
          </select>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Date</th>
                  <th>JobID</th>
                  <th>Project</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Extra Hours</th>
                  <th>Hours</th>
                  <th>Task Notes</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map((log, index) => {
                  const isDiscrepant = log.hours < 8;
                  return (
                    <tr key={index}>
                      <td>{log.date}</td>
                      <td>{log.jobId}</td>
                      <td>{log.project}</td>
                      <td>{log.ExtraHours || '-'}</td>
                      <td style={{ color: isDiscrepant ? 'red' : 'inherit', fontWeight: isDiscrepant ? 'bold' : 'normal' }}>
                        {log.hours}
                      </td>
                      <td>{log.taskNotes}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-link text-dark p-0 me-3"
                          onClick={() => handleEdit(log.jobId)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDelete(log.jobId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
        </div>
        <div className="d-flex align-items-center">
          <div className="me-3">
            <strong>Total Hours: {totalHours.toFixed(1)}</strong>
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {showAddModal && (
        <AddTimeLog
          onClose={handleCloseModal}
          onAdd={handleAddOrUpdate}
          editData={editingLog}
        />
      )}
    </div>
  );
}

export default TimeLogs;