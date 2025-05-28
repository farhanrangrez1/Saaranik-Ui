                      import React, { useState, useMemo, useEffect } from 'react';
                      import { FaSearch, FaCalendarAlt, FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';
                      import AddTimeLog from './AddTimeLog';
                      import Extrahr from './Extrahr';
                      import { Link, useNavigate } from 'react-router-dom';
                      import { useDispatch, useSelector } from 'react-redux';
                      import { deleteTimeLogs, fetchTimeLogss, updateExtraHours } from '../../../redux/slices/TimeLogsSlice';
                      import { Button, Form, Modal } from "react-bootstrap";
                      import Swal from 'sweetalert2';
                      
                      function TimeLogs() {
                        const [showAddModal, setShowAddModal] = useState(false);
                        const [editingLog, setEditingLog] = useState(null);
                        const [currentPage, setCurrentPage] = useState(1);
                        const [searchQuery, setSearchQuery] = useState('');
                        const [selectedDate, setSelectedDate] = useState('');
                        const [selectedProject, setSelectedProject] = useState('All Projects');
                      const [selectedLogId, setSelectedLogId] = useState(null);
                      
                        const dispatch = useDispatch();
                        const navigate = useNavigate()
                      
                        // ///////////////////////////////
                        const [showAssignModal, setShowAssignModal] = useState(false);
                        const [selectedDesigner, setSelectedDesigner] = useState('');
                        const [assignmentDescription, setAssignmentDescription] = useState('');
                        const [selectedJobs, setSelectedJobs] = useState({});
                        const [errorMessage, setErrorMessage] = useState('');
                        const [extraHours, setExtraHours] = useState('');
                      
                      
                      
                        useEffect(() => {
                          dispatch(fetchTimeLogss());
                        }, [dispatch]);
                      
                      
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
                      
                          if (!extraHours) {
                            setErrorMessage("Please enter extra hours.");
                            setTimeout(() => setErrorMessage(""), 3000);
                            return;
                          }
                      
                          const payload = {
                            id: selectedJobIds,
                            extraHours: extraHours,
                          };
                      
                          console.log("Dispatching payload:", payload);
                      
                          dispatch(updateExtraHours(payload))
                            .unwrap()
                            .then(() => {
                              setSelectedJobs({});
                              dispatch(fetchTimeLogss());
                              setShowAssignModal(false);
                              setExtraHours('');
                            })
                            .catch((error) => {
                              setErrorMessage(`Failed to update: ${error}`);
                              setTimeout(() => setErrorMessage(""), 3000);
                            });
                        };
                      
                      
                        // ////////////////////////
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
                      
                      
                        //  all client
                        const { timelogs, error, loading } = useSelector((state) => state.TimeLogss);
                        console.log(timelogs.TimeLogss);
                      
                        useEffect(() => {
                          dispatch(fetchTimeLogss());
                        }, [dispatch]);
                      
                        const itemsPerPage = 7;
                        const totalPages = Math.ceil((timelogs.TimeLogss?.length || 0) / itemsPerPage);
                        const paginatedTimeLogss = timelogs.TimeLogss?.slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        );
                      
                      
                        const handleEdit = (log) => {
                          navigate(`/admin/AddTimelog`, { state: { log } });
                        };
                      
                        const handleDelete = (_id) => {
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
                              dispatch(deleteTimeLogs(_id))
                                .then(() => {
                                  Swal.fire("Deleted!", "The document has been deleted.", "success");
                                  dispatch(fetchTimeLogss());
                                })
                                .catch(() => {
                                  Swal.fire("Error!", "Something went wrong.", "error");
                                });
                            }
                          });
                        }
                        // time set am aur mp 
                      
                        function formatTimeTo12Hour(time24) {
                          if (!time24) return '';
                      
                          // Sometimes time might have seconds or extra parts, so just take first two parts
                          const [hourStr, minuteStr] = time24.split(':');
                          let hour = parseInt(hourStr, 10);
                          const minute = minuteStr ? minuteStr.padStart(2, '0') : '00';
                      
                          const ampm = hour >= 12 ? 'PM' : 'AM';
                          hour = hour % 12;
                          if (hour === 0) hour = 12;
                      
                          return `${hour}:${minute} ${ampm}`;
                        }
                      
                        function timeStringToDecimalHours(time24) {
                          if (!time24) return 0;
                          const [hourStr, minuteStr] = time24.split(':');
                          const hour = parseInt(hourStr, 10);
                          const minute = parseInt(minuteStr || '0', 10);
                          return hour + minute / 60;
                        }
                      
                        return (
                          <div className="container py-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h3 className="mb-0">Time Logs</h3>
                              <div className="d-flex gap-3">
                      
                                <Link className="text-decoration-none">
                                  <Button
                                    className="btn d-flex align-items-center gap-2"
                                    size="sm"
                                    id='All_btn'
                                    variant="dark"
                                    onClick={() => {
                                      const selectedJobIds = Object.keys(selectedJobs).filter((id) => selectedJobs[id]);
                      
                                      if (selectedJobIds.length === 0) {
                                        setErrorMessage("Please select at least 1 List to assign.");
                                        setTimeout(() => setErrorMessage(""), 3000);
                                      } else {
                                        const dataToSend = {
                                          id: selectedJobIds,
                                          extraHours: extraHours || "0:00",
                                        };
                      
                                        console.log("Payload to send:", dataToSend);
                      
                                        // Optionally, send this to server here
                                        setShowAssignModal(true);
                                      }
                                    }}
                                  >
                                    <FaPlus /> ExtraTime
                                  </Button>
                                </Link>
                                <Link to={"/admin/AddTimelog"} className="text-decoration-none">
                                  <button id='All_btn' className="btn btn-dark d-flex align-items-center gap-2">
                                    <FaPlus /> Add Time Log
                                  </button>
                                </Link>
                              </div>
                            </div>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                      
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
                                        <th>
                                          <input
                                            type="checkbox"
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              const newSelected = {};
                                              paginatedTimeLogss?.forEach((log) => {
                                                if (log._id) newSelected[log._id] = checked;
                                              });
                                              setSelectedJobs(newSelected);
                                            }}
                                            checked={
                                              paginatedTimeLogss?.length > 0 &&
                                              paginatedTimeLogss?.every((log) => selectedJobs[log._id])
                                            }
                                          />
                                        </th>
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
                                      {paginatedTimeLogss?.map((log, index) => {
                                        const extraHoursDecimal = timeStringToDecimalHours(log.extraHours);
                                        const hoursDecimal = timeStringToDecimalHours(log.hours);
                      
                                        const isHoursDiscrepant = hoursDecimal > 8;
                                        const isExtraHoursDiscrepant = extraHoursDecimal < 8;
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <input
                                                type="checkbox"
                                                checked={selectedJobs[log._id] || false}
                                                onChange={() => handleCheckboxChange(log._id)}
                                              />
                                            </td>
                      
                                            <td>{new Date(log.date).toLocaleDateString('en-GB').replace(/\/20/, '/')}</td>
                      
                                            <td className="no-border-bottom">
                                              #JOB{String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0')}
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }} key={index}>
                                              {log.projectId?.[0]?.projectName || 'No Project Name'}
                                            </td>
                                            <td>
                                              {(!log.extraHours || log.extraHours === '0' || log.extraHours === '0:00') ? '-' : formatTimeTo12Hour(log.extraHours)}
                                            </td>
                      
                                            <td
                                              style={{
                                                color: isHoursDiscrepant ? 'red' : 'inherit',
                                                fontWeight: isHoursDiscrepant ? 'bold' : 'normal',
                                                whiteSpace: 'nowrap',
                                              }}
                                            >
                                              {formatTimeTo12Hour(log.hours)}
                                            </td>
                      
                                            <td style={{ whiteSpace: 'nowrap' }}>{log.taskNotes}</td>
                      
                                            <td className="text-end" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                              {/* <Link className="text-decoration-none">
                                                <Button
                                                  className="btn d-flex align-items-center gap-2"
                                                  size="sm"
                                                  id="All_btn"
                                                  variant="dark"
                                                  onClick={() => setShowAssignModal(true)}
                                                >
                                                  <FaPlus /> ExtraTime
                                                </Button>
                                              </Link> */}
                                              <button
                                                className="btn btn-link text-dark p-0 me-3"
                                                onClick={() => handleEdit(log)}
                                              >
                                                <FaPencilAlt />
                                              </button>
                                              <button
                                                className="btn btn-link text-danger p-0"
                                                onClick={() => handleDelete(log._id)}
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
                      
                            {!loading && !error && (
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="text-muted small">
                                  Showing 1 to {paginatedTimeLogss?.length || 0} of {timelogs.TimeLogss?.length || 0} entries
                                </div>
                      
                                <ul className="pagination pagination-sm mb-0">
                                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                      Previous
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
                                      Next
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                      
                            {/* Assign Modal */}
                            <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
                              <Modal.Header closeButton>
                                <Modal.Title>Extra Hours</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Extra Hours</Form.Label>
                                    <Form.Control
                                      type="time"
                                      value={extraHours}
                                      onChange={(e) => setExtraHours(e.target.value)}
                                      placeholder="Enter extra hours"
                                      step="60" // step in seconds — 60 = 1 min steps
                                    />
                                  </Form.Group>
                      
                                </Form>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
                                  Cancel
                                </Button>
                                <Button id='All_btn' onClick={handleSubmitAssignment}>
                                  Save Time Log
                                </Button>
                              </Modal.Footer>
                            </Modal>
                      
                          </div>
                        );
                      }
                      
                      export default TimeLogs;