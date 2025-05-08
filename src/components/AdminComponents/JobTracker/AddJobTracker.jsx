import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Barcode from 'react-barcode';
import Select from 'react-select';

function AddJobTracker() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brandName: '',
    subBrand: '',
    flavour: '',
    packType: '',
    packSize: '',
    priority: '',
    status: '',
    timeLogged: '',
  });

  // Static options for auto-suggestion
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://localhost:5000/client/createClient';
      const res = await axios.post(apiUrl, formData);
      toast.success('Client created successfully!');

      setFormData({
        brandName: '',
        subBrand: '',
        flavour: '',
        packType: '',
        packSize: '',
        priority: '',
        status: '',
        timeLogged: '',
      });

      setTimeout(() => {
        navigate('/clientManagement');
      }, 1000);
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error('Failed to create client.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title h4 mb-4">Add New Jobs</h1>
            <form className="row g-3" onSubmit={handleSubmit}>
              {/* <h5 className="mb-3 mt-4">Job Details</h5> */}

              <div className="col-md-6">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="POS"
                  placeholder="Enter project name"
                  disabled
                />
              </div>

              {/* Brand Name (react-select) */}
              <div className="col-md-6">
                <label className="form-label">Brand Name</label>
                <Select
                  options={brandOptions}
                  value={brandOptions.find(option => option.value === formData.brandName)}
                  onChange={(selectedOption) =>
                    setFormData((prev) => ({ ...prev, brandName: selectedOption?.value || '' }))
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

              {/* Flavour (react-select) */}
              <div className="col-md-6">
                <label className="form-label">Flavour</label>
                <Select
                  options={flavourOptions}
                  value={flavourOptions.find(option => option.value === formData.flavour)}
                  onChange={(selectedOption) =>
                    setFormData((prev) => ({ ...prev, flavour: selectedOption?.value || '' }))
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

              {/* Pack Size (react-select) */}
              <div className="col-md-6">
                <label className="form-label">Pack Size</label>
                <Select
                  options={packSizeOptions}
                  value={packSizeOptions.find(option => option.value === formData.packSize)}
                  onChange={(selectedOption) =>
                    setFormData((prev) => ({ ...prev, packSize: selectedOption?.value || '' }))
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
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Time Logged */}
              {/* <div className="col-md-6">
                <label className="form-label">Time Logged (in hours)</label>
                <input
                  type="number"
                  className="form-control"
                  name="timeLogged"
                  value={formData.timeLogged}
                  onChange={handleChange}
                />
              </div> */}

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
