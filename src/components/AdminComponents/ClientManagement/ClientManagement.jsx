import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Dropdown } from 'react-bootstrap';
import { FaEdit, FaEllipsisV, FaEye, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ClientManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClients, fetchClient } from '../../../redux/slices/ClientSlice';
import Swal from 'sweetalert2';

function ClientManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [formData, setFormData] = useState({ industry: "Client" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setClients(response.data.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filtering logic
  const filteredClients = clients.filter(client => {
    const matchesSearch = (client.clientName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (client.clientStatus || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const getStatusBadgeClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'active':
        return 'bg-success text-white px-2 py-1 rounded';
      case 'inactive':
        return 'bg-danger text-white px-2 py-1 rounded';
      default:
        return 'bg-secondary text-white px-2 py-1 rounded';
    }
  };

  //  all client 
  const { Clients, error } = useSelector((state) => state.client);
  console.log(Clients);

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);


  // Delete
   const handleDelete = (id) => {
      console.log(id);
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
          dispatch(deleteClients(id))
            .then(() => {
              Swal.fire("Deleted!", "The document has been deleted.", "success");
                dispatch(fetchClient());
            })
            .catch(() => {
              Swal.fire("Error!", "Something went wrong.", "error");
            });
        }
      });
    }

    const UpdateData =(client)=>{
    navigate(`/AddClientManagement`, { state: { client } });
    }

    return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
        <Row className="mb-4 align-items-center">
          <Col>
            <h4>Client/Supplier</h4>
          </Col>
        </Row>
        <Row className="mb-4 align-items-center">
          <Col md={3}>
            <Form.Control
              type="search"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Col>

          <Col md={2}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Col>
          <Col >
            <Form.Select name="industry" value={formData.industry} onChange={handleChange}>
              <option value="Client">Client</option>
              <option value="Sup">Suppliers</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Col>
          <Col className='me-5 d-flex justify-content-end'>
            <Link to="/AddClientManagement">
              <Button id='All_btn' variant="primary">
                + Add Company
              </Button>
            </Link>
          </Col>

        </Row>

        <div className="table-responsive">
         <Table responsive className="align-middle client-table">
  <thead>
    <tr>
      <th>SL</th>
      <th style={{ whiteSpace: 'nowrap' }}>Client Name</th>
      <th style={{ whiteSpace: 'nowrap' }}>Contact Person</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Industry</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {Clients?.data?.length > 0 ? (
      Clients.data.slice().reverse().map((client, index) => (
        <tr key={client.id}>
          <td>{indexOfFirstClient + index + 1}</td>
          <td style={{ whiteSpace: 'nowrap' }}>
            <div>{client.clientName || 'N/A'}</div>
          </td>
          <td>
            <div style={{ whiteSpace: 'nowrap' }}>{client.contactPersons?.[0]?.contactName || 'N/A'}</div>
          </td>
          <td style={{ whiteSpace: 'nowrap' }}>{client.contactPersons?.[0]?.email || 'N/A'}</td>
          <td style={{ whiteSpace: 'nowrap' }}>{client.contactPersons?.[0]?.phone || 'N/A'}</td> 
          <td style={{ whiteSpace: 'nowrap' }}>{client.industry || 'N/A'}</td>           
          <td>
            <span className={getStatusBadgeClass(client.Status)}>
              {client.Status || 'Unknown'}
            </span>
          </td>
          <td>
            <div className="action-buttons d-flex">
              <Button
              onClick={()=>UpdateData(client)}
              id="icone_btn" size="sm">
                <FaEdit />
              </Button>
              {/* <Button id="icone_btn" size="sm">
                <FaEye />
              </Button> */}
              <Button
                onClick={() => handleDelete(client.id)}
                id="icone_btn"
                size="sm"
              >
                <FaTrash />
              </Button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8" className="text-center">No clients found.</td> 
      </tr>
    )}
  </tbody>
</Table>

        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="light"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </Button>
            <span className="mx-3 align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="light"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default ClientManagement;



