import React, { useEffect, useState } from 'react'; import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchProject } from '../../../redux/slices/ProjectsSlice';
import { fetchjobs } from '../../../redux/slices/JobsSlice';
import { createTimesheetWorklog, updateTimesheetWorklog } from '../../../redux/slices/TimesheetWorklogSlice'; // Make sure this exists
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchusers, SingleUser } from '../../../redux/slices/userSlice';
import { fetchMyJobs } from '../../../redux/slices/Employee/MyJobsSlice';

function AddTimeLog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { entry } = location.state || {};
  const _id = entry?._id;

  const { UserSingle, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(SingleUser());
  }, [dispatch]);
  const empid = UserSingle?._id;


  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  };

  const [formData, setFormData] = useState({
    projectId: '',
    jobId: '',
    employeeId: empid,
    date: getTodayDate(),
    status: '',
    startTime: '',
    endTime: '',
    taskDescription: '',
    tags: '',
    projectName: '',
    jobName: ''
  });

  useEffect(() => {
    if (entry) {
      const parsedDate = entry.date
        ? new Date(entry.date).toISOString().split('T')[0]
        : getTodayDate();
      setFormData({
        date: parsedDate,
        projectId: Array.isArray(entry.projectId) ? entry.projectId[0]._id : '',
        jobId: Array.isArray(entry.jobId) ? entry.jobId[0]._id : '',
        employeeId: Array.isArray(entry.employeeId) ? entry.employeeId[0]._id : '',
        status: entry.status || '',
        startTime: entry.startTime || '',
        endTime: entry.endTime || '',
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
    dispatch(fetchusers());
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

  const convertTo12HourFormat = (time24) => {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      projectId: [formData.projectId],
      jobId: [formData.jobId],
      employeeId: [formData.employeeId],
      date: formData.date,
      startTime: convertTo12HourFormat(formData.startTime),
      endTime: convertTo12HourFormat(formData.endTime),
      taskDescription: formData.taskDescription,
      status: formData.status,
      tags: formData.tags,
      projectName: formData.projectName,
      jobName: formData.jobName
    };

    const successNavigate = () => navigate("/employee/TimeTracking");

    if (_id) {
      dispatch(updateTimesheetWorklog({ _id, data: payload }))
        .unwrap()
        .then((res) => {
          toast.success(res?.message || "Timesheet updated successfully!");
          successNavigate();
        })
        .catch((err) => {
          toast.error(err?.message || "Failed to update timesheet!");
          console.error("Update error:", err);
        });
    } else {
      dispatch(createTimesheetWorklog(payload))
        .unwrap()
        .then((res) => {
          toast.success(res?.message || "Timesheet created successfully!");
          successNavigate();
        })
        .catch((err) => {
          toast.error(err?.message || "Error creating timesheet!");
          console.error("Create error:", err);
        });
    }
  };


  // Project Jobs Employee ye pora data araha hai 
  const { myjobs } = useSelector((state) => state.MyJobs);
  const MynewJobsdata = myjobs && myjobs.assignments && myjobs.assignments.length > 0 ? myjobs.assignments[0].jobId : [];
  console.log("Hhhhhhhhhhhhhhhhhhhh", MynewJobsdata);

  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch]);

  const filteredProjects = MynewJobsdata || [];
  const reversedProjectList = Array.isArray(MynewJobsdata)
    ? MynewJobsdata.flatMap(job => job.projectId).reverse()
    : [];

  const reversedJobList =Array.isArray(MynewJobsdata)
    ? MynewJobsdata.flatMap(job => job.JobNo).reverse()
    : [];

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Timesheet & Worklog</h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Project Dropdown */}
                  <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <select
                      className="form-select"
                      name="projectId"
                      value={formData.projectId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedProject = reversedProjectList.find(p => p._id === selectedId);
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

                  {/* Jobs Dropdown */}
                  <div className="col-md-6">
                    <label className="form-label">Jobs</label>
                    <select
                      className="form-select"
                      name="jobId"
                      value={formData.jobId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const reversedJobList = filteredProjects.find(j => j._id === selectedId);
                        setFormData({
                          ...formData,
                          jobId: selectedId,
                          jobName: reversedJobList?.jobName || reversedJobList?.JobNo || (reversedJobList?.brandName + " " + reversedJobList?.subBrand) || "",
                        });
                      }}
                      required
                    >
                      <option value="">Select a job</option>
                      {filteredProjects.map((j) => (
                        <option key={j._id} value={j._id}>
                          {j.JobNo || `${j.brandName} ${j.subBrand}`}
                        </option>
                      ))}
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
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to="/admin/TimesheetWorklog" className="btn btn-light">Cancel</Link>
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

export default AddTimeLog;
