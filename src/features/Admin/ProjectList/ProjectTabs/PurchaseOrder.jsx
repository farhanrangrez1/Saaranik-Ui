import React, { useEffect, useState } from "react";
import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
import { BsPlusLg, BsPencil, BsTrash, BsUpload, BsClipboard } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FaRegCopy  } from "react-icons/fa";
import { fetchProject } from "../../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../../redux/slices/ClientSlice";
import { deleteCostEstimate, fetchCostEstimates } from "../../../../redux/slices/costEstimatesSlice";
import { createReceivablePurchase, fetchReceivablePurchases } from "../../../../redux/slices/receivablePurchaseSlice";

function PurchaseOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // State declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedPOStatus, setSelectedPOStatus] = useState("All PO Status");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [showAddPOModal, setShowAddPOModal] = useState(false);

  // PO Form states
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [costEstimatesId, setCostEstimatesId] = useState("");

  const [poDate, setPODate] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [poDocument, setPODocument] = useState(null);

  const { project } = useSelector((state) => state.projects);
  const { Clients } = useSelector((state) => state.client);
  const statuses = ["Pending", "Received", "Cancelled", "Completed", "open", "invoiced"];

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


  const handleSavePO = async () => {
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
    formData.append('CostEstimatesId', JSON.stringify([costEstimatesId]));

    if (poDocument) {
      formData.append('image', poDocument);
    }

    try {
      const result = await dispatch(createReceivablePurchase(formData));

      // Agar API success ho jaye tab fetch karo
      if (createReceivablePurchase.fulfilled.match(result)) {
        Swal.fire({
          icon: 'success',
          title: 'PO Created',
          text: 'Purchase order created successfully'
        });

        // Reset fields
        setSelectedProjectId("");
        setSelectedClientId("");
        setCostEstimatesId("");
        setPODate("");
        setStatus("");
        setAmount("");
        setPODocument(null);
        setShowAddPOModal(false);

        // ✅ Now fetch updated list
        dispatch(fetchReceivablePurchases());
        navigate("/admin/receivable");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Creation Failed',
          text: 'Failed to create purchase order.'
        });
      }
    } catch (err) {
      console.error("Error creating PO:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while creating purchase order.'
      });
    }
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
    navigate(`/admin/AddCostEstimates`, {
      state: {
        po,
        isDuplicate: true
      }
    });
  }
  const UpdateEstimate = (po) => {
    navigate(`/admin/AddCostEstimates`, {
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

  // Add filtering logic before pagination
  const filteredEstimates = estimates?.costEstimates
    ?.slice()
    .reverse()
    .filter((estimate) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = !searchQuery ||
        (estimate.estimateRef?.toLowerCase().includes(searchLower) ||
          estimate.clientId[0]?.clientName?.toLowerCase().includes(searchLower) ||
          estimate.projectId?.some(project =>
            project.projectName?.toLowerCase().includes(searchLower) ||
            project.name?.toLowerCase().includes(searchLower)
          ) ||
          estimate.Status?.toLowerCase().includes(searchLower) ||
          estimate.POStatus?.toLowerCase().includes(searchLower));

      const matchesClient = selectedClient === "All Clients" ||
        estimate.clientId[0]?.clientName === selectedClient;

      const matchesPOStatus = selectedPOStatus === "All PO Status" ||
        estimate.POStatus === selectedPOStatus;

      const matchesStatus = selectedStatus === "All Status" ||
        estimate.Status === selectedStatus;

      const matchesDate = !selectedDate ||
        new Date(estimate.estimateDate).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();

      return matchesSearch && matchesClient && matchesPOStatus && matchesStatus && matchesDate;
    });

  // Update pagination to use filtered data
  const totalItems = filteredEstimates?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedEstimates = filteredEstimates
    ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  // ... handleDownloadPDF ...
  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.width;

    // Define an array with the data for the estimate
    const estimateData = [
      {
        companyLogo: 'COMPANY LOGO',
        companyAddress: 'COMPANY ADDRESS DETAILS',
        costEstimateNo: '0000',
        date: '14.04.2025',
        reqRef: '--',
        clientName: 'Client Name',
        clientCompany: 'Client Company Name',
        clientAddress1: 'Address Line 1',
        clientAddress2: 'Address Line 2',
        clientPhone: '1234567890',
        vatRate: 18,
        items: [
          {
            itemNo: 1,
            description: 'Daawat Rice Packaging',
            qty: 1,
            unitPrice: 1545,
          }
        ],
        companyName: 'Your Company Name'
      }
    ];

    const data = estimateData[0];  // Accessing the first object in the array

    // Calculate totals
    const subTotal = data.items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    const vat = (subTotal * data.vatRate) / 100;
    const total = subTotal + vat;

    // Header Section - Company Logo (Left) and Estimate Info (Right)
    doc.setFillColor(229, 62, 62); // Red color (#e53e3e)
    doc.rect(40, 40, 200, 50, 'F');

    // Company Logo and Address - WHITE TEXT for red background
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(data.companyLogo, 50, 60);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(data.companyAddress, 50, 75);

    // Reset text color to black for the rest of the document
    doc.setTextColor(0, 0, 0);

    // Estimate Details (Right aligned)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Cost Estimate No. ${data.costEstimateNo}`, 350, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${data.date}`, 350, 65);
    doc.text(`Req. Ref.: ${data.reqRef}`, 350, 80);

    // Client Information
    let currentY = 120;
    doc.setFontSize(10);
    doc.text('To,', 40, currentY);
    currentY += 15;
    doc.text(data.clientName, 40, currentY);
    currentY += 12;
    doc.text(data.clientCompany, 40, currentY);
    currentY += 12;
    doc.text(data.clientAddress1, 40, currentY);
    currentY += 12;
    doc.text(data.clientAddress2, 40, currentY);
    currentY += 12;
    doc.text(data.clientPhone, 40, currentY);
    currentY += 25;

    // Prepare table data with proper spacing (WITHOUT TOTALS)
    const tableData = data.items.map(item => [
      item.itemNo.toString(),
      item.description,
      item.qty.toString(),
      item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      (item.qty * item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    ]);

    // Add many empty rows for spacing like in the reference PDF
    for (let i = 0; i < 15; i++) {
      tableData.push(['', '', '', '', '']);
    }

    // Create the table WITHOUT totals
    let finalY;
    autoTable(doc, {
      startY: currentY,
      head: [['ITEM #', 'Brand & Design / Description ', 'QTY', 'Unit Price (INR)', 'Amount (INR)']],
      body: tableData,
      styles: {
        fontSize: 9,
        cellPadding: 4,
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
        halign: 'center'
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 9
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 50 },
        1: { halign: 'left', cellWidth: 250 },
        2: { halign: 'center', cellWidth: 40 },
        3: { halign: 'right', cellWidth: 80 },
        4: { halign: 'right', cellWidth: 90 }
      },
      theme: 'grid',
      didDrawPage: function (data) {
        finalY = data.cursor.y;
      }
    });

    // === TOTALS SECTION ===
    let totalsY = finalY + 20;
    const totalsBoxWidth = 120;
    const totalsBoxX = pageWidth - totalsBoxWidth - 40;

    // Totals Box (right side)
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(totalsBoxX, totalsY, totalsBoxWidth, 45);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Sub-Total
    doc.text('Sub-Total', totalsBoxX + 5, totalsY + 12);
    doc.text(subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }), totalsBoxX + totalsBoxWidth - 5, totalsY + 12, { align: 'right' });

    // VAT
    doc.text(`VAT (${data.vatRate}%)`, totalsBoxX + 5, totalsY + 25);
    doc.text(vat.toLocaleString('en-IN', { minimumFractionDigits: 2 }), totalsBoxX + totalsBoxWidth - 5, totalsY + 25, { align: 'right' });

    // Total (Bold)
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL', totalsBoxX + 5, totalsY + 38);
    doc.text(total.toLocaleString('en-IN', { minimumFractionDigits: 2 }), totalsBoxX + totalsBoxWidth - 5, totalsY + 38, { align: 'right' });

    // === AMOUNT IN WORDS SECTION (left side) ===
    const totalInteger = Math.floor(total);
    const totalDecimal = Math.round((total - totalInteger) * 100);
    // let amountInWords = `Rupees ${numberToWords(totalInteger)}`;
    if (totalDecimal > 0) {
      // amountInWords += ` and ${numberToWords(totalDecimal)} Paise`;
    }
    // amountInWords += ' only';

    doc.setFontSize(10);
    doc.setTextColor(0, 153, 204); // Blue tone
    doc.setFont('helvetica', 'normal');
    // doc.text(amountInWords, 40, totalsY + 15);

    // === FOOTER SECTION (Two-column layout) ===
    // === FOOTER TEXT ===
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');

    // Bullet 1
    doc.text('• Cost based on One-off prices.', 40, totalsY + 60);
    // Bullet 2
    doc.text('• The above prices valid for 2 weeks and thereafter subject to our reconfirmation.', 40, totalsY + 72);

    // FOR COMPANY NAME (bold line)
    const footerY = totalsY + 95;
    doc.setFont('helvetica', 'bold');
    doc.text(`For ${data.companyName}`, 40, footerY);

    // System generated note (moved below)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('(This is system generated document, hence not signed.)', 40, footerY + 12);

    // Save PDF
    doc.save(`Cost_Estimate_${data.costEstimateNo}.pdf`);
  };

  // ... existing code ...

  return (
    <div
      className="p-4 m-2"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
   <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
   <h2 className="fw-semibold mb-3">Cost Estimates</h2>
      <Link to={"/admin/AddCostEstimates"}>
            <button id="btn-All" className=" btn-dark" style={{ border: "none", borderRadius: "10px" }}>
              <BsPlusLg className="me-2" /> New Estimate
            </button>
          </Link>
   </div>
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
          <div className="search-container flex-grow-1">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control"
            />
          </div>
          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="designer-dropdown"
              className="custom-dropdown"
            >
              {selectedClient}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedClient("All Clients")}>All Clients</Dropdown.Item>
              {[...new Set(estimates?.costEstimates?.map(po => po.clientId[0]?.clientName || 'N/A'))]
                .filter(name => name !== 'N/A')
                .map((clientName, index) => (
                  <Dropdown.Item key={index} onClick={() => setSelectedClient(clientName)}>
                    {clientName}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="filter-dropdown">
            <Dropdown.Toggle
              variant="light"
              id="viewall-dropdown"
              className="custom-dropdown"
            >
              {selectedPOStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedPOStatus("All PO Status")}>All PO Status</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("Approved")}>Approved</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("Rejected")}>Rejected</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedPOStatus("pending")}>Pending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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
              <Dropdown.Item onClick={() => setSelectedStatus("Active")}>Active</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Invoice")}>Invoice</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedStatus("Completed")}>Completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

    
        </div>
      </div>

      <div className="table-responsive" style={{ maxHeight: "900px", overflowY: "auto" }}>
        <Table hover className="align-middle sticky-header">
          <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th><input type="checkbox" /></th>
              <th>CENo</th>
              <th style={{ whiteSpace: 'nowrap' }}>Project Name</th>
              <th>Client</th>
              <th>Date</th>
              {/* <th>ProjectNo</th> */}
              <th>Amount</th>
              <th>CotStatus</th>
              {/* <th>POStatus</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                 {paginatedEstimates?.map((po, index) => (
                   <tr style={{ whiteSpace: "nowrap" }} key={po.poNumber}>
                     <td><input type="checkbox" /></td>
                     <td onClick={() => CreatJobs(po.projectId)}>
                       <Link to={"/admin/receivable"} style={{ textDecoration: 'none', border: 'none' }}>
                         {po.estimateRef}
                       </Link>
                     </td>
                     <td>
                       {po.projectId?.map((project) => project.projectName || project.name).join(", ")}
                     </td>
                     <td>{po.clientId[0]?.clientName || 'N/A'}</td>
                     <td>{new Date(po.estimateDate).toLocaleDateString("en-GB").slice(0, 8)}</td>
                     {/* <td>
                       {po.projectId?.map((project, i) => `${String(i + 1).padStart(4, '0')}`).join(", ")}
                     </td> */}
                     <td>
                       {po.lineItems?.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2)}
                     </td>
                     <td>
                       <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                         {po.Status}
                       </span>
                     </td>
                     {/* <td>
                       <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                         {po.Status}
                       </span>
                     </td> */}
                     <td>
                       <div className="d-flex gap-2">
                           {/* <td>
                       <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                         {po.Status}
                       </span>
                     </td> */}
                       <button
                           className="btn btn-sm btn-success"
                           onClick={() => {
                             setCostEstimatesId(po._id); // Store the ID
                             setShowAddPOModal(true);   // Open Modal
                           }}
                         >
                          PO Add
                                 <td>
                       <span className={`badge ${getStatusClass(po.Status)} px-2 py-1`}>
                         {po.Status}
                       </span>
                     </td>
                         </button>
                   
                         <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}><FaRegCopy /></button>
                         {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
                         <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
                         {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id)}>
                               <FaTrash />
                             </button> */}
                         <button
                           className="btn btn-sm btn-outline-primary"
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

export default PurchaseOrder;