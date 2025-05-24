import React, { useEffect, useState } from "react";
import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
import { BsPlusLg, BsPencil, BsTrash, BsUpload } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { deleteCostEstimate, fetchCostEstimates } from "../../../redux/slices/costEstimatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { fetchProject } from "../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../redux/slices/ClientSlice";
import { createReceivablePurchase } from "../../../redux/slices/receivablePurchaseSlice";

function CostEstimates() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // State declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showAddPOModal, setShowAddPOModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);

  // PO Form states
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [poDate, setPODate] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [poDocument, setPODocument] = useState(null);

  const { project } = useSelector((state) => state.projects);
  const { Clients } = useSelector((state) => state.client);
  const statuses = ["Pending", "Received", "Cancelled", "Completed"];

  useEffect(() => {
    dispatch(fetchProject());
    dispatch(fetchClient());
    dispatch(fetchCostEstimates());
  }, [dispatch]);

  useEffect(() => {
    if (Clients && project?.data?.length) {
      const foundProject = project.data.find(p => p._id === selectedClientId);
      if (foundProject) {
        setSelectedProjectId(foundProject._id);
      }
    }
  }, [Clients, project, selectedClientId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File too large',
          text: 'Please upload a file smaller than 10MB'
        });
        return;
      }
      setPODocument(file);
    }
  };

  const handleSavePO = () => {
    if (!selectedProjectId || !selectedClientId || !poDate || !status || !amount) {
      Swal.fire({
        icon: 'error',
        title: 'Required Fields Missing',
        text: 'Please fill all required fields'
      });
      return;
    }

    const formData = new FormData();
    formData.append('projectsId', JSON.stringify([selectedProjectId]));
    formData.append('ClientId', selectedClientId);
    formData.append('ReceivedDate', poDate);
    formData.append('Status', status);
    formData.append('Amount', amount);

    if (poDocument) {
      formData.append('image', poDocument);
    }

    dispatch(createReceivablePurchase(formData));

    setSelectedProjectId("");
    setSelectedClientId("");
    setPODate("");
    setStatus("");
    setAmount("");
    setPODocument(null);
    setShowAddPOModal(false);
  };


  // Convert to Invoice handler
  const handleConvertToInvoice = (po) => {
    setSelectedPO(po);
    setShowInvoiceModal(true);
  };



  // Add PO Modal
  const renderAddPOModal = () => (
    <Modal show={showAddPOModal} onHide={() => setShowAddPOModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Purchase Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Form.Label className="d-block ">Project</Form.Label>
                <Form.Select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Project --</option>
                  {project?.data?.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.projectName || proj.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="col-md-6">
                <Form.Label className="d-block ">Client</Form.Label>
                <Form.Select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Client --</option>
                  {Clients?.data?.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.clientName}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Form.Group>


          <Form.Group className="mb-3">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Form.Label className="d-block ">PO Date</Form.Label>
                <Form.Control
                  type="date"
                  value={poDate}
                  onChange={(e) => setPODate(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <Form.Label className="d-block ">PO Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Status --</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="row justify-content-center align-items-start">
              {/* PO Amount Field */}
              <div className="col-md-6 mb-3 mb-md-0">
                <Form.Label className="d-block ">PO Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-control"
                  placeholder="Enter amount"
                  required
                />
              </div>

              {/* File Upload Field */}
              <div className="col-md-6">
                <Form.Label className="d-block ">Upload Document</Form.Label>
                <div className="file-upload">
                  <Form.Control
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="form-control"
                  />

                  <small className="text-muted d-flex align-items-center mt-1">
                    <BsUpload className="me-2" /> Upload a file (PDF, DOC up to 10MB)
                  </small>
                </div>
              </div>
            </div>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => setShowAddPOModal(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleSavePO}>Save PO</Button>
      </Modal.Footer>
    </Modal>
  );



  // //////////
  const { estimates, loading, error } = useSelector((state) => state.costEstimates);
  console.log("Cost Estimates:", estimates.costEstimates);

  useEffect(() => {
    dispatch(fetchCostEstimates());
  }, [dispatch]);


  // ye ok code hai 
  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase().trim()) {
      case "active":
      case "active project":
      case "open":
        return "bg-primary text-white";
      case "inactive":
        return "bg-secondary text-white";
      case "in progress":
      case "pending":
        return "bg-warning text-dark";
      case "completed":
        return "bg-success text-white";
      case "closed":
        return "bg-dark text-white";
      case "cancelled":
        return "bg-danger text-white";
      case "on hold":
      case "review":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      default:
        return "bg-light text-dark";
    }
  };

  const handleDelete = (_id) => {
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
        dispatch(deleteCostEstimate(_id))
          .then(() => {
            Swal.fire("Deleted!", "The document has been deleted.", "success");
            dispatch(fetchCostEstimates());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  }

  const Duplicate = (po) => {
    navigate(`/AddCostEstimates`, {
      state: {
        po,
        isDuplicate: true
      }
    });
  }
  const UpdateEstimate = (po) => {
    navigate(`/AddCostEstimates`, {
      state: {
        po,
      }
    });
  }

  //     const Duplicate =(po)=>{    
  //  navigate(`/duplicate/AddCostEstimates/${po._id}`, { state: { po}});
  //   }


  // PAGINATION SETUP FOR ESTIMATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalItems = estimates?.costEstimates?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedEstimates = estimates?.costEstimates
    ?.slice()
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div
      className="p-4 m-3"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
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
            <Dropdown.Toggle
              variant="light"
              id="designer-dropdown"
              className="custom-dropdown"
            >
              Sort by Client
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Sort by Client</Dropdown.Item>
              <Dropdown.Item>John Smith</Dropdown.Item>
              <Dropdown.Item>Sarah Johnson</Dropdown.Item>
              <Dropdown.Item>Unassigned</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <Dropdown className="filter-dropdown">
            <Dropdown.Toggle variant="light" id="priority-dropdown" className="custom-dropdown">
              All Priorities
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>All Priorities</Dropdown.Item>
              <Dropdown.Item>High</Dropdown.Item>
              <Dropdown.Item>Medium</Dropdown.Item>
              <Dropdown.Item>Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="viewall-dropdown"
              className="custom-dropdown"
            >
              View All
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Invoiced</Dropdown.Item>
              <Dropdown.Item>Cancelled</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="status-dropdown"
              className="custom-dropdown"
            >
              All Status
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Invoice</Dropdown.Item>
              <Dropdown.Item>Cancelled</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to={"/AddCostEstimates"}>
            <button id="btn-All" className=" btn-dark" style={{ border: "none", borderRadius: "10px" }}>
              <BsPlusLg className="me-2" /> New Estimate
            </button>
          </Link>
        </div>
      </div>

      <div className="table-responsive" style={{ maxHeight: "900px", overflowY: "auto" }}>
        <Table hover className="align-middle sticky-header">
          <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th><input type="checkbox" /></th>
              <th>CENo</th>
              <th>Date</th>
              <th>Client</th>
              <th>ProjectNo</th>
              <th>ProjectName</th>
              <th>Amount</th>
              <th>POStatus</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEstimates?.map((po, index) => (

              <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
                <td><input type="checkbox" /></td>
                <td onClick={() => CreatJobs(po.projectId)}>
                  <Link style={{ textDecoration: 'none', border: 'none', color: 'inherit' }}>
                    CE-{String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0')}
                  </Link>
                </td>
                <td>{new Date(po.estimateDate).toLocaleDateString("en-GB").slice(0, 8)}</td>
                <td>
                  {
                    Array.isArray(po.clientId)
                      ? po.clientId.map((client, i) => `${String(i + 1).padStart(4, '0')} (${client._id})`).join(", ")
                      : po.clientId
                        ? `${String(1).padStart(4, '0')} `
                        : "N/A"
                  }
                </td>
                <td>
                  {po.projectId?.map((project, i) => `${String(i + 1).padStart(4, '0')}`).join(", ")}
                </td>
                <td>
                  {po.projectId?.map((project) => project.projectName || project.name).join(", ")}
                </td>
                <td>
                  {po.lineItems?.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2)}
                </td>
                <td>
                  <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                    {po.POStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                    {po.Status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}>Duplicate</button>
                    <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button>
                    <button className="btn btn-sm btn-success" onClick={() => setShowAddPOModal(true)}>
                      AddPO
                    </button>                    <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
                    {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id)}>
                          <FaTrash />
                        </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for converting to invoice */}
      <Modal
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Convert Estimate to Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Invoice Number</Form.Label>
              {/* <Form.Control
                type="text"
                defaultValue={
                  selectedPO
                    ? `INV-${selectedPO.estimateRef.split("-")[1]}`
                    : ""
                }
                disabled
              /> */}
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
              <Form.Control
                type="text"
                // value={`$${selectedPO?.amount.toFixed(2)}`}
                disabled
              />
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <strong>Subtotal:</strong>
                {/* <span> ${selectedPO?.amount.toFixed(2)}</span> */}
              </div>
              <div>
                <strong>Tax (10%):</strong>
                {/* <span> ${calculateTax(selectedPO?.amount).toFixed(2)}</span> */}
              </div>
              <div>
                <strong>Total:</strong>
                {/* <span> ${calculateTotal(selectedPO?.amount).toFixed(2)}</span> */}
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowInvoiceModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary">Create Invoice</Button>
        </Modal.Footer>
      </Modal>

      {renderAddPOModal()}
      {/* Modal for converting to invoice */}
      {!loading && !error && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted small">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                Previous
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
                Next
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CostEstimates;