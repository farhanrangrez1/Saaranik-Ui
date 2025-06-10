import React, { useEffect, useState } from 'react';
import { Form, Table, Badge, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaSort, FaEdit, FaTrash, FaDownload, FaFilter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'; // Only this import should remain
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

  
  const { invocing, loading, error } = useSelector((state) => state.InvoicingBilling);
  console.log(invocing?.InvoicingBilling);

  useEffect(() => {
    dispatch(fetchInvoicingBilling());
  }, [dispatch]);

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
  };

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
