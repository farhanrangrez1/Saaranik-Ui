import React, { useEffect, useState } from 'react';
import UserRoleModal from './UserRoleModal';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteusers, fetchusers } from '../../../redux/slices/userSlice';
import Swal from 'sweetalert2';
import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";

function UserRoles() {
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const [selectedPOStatus, setSelectedPOStatus] = useState("All Roles");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Admin',
      status: 'Active',
      permissions: 'Full Access'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Manager',
      status: 'Active',
      permissions: 'Limited Access'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'm.brown@example.com',
      role: 'Designer',
      status: 'Pending',
      permissions: 'Design Tools Only'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { userAll, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  // Enhanced filtering logic
  const filteredUsers = (userAll?.data?.users || []).filter(user => {
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch = !searchTerm || 
      (user.firstName || '').toLowerCase().includes(searchLower) ||
      (user.lastName || '').toLowerCase().includes(searchLower) ||
      (user.email || '').toLowerCase().includes(searchLower) ||
      (user.role || '').toLowerCase().includes(searchLower) ||
      (user.state || '').toLowerCase().includes(searchLower);

    const matchesRole = selectedPOStatus === "All Roles" || 
      (user.role || '').toLowerCase() === selectedPOStatus.toLowerCase();

    return matchesSearch && matchesRole;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (role) => {
    setSelectedPOStatus(role);
    setCurrentPage(1);
  };

  const handleDeleteUser = (_id) => {
    console.log(_id);
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
        dispatch(deleteusers(_id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchusers());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  }
  const handleEditUser = (user) => {
  navigate(`/admin/UserRoleModal`, { state: {user} });
  };

  return (
    <div className=" p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px", }}>
  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
  <div className="d-flex flex-wrap gap-2 align-items-center">
    <input
      type="text"
      className="form-control"
      placeholder="Search users..."
      value={searchTerm}
      onChange={handleSearch}
      style={{ width: '200px' }}
    />
     <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="viewall-dropdown"
              className="custom-dropdown"
            >
              {selectedPOStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRoleChange("All Roles")}>All Roles</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRoleChange("Admin")}>Admin</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRoleChange("Employee")}>Employee</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRoleChange("Client")}>Client</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
  </div>

  <Link to="/admin/UserRoleModal">
    <button id="All_btn" className="btn btn-dark">
      + Add User
    </button>
  </Link>
</div>


      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                          {user.firstName.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                          <div className="text-muted small">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge ${user.role === 'Admin' ? 'text-bg-dark' : user.role === 'Manager' ? 'text-bg-primary' : 'text-bg-info'}`}>
                        {user?.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.state === 'Active' ? 'text-bg-success' : 'text-bg-warning'}`}>
                        {user?.state}
                      </span>
                    </td>
                    <th style={{ fontWeight: "400" }}>
                      {user && user.permissions
                        ? Object.entries(user.permissions)
                          .filter(([_, value]) => value === true)
                          .map(([key]) => key)
                          .join(', ')
                        : 'N/A'}
                    </th>

                    {/* <td>{user.permissions}</td> */}
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEditUser(user)}
                        >
                          <FaEdit />
                        </button>
                        {/* <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <FaTrashAlt />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
                </button>
                    
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    <span aria-hidden="true">&raquo;</span></button>
            </li>
          </ul>
        </nav>
      </div>

      {/* <UserRoleModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        editingUser={editingUser}
      /> */}
    </div>
  );
}

export default UserRoles;