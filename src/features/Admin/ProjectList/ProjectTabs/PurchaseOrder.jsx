import React, { useEffect, useState } from "react";
import { Modal, Form, Table, Badge, Dropdown, Button } from "react-bootstrap";
import { BsPlusLg, BsPencil, BsTrash, BsUpload, BsClipboard } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FaRegCopy } from "react-icons/fa";
import { fetchProject } from "../../../../redux/slices/ProjectsSlice";
import { fetchClient } from "../../../../redux/slices/ClientSlice";
import { fetchCostEstimates } from "../../../../redux/slices/costEstimatesSlice";
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
  const [POStatus, setStatus] = useState("");
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
    if (!selectedProjectId || !selectedClientId || !poDate || !POStatus || !amount) {
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
    formData.append('POStatus', POStatus);
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
                  value={POStatus}
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
          estimate.clients?.[0]?.clientName?.toLowerCase().includes(searchLower) ||
          estimate.projects?.some(project =>
            project.projectName?.toLowerCase().includes(searchLower)
          ) ||
          estimate.Status?.toLowerCase().includes(searchLower) ||
          estimate.POStatus?.toLowerCase().includes(searchLower));

      const matchesClient = selectedClient === "All Clients" ||
        estimate.clients?.[0]?.clientName === selectedClient;

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
  const handleDownloadPDF = (invoiceDataFromState) => {
    if (!invoiceDataFromState) {
      console.error("No data provided to handleDownloadPDF");
      Swal.fire("Error", "No data available to generate PDF.", "error");
      return;
    }

    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 40;
    let finalY = margin;

    // --- START: Data from 'invoiceDataFromState' object ---
    const companyDetails = {
      logoText: invoiceDataFromState.companyLogoText || 'COMPANY LOGO',
      addressDetails: invoiceDataFromState.companyAddressDetails || 'COMPANY ADDRESS DETAILS',
      name: invoiceDataFromState.companyNameHeader || 'Company name',
      trn: invoiceDataFromState.companyTRN || '100000000000002',
    };

    const invoiceMeta = {
      date: invoiceDataFromState.date || '22.03.2025',
      invoiceNo: invoiceDataFromState.invoiceNo || '5822',
    };

    const clientDetails = {
      name: invoiceDataFromState.clientName || 'Client Company Name',
      address1: invoiceDataFromState.clientAddress1 || 'Client Address Line 1',
      address2: invoiceDataFromState.clientAddress2 || 'Client Address Line 2, Country',
      tel: invoiceDataFromState.clientTel || '00000000000',
      contactPerson: invoiceDataFromState.clientContactPerson || 'Client Contact Person',
      email: invoiceDataFromState.clientEmail || 'client.email@example.com',
      trn: invoiceDataFromState.clientTRN || "Client's TRN No.",
    };

    const projectInfo = {
      costEstNo: invoiceDataFromState.costEstNo || 'CE No.',
      poNo: invoiceDataFromState.purchaseOrderNo || 'PO Number',
      projectNo: invoiceDataFromState.projectNo || 'Project No.',
    };

    const bankDetails = {
      accountName: invoiceDataFromState.bankAccountName || 'Company Name',
      bankName: invoiceDataFromState.bankName || "Company's Bank Name",
      iban: invoiceDataFromState.iban || 'XX000000000000000000001',
      swiftCode: invoiceDataFromState.swiftCode || 'XXXAAACC',
      terms: invoiceDataFromState.paymentTerms || 'Net 30',
    };

    const items = invoiceDataFromState.items && invoiceDataFromState.items.length > 0
      ? invoiceDataFromState.items.map((item, index) => [
        (index + 1).toString() + '.',
        item.description,
        item.qty,
        item.rate,
        parseFloat(item.amount).toFixed(2)
      ])
      : [
        ['1.', 'Print Samples', 6, 2, '12.00'], // Default item
      ];

    const subTotal = items.reduce((sum, item) => sum + parseFloat(item[4]), 0);
    const vatRate = invoiceDataFromState.vatRate !== undefined ? invoiceDataFromState.vatRate : 0.10; // 10% VAT from image, or from state
    const vatAmount = subTotal * vatRate;
    const grandTotal = subTotal + vatAmount;
    const amountInWords = invoiceDataFromState.amountInWords || `US Dollars ${numberToWords(grandTotal)} Only`;
    // --- END: Data from 'invoiceDataFromState' object ---

    // 1. Company Logo Block (Top Left) - Assuming this part is okay from previous version
    doc.setFillColor(192, 0, 0);
    doc.rect(margin, finalY, 220, 60, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(companyDetails.logoText, margin + 10, finalY + 25);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(companyDetails.addressDetails, margin + 10, finalY + 45);

    // 2. Company Name (Top Right) - Assuming this part is okay
    const companyNameBlockY = finalY;
    doc.setFillColor(192, 0, 0);
    doc.rect(pageWidth - margin - 150, companyNameBlockY, 150, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(companyDetails.name, pageWidth - margin - 140, companyNameBlockY + 20, { align: 'left' });

    // 3. Tax Invoice Title - Assuming this part is okay
    let titleY = companyNameBlockY + 30 + 20;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Tax Invoice', pageWidth - margin, titleY, { align: 'right' });

    // 4. TRN, Date, Invoice No. Table - Assuming this part is okay
    let tableDetailsY = titleY + 10;
    autoTable(doc, {
      startY: tableDetailsY,
      head: [['TRN:', 'Date', 'Invoice No.']],
      body: [[companyDetails.trn, invoiceMeta.date, invoiceMeta.invoiceNo]],
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.5, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 150, halign: 'left' },
        1: { cellWidth: 80, halign: 'left' },
        2: { cellWidth: 80, halign: 'left' },
      },
      margin: { right: margin, left: pageWidth - margin - (150 + 80 + 80) - 10 },
      tableWidth: 'wrap',
    });
    finalY = doc.lastAutoTable.finalY + 20;

    // 5. Invoice To Section - Assuming this part is okay
    const invoiceToBoxWidth = 250;
    doc.setDrawColor(0, 0, 0);
    doc.rect(margin, finalY, invoiceToBoxWidth, 100, 'S');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice To', margin + 5, finalY + 15);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    let textYInvoiceTo = finalY + 30;
    [clientDetails.name, clientDetails.address1, clientDetails.address2, `Tel: ${clientDetails.tel}`, `Contact: ${clientDetails.contactPerson}`, `Email: ${clientDetails.email}`].forEach(line => {
      doc.text(line, margin + 5, textYInvoiceTo);
      textYInvoiceTo += 12;
    });
    finalY += 100 + 10;
    // 6. TRN, Cost Est. No., P.O. No., Project Table - Assuming this part is okay
    autoTable(doc, {
      startY: finalY,
      head: [['TRN', 'Cost Est. No.', 'P.O. No.', 'Project']],
      body: [[clientDetails.trn, projectInfo.costEstNo, projectInfo.poNo, projectInfo.projectNo]],
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.5, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
      margin: { left: margin, right: margin },
    });
    finalY = doc.lastAutoTable.finalY + 10;

    // 7. Bank Details Table - Assuming this part is okay
    autoTable(doc, {
      startY: finalY,
      head: [['Bank Account Name', 'Bank Name', 'IBAN', 'Swift Code', 'Terms']],
      body: [[bankDetails.accountName, bankDetails.bankName, bankDetails.iban, bankDetails.swiftCode, bankDetails.terms]],
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.5, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
      margin: { left: margin, right: margin },
    });
    finalY = doc.lastAutoTable.finalY + 10;

    // 8. Items Table - Assuming this part is okay
    autoTable(doc, {
      startY: finalY,
      head: [['Sr. #', 'Description', 'Qty', 'Rate', 'Amount (USD)']],
      body: items,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 5, lineWidth: 0.5, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 40, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 40, halign: 'right' },
        3: { cellWidth: 50, halign: 'right' },
        4: { cellWidth: 70, halign: 'right' },
      },
      margin: { left: margin, right: margin },
      didDrawPage: function (data) {
        // Ensure finalY is updated correctly if table spans multiple pages
        finalY = data.cursor.y;
      }
    });
    const amountInWordsY = finalY + 20;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(amountInWords, margin, amountInWordsY, { maxWidth: pageWidth - margin - 220 }); // Ensure it doesn't overlap with totals

    // 10. Totals Section (NEW - Subtotal, VAT, Total - Right Aligned)
    const totalsTableWidth = 200;
    const totalsTableX = pageWidth - margin - totalsTableWidth;
    let totalsTableY = finalY + 10;

    autoTable(doc, {
      startY: totalsTableY,
      body: [
        ['Subtotal', `USD ${subTotal.toFixed(2)}`],
        [`VAT (${(vatRate * 100).toFixed(0)}%)`, `USD ${vatAmount.toFixed(2)}`],
        ['Total', `USD ${grandTotal.toFixed(2)}`]
      ],
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold', cellWidth: totalsTableWidth * 0.6 },
        1: { halign: 'right', cellWidth: totalsTableWidth * 0.4 }
      },
      margin: { left: totalsTableX },
      tableWidth: totalsTableWidth,
      didDrawPage: function (data) {
        totalsTableY = data.cursor.y;
      }
    });

    finalY = Math.max(amountInWordsY + 10, totalsTableY + 10);

    const footerStartY = finalY + 30;
    const stampWidth = 100;
    const stampHeight = 70;
    const stampX = margin + 150;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('For Company Name', margin, footerStartY);
    doc.text('Accounts Department', margin, footerStartY + stampHeight - 10);

    // Placeholder for Stamp Image
    doc.setFillColor(200, 200, 200);
    doc.rect(stampX, footerStartY - 15, stampWidth, stampHeight, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text('Insert Stamp Image', stampX + stampWidth / 2, footerStartY - 15 + stampHeight / 2, { align: 'center' });

    doc.save(`Tax_Invoice_${invoiceMeta.invoiceNo}.pdf`);
  };
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    if (num === 0) return 'Zero';
    let words = '';
    if (num >= 1000000000) { words += numberToWords(Math.floor(num / 1000000000)) + ' Billion '; num %= 1000000000; }
    if (num >= 1000000) { words += numberToWords(Math.floor(num / 1000000)) + ' Million '; num %= 1000000; }
    if (num >= 1000) { words += numberToWords(Math.floor(num / 1000)) + ' Thousand '; num %= 1000; }
    if (num >= 100) { words += ones[Math.floor(num / 100)] + ' Hundred '; num %= 100; }
    if (num >= 20) { words += tens[Math.floor(num / 10)] + ' '; num %= 10; }
    if (num > 0) { words += ones[num] + ' '; }
    // Handle cents if your number includes them, e.g., by splitting num.toFixed(2)
    const numStr = parseFloat(num).toFixed(2);
    const parts = numStr.split('.');
    let dollars = parseInt(parts[0]);
    let cents = parseInt(parts[1]);

    words = ''; // Reset words for dollar part only
    if (dollars === 0) words = 'Zero';
    else {
      if (dollars >= 1000000000) { words += numberToWords(Math.floor(dollars / 1000000000)) + ' Billion '; dollars %= 1000000000; }
      if (dollars >= 1000000) { words += numberToWords(Math.floor(dollars / 1000000)) + ' Million '; dollars %= 1000000; }
      if (dollars >= 1000) { words += numberToWords(Math.floor(dollars / 1000)) + ' Thousand '; dollars %= 1000; }
      if (dollars >= 100) { words += ones[Math.floor(dollars / 100)] + ' Hundred '; dollars %= 100; }
      if (dollars >= 20) { words += tens[Math.floor(dollars / 10)] + (dollars % 10 !== 0 ? ' ' : ''); dollars %= 10; }
      if (dollars > 0) { words += ones[dollars] + ' '; }
    }
    words = words.trim();

    if (cents > 0) {
      words += ` and ${cents.toString()}/100`;
    }
    return words.trim();
  };
  // ... existing code ...

  return (
    <div
      className="p-4 m-2"
      style={{ backgroundColor: "white", borderRadius: "10px" }} >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
              {[...new Set(estimates?.costEstimates?.map(po => po.clients?.[0]?.clientName || 'N/A'))]
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
                  {po.projects?.map((project) => project.projectName).join(", ")}
                </td>
                <td>{po.clients?.[0]?.clientName || 'N/A'}</td>
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
  disabled={po.receivablePurchases?.[0]?.POStatus !== "pending"}
  onClick={() => {
    setCostEstimatesId(po._id); // Store the ID
    setShowAddPOModal(true);   // Open Modal
  }}
>
  PO Add
</button>

<span className={`badge ${getStatusClass(po.receivablePurchases?.[0]?.POStatus)} px-2 py-1`}>
  {po.receivablePurchases?.[0]?.POStatus || 'pending'}
</span>


                    <button className="btn btn-sm btn-primary" onClick={() => Duplicate(po)}><FaRegCopy /></button>
                    {/* <button className="btn btn-sm btn-primary" onClick={() => handleConvertToInvoice(po)}>ConvertInvoice</button> */}
                    <button className="btn btn-sm btn-outline-primary" onClick={() => UpdateEstimate(po)}><BsPencil /></button>
                    {/* <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(po._id))}>
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