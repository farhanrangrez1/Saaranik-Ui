import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Barcode from 'react-barcode';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../../../redux/slices/ProjectsSlice';
import { createjob, fetchjobById, updatejob } from '../../../redux/slices/JobsSlice';


function AddJobTracker() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mode
  const location = useLocation();
  const { job } = location.state || {};
console.log(job);

  // All Projects
  const { project, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    projectsId: '',
    brandName: '',
    subBrand: '',
    flavour: '',
    packType: '',
    packSize: '',
    priority: '',
    Status: '',
    totalTime: '',  
    assign: '',
    barcode:"POS-123456",  
  });

  // Static options
  const brandOptions = [
    { value: 'Pepsi', label: 'Pepsi' },
    { value: 'CocaCola', label: 'CocaCola' },
    { value: 'Fanta', label: 'Fanta' },
  ];

  const flavourOptions = [
    { value: 'Orange', label: 'Orange' },
    { value: 'Lime', label: 'Lime' },
    { value: 'Ginger Ale', label: 'Ginger Ale' },
  ];

  const packSizeOptions = [
    { value: '250ml', label: '250ml' },
    { value: '500ml', label: '500ml' },
    { value: '1L', label: '1L' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
  //   dispatch(createjob(formData))
  // };


  useEffect(() => {
    if (job) {
      setFormData((prev) => ({
        ...prev,
        ...job,
        projectsId: job.project?._id || job.project?.projectId || '', 
      }));
    } else if (id) {
      dispatch(fetchjobById(id)).then((res) => {
        const fetchedJob = res.payload;
        if (fetchedJob) {
          setFormData((prev) => ({
            ...prev,
            ...fetchedJob,
            projectsId: fetchedJob.project?._id || fetchedJob.project?.projectId || '', 
          }));
        }
      });
    }
  }, [id, job, dispatch]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


   const handleSubmit = (e) => {
      e.preventDefault();
      if (id) {
        dispatch(updatejob({ id, data: payload }))
          .unwrap()
          .then(() => {
            toast.success("job updated successfully!");
            navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
            dispatch(fetchProject());
          })
          .catch(() => {
            toast.error("Failed to update project!");
          });
      } else {
        dispatch(createjob(formData))
          .unwrap()
          .then(() => {
            toast.success("job created successfully!");
            navigate('/ProjectOverview', { state: { openTab: 'jobs' } });
            dispatch(fetchProject());
          })
          .catch(() => {
            toast.error("Error creating project");
          });
      }
    };

// 
    const handleCancel = () => {
      navigate("/projectList");
    }
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title h4 mb-4">Add New Jobs</h1>
            <form className="row g-3" onSubmit={handleSubmit}>

              {/* Project Name */}
              <div className="col-md-6">
                <label className="form-label">Project Name</label>
                <select
                  name="projectsId"
                  className="form-control"
                  value={formData.projectsId}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a project</option>
                  {project?.data?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Name */}
              <div className="col-md-6">
                <label className="form-label">Brand Name</label>
                <Select
                  options={brandOptions}
                  value={brandOptions.find(opt => opt.value === formData.brandName)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, brandName: option?.value || '' }))
                  }
                  isClearable
                />
              </div>

              {/* Sub Brand */}
              <div className="col-md-6">
                <label className="form-label">Sub Brand</label>
                <input
                  type="text"
                  className="form-control"
                  name="subBrand"
                  value={formData.subBrand}
                  onChange={handleChange}
                />
              </div>

              {/* Flavour */}
              <div className="col-md-6">
                <label className="form-label">Flavour</label>
                <Select
                  options={flavourOptions}
                  value={flavourOptions.find(opt => opt.value === formData.flavour)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, flavour: option?.value || '' }))
                  }
                  isClearable
                />
              </div>

              {/* Pack Type */}
              <div className="col-md-6">
                <label className="form-label">Pack Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="packType"
                  value={formData.packType}
                  onChange={handleChange}
                />
              </div>

              {/* Pack Size */}
              <div className="col-md-6">
                <label className="form-label">Pack Size</label>
                <Select
                  options={packSizeOptions}
                  value={packSizeOptions.find(opt => opt.value === formData.packSize)}
                  onChange={(option) =>
                    setFormData((prev) => ({ ...prev, packSize: option?.value || '' }))
                  }
                  isClearable
                />
              </div>

              {/* Priority */}
              <div className="col-md-6">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Total Time Logged */}
              <div className="col-md-6">
                <label className="form-label">Total Time Logged</label>
                <input
                  type="time"
                  className="form-control"
                  name="totalTime"
                  value={formData.totalTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, totalTime: e.target.value }))
                  }
                />
              </div>

              {/* assign */}
              <div className="col-md-6">
                <label className="form-label">assign</label>
                <select
                  className="form-select"
                  name="assign"
                  value={formData.assign}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Production">Production</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>

              {/* Barcode */}
              <div className="col-md-1">
                <Barcode value="POS-123456" />
              </div>

              {/* Buttons */}
              <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-secondary">Cancel</button>
                <button type="submit" className="btn btn-dark">Add Jobs</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddJobTracker;
