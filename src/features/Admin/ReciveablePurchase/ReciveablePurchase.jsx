import React, { useEffect, useState } from "react";
import { Form, Table, Badge, InputGroup, Button, Collapse,Dropdown } from "react-bootstrap";
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchReceivablePurchases } from "../../../redux/slices/receivablePurchaseSlice";

function ReciveablePurchase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  const { purchases, loading, error } = useSelector(
    (state) => state.receivablePurchases
  );

  useEffect(() => {
    dispatch(fetchReceivablePurchases());
  }, [dispatch]);

  const itemsPerPage = 7;
  const allOrders = purchases?.receivablePurchases || [];

  // 🔍 Filtering based on search and status
  const filteredOrders = allOrders.filter((po) => {
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchQuery || 
      (po?.PONumber?.toLowerCase().includes(searchLower) ||
      po?.projectId?.[0]?.projectName?.toLowerCase().includes(searchLower) ||
      po?.ClientId?.[0]?.clientName?.toLowerCase().includes(searchLower) ||
      po?.costEstimates?.[0]?.estimateRef?.toLowerCase().includes(searchLower) ||
      po?.Status?.toLowerCase().includes(searchLower));

    const matchesStatus = selectedStatus === "All Status" || 
      po?.Status?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // ↕️ Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField] || "";
    const bVal = b[sortField] || "";

    if (sortField === "Amount") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }

    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedData = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pendingPOs = filteredOrders.filter(
    (po) => po.Status?.toLowerCase() === "pending"
  ).length;

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "received":
        return "info";
      case "cancelled":
        return "dark";
      case "completed":
        return "success";
      case "open":
        return "primary";
      case "invoiced":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div
      className="p-4 m-2"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
      <h2 className="mb-4">Receivable Purchase Orders</h2>

      {/* Responsive Filter Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        {/* Filters for md and above */}
        <div className="d-none d-md-flex align-items-center gap-3 w-100 w-md-auto">
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
            <Dropdown.Toggle
              variant="light"
              id="status-dropdown"
              className="custom-dropdown"
            >
              {selectedStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>All Status</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Pending")}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Received")}>Received</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Cancelled")}>Cancelled</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Open")}>Open</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Invoiced")}>Invoiced</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* <button className="btn btn-outline-secondary" onClick={() => handleSort(sortField || "poNumber")}>
            <FaSort /> Sort
          </button> */}
            <span className="ms-3 d-flex align-items-center">
              Pending POs:{" "}
              <Badge bg="warning" className="ms-2">
                {pendingPOs}
              </Badge>
            </span>
          </div>
        </div>

        {/* Filter button for small screens */}
        <Button
          variant="outline-secondary"
          className="d-md-none"
          onClick={() => setShowFilters(!showFilters)}
          aria-controls="responsive-filters"
          aria-expanded={showFilters}
        >
          <FaFilter /> Filter
        </Button>

        {/* Filter/Sort/Badge on all screen sizes */}

      </div>

      {/* Collapse filters for small screens */}
      <Collapse in={showFilters} className="d-md-none mb-3" id="responsive-filters">
        <div className="bg-light p-3 rounded shadow-sm">
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search POs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Form.Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
            <option value="Open">Open</option>
            <option value="Invoiced">Invoiced</option>
          </Form.Select>
        </div>
      </Collapse>

      {/* Table wrapped in a responsive wrapper */}
      <div style={{ overflowX: "auto" }}>
        <Table hover responsive>
          <thead>
            <tr>
              <th
                onClick={() => handleSort("poNumber")}
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                PO Number
              </th>
              <th
                onClick={() => handleSort("ClientId")}
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Client
              </th>
              <th
                onClick={() => handleSort("projectId")}
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Project
              </th>
              <th
                onClick={() => handleSort("EstimateRef")}
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Estimate Ref
              </th>
              <th
                onClick={() => handleSort("Status")}
                style={{ cursor: "pointer" }}
              >
                Status
              </th>
              <th
                onClick={() => handleSort("ReceivedDate")}
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Received Date
              </th>
              <th
                onClick={() => handleSort("Amount")}
                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((po, index) => (
              <tr key={index}>
                <td>
                  {po.PONumber}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {po.ClientId?.[0]?.clientName || "—"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {po.projectId?.[0]?.projectName || "—"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to="/admin/CostEstimates"
                    style={{ textDecoration: "none" }}
                  >
                    {po.costEstimates?.[0]?.estimateRef || "—"}
                  </Link>
                </td>

                <td>
                  <Badge bg={getStatusBadgeVariant(po.Status)}>{po.Status}</Badge>
                </td>
                <td>{new Date(po.ReceivedDate).toLocaleDateString()}</td>
                <td>${po.Amount?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div className="text-muted small">
            Showing {paginatedData.length} of {filteredOrders.length} entries
          </div>

          <ul className="pagination pagination-sm mb-0 flex-wrap">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReciveablePurchase;
