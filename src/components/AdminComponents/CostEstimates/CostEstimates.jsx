import React, { useState } from 'react';
import { Modal, Form, Table, Badge, Dropdown, Button } from 'react-bootstrap';
import { BsPlusLg, BsPencil, BsTrash, BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";

function CostEstimates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const initialPurchaseOrders = [
    {
      poNumber: 'PO/2024/001',
      client: 'AcmeCorp',
      project: 'PackageRedesign',
      estimateRef: 'CE-00001',
      status: 'Pending',
      receivedDate: '2024/01/15',
      amount: 3000.00
    },
    {
      poNumber: 'PO/2024/002',
      client: 'TechStartInc',
      project: 'BrandIdentity',
      estimateRef: 'CE-00002',
      status: 'Approved',
      receivedDate: '2024/01/14',
      amount: 3500.00
    },
    {
      poNumber: 'PO/2024/003',
      client: 'GlobalFoods',
      project: 'LabelDesign',
      estimateRef: 'CE-00003',
      status: 'Pending',
      receivedDate: '2024/01/13',
      amount: 2800.00
    }
  ];
  
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders);

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      default: return 'secondary';
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = initialPurchaseOrders.filter(po =>
      po.poNumber.toLowerCase().includes(query) ||
      po.client.toLowerCase().includes(query) ||
      po.project.toLowerCase().includes(query) ||
      po.estimateRef.toLowerCase().includes(query)
    );
    setPurchaseOrders(filtered);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);

    const sorted = [...purchaseOrders].sort((a, b) => {
      if (field === 'amount') {
        return isAsc ? b[field] - a[field] : a[field] - b[field];
      }
      return isAsc
        ? b[field].localeCompare(a[field])
        : a[field].localeCompare(b[field]);
    });
    setPurchaseOrders(sorted);
  };

  const pendingPOs = purchaseOrders.filter(po => po.status === 'Pending').length;

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);

  const handleConvertToInvoice = (po) => {
    setSelectedPO(po);
    setShowInvoiceModal(true);
  };

  const calculateTax = (amount) => amount * 0.10;
  const calculateTotal = (amount) => amount + calculateTax(amount);

  // PO Add Form 
  const [showAddPOModal, setShowAddPOModal] = useState(false);
  const [poNumber, setPONumber] = useState('');
  const [poDate, setPODate] = useState('');
  const [poAmount, setPOAmount] = useState('');
  const [poDocument, setPODocument] = useState(null);

  const handleFileUpload = (e) => {
    setPODocument(e.target.files[0]);
  };

  const handleSavePO = () => {
    console.log('PO Number:', poNumber);
    console.log('PO Date:', poDate);
    console.log('PO Amount:', poAmount);
    console.log('PO Document:', poDocument);
    setShowAddPOModal(false);
  };


  // const [purchaseOrders, setPurchaseOrders] = useState(
  //   initialPurchaseOrders.map(po => ({ ...po, invoiceStatus: 'Active' }))
  // );
  const updateInvoiceStatus = (index, newStatus) => {
    const updatedPOs = [...purchaseOrders];
    updatedPOs[index].invoiceStatus = newStatus;
    setPurchaseOrders(updatedPOs);
  };
    
  return (
    <div className="p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
        <h2 className="fw-semibold mb-3">Cost Estimates</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="filters d-flex flex-wrap gap-1 mb-4">
          <div className="search-container flex-grow-1">
            <Form.Control
              type="search"
              placeholder="Search by Job #, Brand Name, Sub Brand, Flavour, Pack Type, Pack Size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle variant="light" id="designer-dropdown" className="custom-dropdown">
             Sort by Client
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Sort by Client</Dropdown.Item>
              <Dropdown.Item>John Smith</Dropdown.Item>
              <Dropdown.Item>Sarah Johnson</Dropdown.Item>
              <Dropdown.Item>Unassigned</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle variant="light" id="priority-dropdown" className="custom-dropdown">
              All Priorities
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>All Priorities</Dropdown.Item>
              <Dropdown.Item>High</Dropdown.Item>
              <Dropdown.Item>Medium</Dropdown.Item>
              <Dropdown.Item>Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle variant="light" id="status-dropdown" className="custom-dropdown">
              Active Invoiced Cancelled 
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>All Status</Dropdown.Item>
              <Dropdown.Item>In Progress</Dropdown.Item>
              <Dropdown.Item>Review</Dropdown.Item>
              <Dropdown.Item>Not Started</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to={"/AddCostEstimates"}>
          <button id='btn-All' className="btn btn-dark">
            <BsPlusLg className="me-2" /> New Estimate
          </button>
        </Link>
        </div>
      </div>

      <Table hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('client')} style={{ cursor: 'pointer' }}>Estimate</th>
            <th onClick={() => handleSort('project')} style={{ cursor: 'pointer' }}>Client</th>
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount</th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>PO Status</th>
            <th onClick={() => handleSort('receivedDate')} style={{ cursor: 'pointer' }}>Date</th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po, index) => (
            <tr key={po.poNumber}>
              <td>{po.estimateRef}</td>
              <td>{po.client}</td>
              <td>${po.amount.toFixed(2)}</td>
              <td><Badge bg={getStatusBadgeVariant(po.status)}>{po.status}</Badge></td>
              <td>{po.receivedDate}</td>
              <td>
  <Dropdown>
    <Dropdown.Toggle variant="success" size="sm" id={`status-dropdown-${index}`}>
      {po.invoiceStatus || 'Select Status'}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => updateInvoiceStatus(index, 'Active')}>Active</Dropdown.Item>
      <Dropdown.Item onClick={() => updateInvoiceStatus(index, 'Invoiced')}>Invoiced</Dropdown.Item>
      <Dropdown.Item onClick={() => updateInvoiceStatus(index, 'Cancelled')}>Cancelled</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</td>

              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button>
                  <button className="btn btn-sm btn-success" onClick={() => setShowAddPOModal(true)}>AddPO</button>
                  <button className="btn btn-sm btn-outline-primary"><BsPencil /></button>
                  <button className="btn btn-sm btn-outline-danger"><BsTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ul className="pagination mb-0">
        <li className="page-item">
          <button className="page-link">Previous</button>
        </li>
        <li className="page-item active">
          <button className="page-link">1</button>
        </li>
        <li className="page-item">
          <button className="page-link">Next</button>
        </li>
      </ul>

      {/* Modal for converting to invoice */}
      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Convert Estimate to Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Invoice Number</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedPO ? `INV-${selectedPO.estimateRef.split('-')[1]}` : ''}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Invoice Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedPO?.client}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" defaultValue="Web Design Services" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" defaultValue="1" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate</Form.Label>
              <Form.Control type="number" defaultValue={selectedPO?.amount} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" value={`$${selectedPO?.amount.toFixed(2)}`} disabled />
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <strong>Subtotal:</strong>
                <span> ${selectedPO?.amount.toFixed(2)}</span>
              </div>
              <div>
                <strong>Tax (10%):</strong>
                <span> ${calculateTax(selectedPO?.amount).toFixed(2)}</span>
              </div>
              <div>
                <strong>Total:</strong>
                <span> ${calculateTotal(selectedPO?.amount).toFixed(2)}</span>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Create Invoice</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Add Purchase Order */}
      <Modal show={showAddPOModal} onHide={() => setShowAddPOModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Purchase Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>PO Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter PO number"
                value={poNumber}
                onChange={(e) => setPONumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PO Date</Form.Label>
              <Form.Control
                type="date"
                value={poDate}
                onChange={(e) => setPODate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PO Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter PO amount"
                value={poAmount}
                onChange={(e) => setPOAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload PO Document</Form.Label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <div className="upload-info">
                  <BsUpload className="me-2" /> Upload a file (PDF, DOC up to 10MB)
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavePO}>
            Save PO
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CostEstimates;