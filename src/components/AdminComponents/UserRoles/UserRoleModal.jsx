import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserRoleModal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roleName: '',
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
    accessLevel: 'fullAccess'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };

  const handleAccessLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      accessLevel: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate(-1);
  };

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
              <input type="text"
                className="form-control"
                name="roleName"
                value={formData.roleName}
                onChange={handleInputChange}
                placeholder="Enter role name"
                required/>
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
              <label className="form-label">Permissions</label>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-check">
                    <input type="checkbox"  className="form-check-input"
                      name="dashboardAccess"
                      checked={formData.permissions.dashboardAccess}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Dashboard Access</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                      name="clientManagement"
                      checked={formData.permissions.clientManagement}
                      onChange={handlePermissionChange}/>
                    <label className="form-check-label">Client Management</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox"
                      className="form-check-input"
                      name="projectManagement"
                      checked={formData.permissions.projectManagement}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Project Management</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="designTools"
                      checked={formData.permissions.designTools}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Design Tools</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="financialManagement"
                      checked={formData.permissions.financialManagement}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Financial Management</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="userManagement"
                      checked={formData.permissions.userManagement}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">User Management</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="reportGeneration"
                      checked={formData.permissions.reportGeneration}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">Report Generation</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox"
                      className="form-check-input"
                      name="systemSettings"
                      checked={formData.permissions.systemSettings}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">System Settings</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Access Level</label>
              <div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="accessLevel"
                    value="fullAccess"
                    checked={formData.accessLevel === 'fullAccess'}
                    onChange={handleAccessLevelChange}
                  />
                  <label className="form-check-label">Full Access</label>
                </div>
                <div className="form-check">
                  <input
                     type="radio"
                    className="form-check-input"
                    name="accessLevel"
                    value="limitedAccess"
                    checked={formData.accessLevel === 'limitedAccess'}
                    onChange={handleAccessLevelChange}
                  />
                  <label className="form-check-label">Limited Access</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="accessLevel"
                    value="viewOnly"
                    checked={formData.accessLevel === 'viewOnly'}
                    onChange={handleAccessLevelChange}
                  />
                  <label className="form-check-label">View Only</label>
                </div>
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
