import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchusers, fetchusersById, updateusers } from '../../../redux/slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserRoleModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const { user } = location.state || {};
  const userId = location.state?.id;
    console.log("hhhhhhhhhh", user);

    const { userAll, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    role: '',
    roleDescription: '',
    permissions: {
      dashboardAccess: false,
      clientManagement: false,
      projectManagement: false,
      designTools: false,
      financialManagement: false,
      userManagement: false,
      reportGeneration: false,
      systemSettings: false
    },
    accessLevel: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(() => {
    if (user) {
      let parsedPermissions = {};
      let parsedAccessLevel = 'fullAccess';

      try {
        parsedPermissions = typeof user.permissions === 'string'
          ? JSON.parse(user.permissions)
          : user.permissions || {};

        const accessLevelData = typeof user.accessLevel === 'string'
          ? JSON.parse(user.accessLevel)
          : {};

        parsedAccessLevel = Object.keys(accessLevelData).find(key => accessLevelData[key]) || 'fullAccess';
      } catch (error) {
        console.error('Error parsing permissions or access level:', error);
      }

      setFormData({
         _id: user._id || '',  
        role: user.role?.charAt(0).toUpperCase() + user.role?.slice(1).toLowerCase() || '',
        roleDescription: user.roleDescription || '',
        permissions: {
          dashboardAccess: false,
          clientManagement: false,
          projectManagement: false,
          designTools: false,
          financialManagement: false,
          userManagement: false,
          reportGeneration: false,
          systemSettings: false,
          ...parsedPermissions
        },
        accessLevel: parsedAccessLevel
      });

    }
  }, [user]);

  const handlePermissionChange = (e) => {
    const { name } = e.target;
    const updatedpermissions = Object.fromEntries(
      Object.keys(formData.permissions).map((key) => [key, key === name])
    );
    setFormData(prev => ({
      ...prev,
      permissions: updatedpermissions
    }));
  };

  const handleaccessLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      accessLevel: e.target.value
    }));
  };
  
const handleSubmit = (e) => {
  e.preventDefault();
  const filteredpermissions = Object.fromEntries(
    Object.entries(formData.permissions).filter(([_, value]) => value === true)
  );
  const payload = {
    _id: formData._id,
    role: formData.role,
    roleDescription: formData.roleDescription,
    permissions: filteredpermissions,
    accessLevel: formData.accessLevel
  };
  console.log('Payload to be sent hh:', payload);

  if (formData._id) {
    dispatch(fetchusersById({ _id: formData._id, data: payload }))
      .unwrap()
      .then(() => {
        toast.success("user updated successfully!");
        navigate('/admin/ProjectOverview', { state: { openTab: 'users' } });
        dispatch(fetchusers());
      })
      .catch(() => {
        toast.error("Failed to update user!");
      });
  } else {
    dispatch(createuser(payload))
      .unwrap()
      .then(() => {
        toast.success("user created successfully!");
        navigate('/admin/ProjectOverview', { state: { openTab: 'users' } });
        dispatch(fetchProject());
      })
      .catch(() => {
        toast.error("Error creating user");
      });
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const filteredpermissions = Object.fromEntries(
  //     Object.entries(formData.permissions).filter(([_, value]) => value === true)
  //   );

  //   const payload = {
  //     role: formData.role,
  //     roleDescription: formData.roleDescription,
  //     permissions: filteredpermissions,
  //     accessLevel: formData.accessLevel
  //   };

  //   console.log('Payload to be sent:', payload);
  //   try {
  //     await axios.post('/api/roles', payload);
  //     navigate(-1);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     alert('Failed to create role. Please try again.');
  //   }
  // };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Role</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role Name</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
                <option value="Production">Production</option>
                <option value="Employee">Employee</option>
              </select>
            </div>


            <div className="mb-3">
              <label className="form-label">Role Description</label>
              <textarea
                className="form-control"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleInputChange}
                placeholder="Brief description of the role"
                rows="3" />
            </div>

            <div className="mb-4">
              <label className="form-label">permissions (Select Only One)</label>
              <div className="row g-3">
                {Object.keys(formData.permissions).map((key) => (
                  <div className="col-md-6" key={key}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={key}
                        checked={formData.permissions[key]}
                        onChange={handlePermissionChange}
                      />
                      <label className="form-check-label text-capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Access Level</label>
              <div>
                {['fullAccess', 'limitedAccess', 'viewOnly'].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="accessLevel"
                      value={level}
                      checked={formData.accessLevel === level}
                      onChange={handleaccessLevelChange}
                    />
                    <label className="form-check-label text-capitalize">{level.replace(/([A-Z])/g, ' $1')}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-dark">Create Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRoleModal;