import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchProject } from '../../../redux/slices/ProjectsSlice';
import { fetchjobs } from '../../../redux/slices/JobsSlice';
import { createTimesheetWorklog, updateTimesheetWorklog } from '../../../redux/slices/TimesheetWorklogSlice'; // Make sure this exists
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTimesheetWorklog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { entry } = location.state || {};
const _id = entry?._id;

  const { project } = useSelector(state => state.projects);
  const { job } = useSelector(state => state.jobs);

console.log(" Data:", entry);

  const [formData, setFormData] = useState({
    date: '',
    projectId: '',
    jobId: '',
    status: '',
    startTime: '',
    endTime: '',
    hours: '',
    taskDescription: '',
    tags: '',
    projectName: '',
    jobName: ''
  });

useEffect(() => {
  if (entry) {
    const parsedDate = entry.date
      ? new Date(entry.date).toISOString().split('T')[0]
      : '';

    setFormData({
      date: parsedDate,
      projectId: Array.isArray(entry.projectId) ? entry.projectId[0]._id : '',
      jobId: Array.isArray(entry.jobId) ? entry.jobId[0]._id : '',
      status: entry.status || '',
      startTime: entry.startTime || '',
      endTime: entry.endTime || '',
      hours: entry.hours || '',
      taskDescription: entry.taskDescription || '',
      tags: entry.tags || '',
      projectName: Array.isArray(entry.projectId) ? entry.projectId[0].projectName : '',
      jobName: Array.isArray(entry.jobId) ? entry.jobId[0].jobName || '' : ''
    });
  }
}, [entry]);

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchjobs());
  }, [dispatch]);

  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);

      const start = new Date();
      start.setHours(startHour, startMinute, 0);

      const end = new Date();
      end.setHours(endHour, endMinute, 0);

      let diff = (end - start) / 1000 / 60 / 60; // hours

      if (diff < 0) diff = 0;

      setFormData(prev => ({
        ...prev,
        hours: diff.toFixed(2)
      }));
    }
  }, [formData.startTime, formData.endTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    projectId: [formData.projectId],
    jobId: [formData.jobId],
    date: formData.date,
    startTime: formData.startTime,
    endTime: formData.endTime,
    hoursWorked: formData.hours,
    hours: formData.hours,
    taskDescription: formData.taskDescription,
    status: formData.status,
    tags: formData.tags,
    projectName: formData.projectName,
    jobName: formData.jobName
  };

  if (_id) {
    dispatch(updateTimesheetWorklog({ _id, data: payload }))
      .unwrap()
      .then(() => {
        toast.success("Timesheet updated successfully!");
        navigate("/TimesheetWorklog");
      })
      .catch((err) => {
        console.error("Update error:", err); 
        toast.error("Failed to update timesheet!");
      });
  } else {
    dispatch(createTimesheetWorklog(payload))
      .unwrap()
      .then(() => {
        toast.success("Timesheet created successfully!");
        navigate("/TimesheetWorklog");
      })
      .catch(() => {
        toast.error("Error creating timesheet");
      });
  }
};


  const reversedProjectList = project?.data?.slice().reverse() || [];
  const reversedJobList = job?.jobs?.slice().reverse() || [];

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Timesheet & Worklog</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      name="projectId"
                      value={formData.projectId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedProject = project?.data?.find(p => p._id === selectedId);
                        setFormData(prev => ({
                          ...prev,
                          projectId: selectedId,
                          projectName: selectedProject?.projectName || ""
                        }));
                      }}
                      required
                    >
                      <option value="">Select a project</option>
                      {reversedProjectList.map((proj) => (
                        <option key={proj._id} value={proj._id}>
                          {proj.projectName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Job</label>
                    <select
                      className="form-select"
                      name="jobId"
                      value={formData.jobId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedJob = reversedJobList.find(j => j._id === selectedId);
                        setFormData(prev => ({
                          ...prev,
                          jobId: selectedId,
                          jobName: selectedJob?.jobName || `${selectedJob?.brandName} ${selectedJob?.subBrand}`
                        }));
                      }}
                      required
                    >
                      <option value="">Select a job</option>
                      {reversedJobList.map((j) => (
                        <option key={j._id} value={j._id}>
                          {j?.jobName || `${j.brandName} ${j.subBrand}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Hours</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="hours"
                      value={formData.hours}
                      onChange={handleInputChange}
                      placeholder="e.g. 3.5"
                      readOnly
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Task Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="taskDescription"
                      value={formData.taskDescription}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="Add tags separated by commas"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to="/TimesheetWorklog" className="btn btn-light">Cancel</Link>
                  <button type="submit" className="btn btn-dark">
                    {id ? "Update Time Entry" : "Submit Time Entry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimesheetWorklog;
