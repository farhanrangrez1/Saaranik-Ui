import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject } from '../../../redux/slices/ProjectsSlice';
import { fetchjobs } from '../../../redux/slices/JobsSlice';

function AddTimesheetWorklog() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: '',
    projectsId: '',
    jobId: '',
    status: '',
    startTime: '',
    endTime: '',
    hours: '',
    taskDescription: '',
    tags: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // ✅ Console output of full form data
  };

  const { project } = useSelector((state) => state.projects);
  const { job } = useSelector((state) => state.jobs);

  const reversedProjectList = project?.data?.slice().reverse() || [];
  const reversedJobList = job?.jobs?.slice().reverse() || [];

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchjobs());
  }, [dispatch]);

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
                      name="projectsId"
                      value={formData.projectsId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedProject = project?.data?.find(p => p._id === selectedId);
                        setFormData({
                          ...formData,
                          projectsId: selectedId,
                          projectName: selectedProject?.projectName || ""
                        });
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
                    <label className="form-label">Jobs</label>
                    <select
                      className="form-select"
                      name="jobId"
                      value={formData.jobId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedJob = reversedJobList.find(j => j._id === selectedId);
                        setFormData({
                          ...formData,
                          jobId: selectedId,
                          jobName: selectedJob?.jobName || selectedJob?.brandName + ' ' + selectedJob?.subBrand || ""
                        });
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
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
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
                      type="text"
                      className="form-control"
                      name="hours"
                      value={formData.hours}
                      onChange={handleInputChange}
                      placeholder="e.g. 3.5"
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
                  <button type="submit" className="btn btn-dark">Submit Time Entry</button>
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
