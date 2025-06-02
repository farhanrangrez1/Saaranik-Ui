import React, { useEffect, useState } from 'react';
import { Form, Table, Badge, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaSort, FaEdit, FaTrash, FaDownload, FaFilter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import { deleteInvoicingBilling, fetchInvoicingBilling } from '../../../redux/slices/InvoicingBillingSlice';
import { useDispatch, useSelector } from 'react-redux';

function Invoicing_Billing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialInvoices = [
    {
      invoiceNumber: 'INV-12345',
      client: 'Acme Corp',
      project: 'Holiday Package Design',
      amount: 2500.00,
      status: 'Paid',
      dueDate: '2024-01-15'
    },
    {
      invoiceNumber: 'INV-12345',
      client: 'Tech Solutions',
      project: 'Product Catalog',
      amount: 3750.00,
      status: 'Pending',
      dueDate: '2024-01-30'
    },
    {
      invoiceNumber: 'INV-12345',
      client: 'Global Inc',
      project: 'Brand Guidelines',
      amount: 5000.00,
      status: 'Overdue',
      dueDate: '2024-01-10'
    }
  ];

  const [invoices, setInvoices] = useState(initialInvoices);

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = initialInvoices.filter(invoice =>
      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.client.toLowerCase().includes(query) ||
      invoice.project.toLowerCase().includes(query)
    );
    setInvoices(filtered);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);

    const sorted = [...invoices].sort((a, b) => {
      if (field === 'amount') {
        return isAsc ? b[field] - a[field] : a[field] - b[field];
      }
      return isAsc
        ? b[field].localeCompare(a[field])
        : a[field].localeCompare(b[field]);
    });
    setInvoices(sorted);
  };

  const [showAddInvoice, setShowAddInvoice] = useState(false);

  const handleGenerateInvoice = () => {
    setShowAddInvoice(true);
  };

  const handleCloseAddInvoice = () => {
    setShowAddInvoice(false);
  };

  const handleAddInvoice = (newInvoice) => {
    const invoiceNumber = `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`;
    const invoice = {
      ...newInvoice,
      invoiceNumber,
    };
    setInvoices([invoice, ...invoices]);
    setShowAddInvoice(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("This is a PDF content example.", 10, 10); // Replace with your actual data
    doc.save("document.pdf");
  };

  const { invocing, loading, error } = useSelector((state) => state.InvoicingBilling);
  console.log(invocing?.InvoicingBilling);

  useEffect(() => {
    dispatch(fetchInvoicingBilling());
  }, [dispatch]);

  // PAGINATION SETUP FOR ESTIMATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalItems = invocing?.InvoicingBilling?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedEstimates = invocing?.InvoicingBilling
    ?.slice()
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to mark this job as Cancelled?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as Cancelled!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteInvoicingBilling(_id))
          .unwrap()
          .then(() => {
            Swal.fire("Updated!", "The job has been marked as Cancelled.", "success");
            dispatch(fetchInvoicingBilling());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong while updating.", "error");
          });
      }
    });
  };

  const UpdateInvocing = (invoice) => {
    navigate(`/admin/AddInvoice`, {
      state: { invoice }
    });
  }

  // Responsive filter toggle state
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>Invoicing & Billing</h2>
        {/* Desktop generate button only */}
        <div className="d-none d-md-block">
          <Link to={"/admin/AddInvoice"}>
            <button id="All_btn" className="btn btn-dark">
              Generate New Invoice
            </button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        {/* Desktop search */}
        <div className="d-none d-md-block w-25">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>
        </div>

        {/* Desktop Filters */}
        <div className="d-none d-md-flex gap-2 align-items-center">
          <Form.Select className="w-auto">
            <option>All Clients</option>
          </Form.Select>
          <Form.Select className="w-auto">
            <option>All Status</option>
          </Form.Select>
          <button className="btn btn-outline-secondary">
            <FaSort /> Sort
          </button>
        </div>

        {/* Mobile filter toggle button */}
        <div className="d-flex d-md-none align-items-center gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-expanded={showFilters}
            aria-controls="mobile-filters"
          >
            <FaFilter /> Filter
          </Button>
        </div>
      </div>

      {/* Mobile filter dropdown panel */}
      {showFilters && (
        <div
          id="mobile-filters"
          className="d-md-none mb-3 p-3 border rounded"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          {/* Search inside mobile filters */}
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </InputGroup>

          <Form.Select className="mb-2">
            <option>All Clients</option>
          </Form.Select>
          <Form.Select className="mb-2">
            <option>All Status</option>
          </Form.Select>
          <Button className="w-100 mb-3" variant="outline-secondary">
            <FaSort /> Sort
          </Button>

          {/* Generate New Invoice inside filter panel on mobile */}
          <Link to={"/admin/AddInvoice"}>
            <Button variant="dark" className="w-100">
              Generate New Invoice
            </Button>
          </Link>
        </div>
      )}

      {/* Table */}
      <Table hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('invoiceNumber')} style={{ whiteSpace: "nowrap" }}>Invoice #</th>
            <th onClick={() => handleSort('client')} style={{ cursor: 'pointer' }}>Client</th>
            <th onClick={() => handleSort('project')} style={{ cursor: 'pointer' }}>Project</th>
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount</th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status</th>
            <th onClick={() => handleSort('dueDate')} style={{ cursor: 'pointer' }}>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEstimates?.map((invoice, index) => (
            <tr key={invoice.invoiceNumber || index}>
              <td style={{ whiteSpace: "nowrap" }} /* onClick={() => JobDetails(invoice._id)} */>
                INV-{String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0')}
              </td>

              <td style={{ whiteSpace: "nowrap" }}>{invoice.clients?.[0]?.clientName || "N/A"}</td>
              <td style={{ whiteSpace: "nowrap" }}>{invoice.projectId?.[0]?.projectName || "N/A"}</td>
              <td style={{ whiteSpace: "nowrap" }}>${invoice.lineItems?.[0]?.amount || "N/A"}</td>
              <td>
                <Badge bg={getStatusBadgeVariant(invoice.status)}>
                  {invoice.status}
                </Badge>
              </td>
              <td>{invoice.date ? new Date(invoice.date).toLocaleDateString("en-GB") : 'N/A'}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateInvocing(invoice)}>
                    <FaEdit />
                  </button>
                  {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(invoice._id)}>
                    <FaTrash />
                  </button> */}
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleDownloadPDF}
                  >
                    <FaDownload />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div className="text-muted small mb-2 mb-md-0">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                <span aria-hidden="true">&laquo;</span>
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
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Invoicing_Billing;
