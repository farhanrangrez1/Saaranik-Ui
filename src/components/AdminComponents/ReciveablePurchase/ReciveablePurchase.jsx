import React, { useState } from 'react'
import { Form, Table, Badge, InputGroup } from 'react-bootstrap'
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function ReciveablePurchase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const initialPurchaseOrders = [
    {
      poNumber: 'PO-2024-001',
      client: 'Acme Corp',
      project: 'Package Redesign',
      estimateRef: 'EST-2024-001',
      status: 'Open',
      receivedDate: '2024-01-15',
      amount: 3000.00
    },
    {
      poNumber: 'PO-2024-002',
      client: 'TechStart Inc',
      project: 'Brand Identity',
      estimateRef: 'EST-2024-002',
      status: 'Open',
      receivedDate: '2024-01-14',
      amount: 3500.00
    },
    {
      poNumber: 'PO-2024-003',
      client: 'Global Foods',
      project: 'Label Design',
      estimateRef: 'EST-2024-003',
      status: 'Invoiced',
      receivedDate: '2024-01-13',
      amount: 2800.00
    }
  ]

  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders)

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'success'
      case 'Invoiced': return ' '
      case 'Invoiced': return 'danger'
      default: return 'secondary'
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    
    const filtered = initialPurchaseOrders.filter(po =>
      po.poNumber.toLowerCase().includes(query) ||
      po.client.toLowerCase().includes(query) ||
      po.project.toLowerCase().includes(query) ||
      po.estimateRef.toLowerCase().includes(query)
    )
    setPurchaseOrders(filtered)
  }

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortDirection(isAsc ? 'desc' : 'asc')
    setSortField(field)

    const sorted = [...purchaseOrders].sort((a, b) => {
      if (field === 'amount') {
        return isAsc ? b[field] - a[field] : a[field] - b[field]
      }
      return isAsc
        ? b[field].localeCompare(a[field])
        : a[field].localeCompare(b[field])
    })
    setPurchaseOrders(sorted)
  }

  const pendingPOs = purchaseOrders.filter(po => po.status === 'Pending').length

  return (
    <div className=" p-4 m-3" style={{backgroundColor:"white",borderRadius:"10px",}}>
      <h2 className="mb-4">Receivable Purchase Orders</h2>
      
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  {/* Search Bar */}
  <InputGroup className="w-50">
    <InputGroup.Text>
      <FaSearch />
    </InputGroup.Text>
    <Form.Control
      placeholder="Search POs..."
      value={searchQuery}
      onChange={handleSearch}
    />
  </InputGroup>

  {/* Status Dropdown */}
  <Form.Select
    className="w-auto"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="">All Status</option>
    <option value="open">Open</option>
    <option value="invoiced">Invoiced</option>
    <option value="client">Client</option>
  </Form.Select>

  {/* Filter/Sort/Badge */}
  <div className="d-flex align-items-center gap-2">
    <button className="btn btn-outline-secondary">
      <FaFilter /> Filter
    </button>
    <button className="btn btn-outline-secondary">
      <FaSort /> Sort
    </button>
    <span className="ms-3 d-flex align-items-center">
      Pending POs: <Badge bg="warning" className="ms-2">{pendingPOs}</Badge>
    </span>
  </div>
</div>

      <Table hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('poNumber')} style={{ cursor: 'pointer' }}>PO Number</th>
            <th onClick={() => handleSort('client')} style={{ cursor: 'pointer' }}>Client</th>
            <th onClick={() => handleSort('project')} style={{ cursor: 'pointer' }}>Project</th>
            <th onClick={() => handleSort('estimateRef')} style={{ cursor: 'pointer' }}>Estimate Ref</th>
          <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status</th>
            <th onClick={() => handleSort('receivedDate')} style={{ cursor: 'pointer' }}>Received Date</th>
            <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po) => (
            <tr key={po.poNumber}>
              <td>{po.poNumber}</td>
              <td>{po.client}</td>
              <td>{po.project}</td>
              <td><Link to={"/CostEstimates"}>{po.estimateRef}</Link></td>
            <td>
                <Badge bg={getStatusBadgeVariant(po.status)}>
                  {po.status}
                </Badge>
              </td> 
              <td>{po.receivedDate}</td>
              <td>${po.amount.toFixed(2)}</td>
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
    </div>
  )
}

export default ReciveablePurchase