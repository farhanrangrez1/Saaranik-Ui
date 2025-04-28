import React, { useState } from 'react';
import { Form, Table, Badge, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSort, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import AddInvoice from './AddInvoice';
import { Link } from 'react-router-dom';

import { jsPDF } from "jspdf";

function Invoicing_Billing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

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


  const handleDownloadPDF  = () => {
    const doc = new jsPDF();
    doc.text("This is a PDF content example.", 10, 10); // Replace with your actual data
    doc.save("document.pdf");
  };
  return (
    <div className=" p-4 m-3" style={{backgroundColor:"white",borderRadius:"10px",}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Invoicing & Billing</h2>
       <Link to={"/AddInvoice"}> <button id="All_btn" className="btn btn-dark">
          Generate New Invoice
        </button></Link>
      </div>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-25">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </InputGroup>

        <div className="d-flex gap-2">
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
      </div>

      <Table hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('invoiceNumber')} style={{ cursor: 'pointer' }}>Invoice #</th>
            <th onClick={() => handleSort('client')} style={{ cursor: 'pointer' }}>Client</th>
            <th onClick={() => handleSort('project')} style={{ cursor: 'pointer' }}>Project</th>
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount</th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status</th>
            <th onClick={() => handleSort('dueDate')} style={{ cursor: 'pointer' }}>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.client}</td>
              <td>{invoice.project}</td>
              <td>${invoice.amount.toFixed(2)}</td>
              <td>
                <Badge bg={getStatusBadgeVariant(invoice.status)}>
                  {invoice.status}
                </Badge>
              </td>
              <td>{invoice.dueDate}</td>
              <td>
  <div className="d-flex gap-2">
    <button className="btn btn-sm btn-outline-primary">
      <FaEdit />
    </button>
    <button className="btn btn-sm btn-outline-danger">
      <FaTrash />
    </button>
    <button
      className="btn btn-sm btn-outline-secondary"
      onClick={handleDownloadPDF }
    >
      <FaDownload />
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>Showing 1 to 3 of 15 entries</div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" disabled>Previous</button>
          <button className="btn btn-dark">1</button>
          <button className="btn btn-outline-secondary">2</button>
          <button className="btn btn-outline-secondary">3</button>
          <button className="btn btn-outline-secondary">Next</button>
        </div>
      </div>

      <Modal show={showAddInvoice} onHide={handleCloseAddInvoice} size="lg">
        <Modal.Body>
          <AddInvoice onClose={handleCloseAddInvoice} onSubmit={handleAddInvoice} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Invoicing_Billing;