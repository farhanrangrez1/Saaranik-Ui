import React, { useState } from 'react';
import { Form, InputGroup, Table, Badge, Dropdown, Pagination, Container, Row, Col,Button,   } from 'react-bootstrap';
import { FiSearch, FiFilter, FiMoreVertical ,  } from 'react-icons/fi';
import {
    BsEye,
    BsPencil,
    BsArrowClockwise,
    BsArchive,
    BsDownload,
    BsTrash,
     
  } from "react-icons/bs";
  
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Job_History() {
  const jobData = [
    {
      id: 'JOB-25799',
      name: 'Monthly Data Aggregation',
      description: 'Aggregates and analyzes data for monthly reporting',
      startTime: 'Today, 08:30 AM',
      duration: '45m 29s',
      status: 'Completed',
      type: 'Scheduled'
    },
    {
      id: 'JOB-25798',
      name: 'Customer Data Sync',
      description: 'Synchronizes customer data between CRM and marketing platform',
      startTime: 'Today, 07:15 AM',
      duration: '3m 45s',
      status: 'Completed',
      type: 'Automated'
    },
    {
      id: 'JOB-25797',
      name: 'Product Catalog Update',
      description: 'Updates product information and pricing across all platforms',
      startTime: 'Today, 06:00 AM',
      duration: '1h 28m',
      status: 'Pending',
      type: 'Manual'
    },
    {
      id: 'JOB-25796',
      name: 'Database Backup',
      description: 'Performs backup of production database',
      startTime: 'Today, 01:00 AM',
      duration: '1h 45m 12s',
      status: 'Completed',
      type: 'Scheduled'
    },
    {
      id: 'JOB-25795',
      name: 'Log File Analysis',
      description: 'Analyzes server logs for error patterns',
      startTime: 'Yesterday, 10:30 PM',
      duration: '2h 11s',
      status: 'Failed',
      type: 'Automated'
    },
    {
      id: 'JOB-25794',
      name: 'User Authentication Audit',
      description: 'Audits all authentication attempts for security review',
      startTime: 'Yesterday, 08:15 PM',
      duration: '30m 33s',
      status: 'Completed',
      type: 'Manual'
    },
    {
      id: 'JOB-25793',
      name: 'Content Delivery Network Cache Refresh',
      description: 'Refreshes CDN cache for better content delivery',
      startTime: 'Yesterday, 03:00 PM',
      duration: '8m 42s',
      status: 'Completed',
      type: 'Scheduled'
    },
    {
      id: 'JOB-25792',
      name: 'Email Campaign Delivery',
      description: 'Sends monthly newsletter to subscribers',
      startTime: 'Yesterday, 10:00 AM',
      duration: '45m 18s',
      status: 'Completed',
      type: 'Scheduled'
    },
    {
      id: 'JOB-25791',
      name: 'Machine Learning Model Training',
      description: 'Trains recommendation model with new user data',
      startTime: 'Yesterday, 08:00 AM',
      duration: '3h 35m 56s',
      status: 'Failed',
      type: 'Scheduled'
    },
    {
      id: 'JOB-25790',
      name: 'System Health Check',
      description: 'Performs comprehensive health check on all services',
      startTime: 'May 24, 11:00 PM',
      duration: '15m 7s',
      status: 'Completed',
      type: 'Automated'
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      Completed: { bg: 'success-subtle', text: 'success' },
      Pending: { bg: 'warning-subtle', text: 'warning' },
      Failed: { bg: 'danger-subtle', text: 'danger' },
      Running: { bg: 'primary-subtle', text: 'primary' }
    };
    const style = statusStyles[status] || { bg: 'secondary-subtle', text: 'secondary' };
    return (
      <Badge 
        className={`bg-${style.bg} text-${style.text} fw-medium px-2 py-1`}
        style={{ fontSize: '0.75rem' }}
      >
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const typeStyles = {
      Scheduled: { bg: 'info-subtle', text: 'info' },
      Automated: { bg: 'primary-subtle', text: 'primary' },
      Manual: { bg: 'secondary-subtle', text: 'secondary' }
    };
    const style = typeStyles[type] || { bg: 'secondary-subtle', text: 'secondary' };
    return (
      <Badge 
        className={`bg-${style.bg} text-${style.text} fw-medium px-2 py-1`}
        style={{ fontSize: '0.75rem' }}
      >
        {type}
      </Badge>
    );
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [itemsPerPage] = useState(10);

  // Filter jobs based on search term, status, and type
  const filteredJobs = jobData.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
    const matchesType = selectedType === 'All' || job.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages.filter((page, index, array) => 
      array.indexOf(page) === index
    );
  };
  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-3 align-items-center">
            <InputGroup style={{ width: '320px' }}>
              <InputGroup.Text className="bg-light border-end-0">
                <FiSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search jobs"
                className="border-start-0 bg-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <div className="d-flex gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
                  {/* <FiCalendar className="text-muted" /> Last {dateRange} days */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setDateRange(7)}>Last 7 days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setDateRange(14)}>Last 14 days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setDateRange(30)}>Last 30 days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setDateRange(90)}>Last 90 days</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
                  <FiFilter className="text-muted" /> {selectedStatus === 'All' ? 'All statuses' : selectedStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={selectedStatus === 'All'} onClick={() => setSelectedStatus('All')}>All statuses</Dropdown.Item>
                  <Dropdown.Item active={selectedStatus === 'Completed'} onClick={() => setSelectedStatus('Completed')}>Completed</Dropdown.Item>
                  <Dropdown.Item active={selectedStatus === 'Pending'} onClick={() => setSelectedStatus('Pending')}>Pending</Dropdown.Item>
                  <Dropdown.Item active={selectedStatus === 'Failed'} onClick={() => setSelectedStatus('Failed')}>Failed</Dropdown.Item>
                  <Dropdown.Item active={selectedStatus === 'Running'} onClick={() => setSelectedStatus('Running')}>Running</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
                  {selectedType === 'All' ? 'All types' : selectedType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={selectedType === 'All'} onClick={() => setSelectedType('All')}>All types</Dropdown.Item>
                  <Dropdown.Item active={selectedType === 'Scheduled'} onClick={() => setSelectedType('Scheduled')}>Scheduled</Dropdown.Item>
                  <Dropdown.Item active={selectedType === 'Automated'} onClick={() => setSelectedType('Automated')}>Automated</Dropdown.Item>
                  <Dropdown.Item active={selectedType === 'Manual'} onClick={() => setSelectedType('Manual')}>Manual</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <Button variant="light" className="d-flex align-items-center gap-2">
            {/* <BsDownload className="text-muted" /> Export */}
          </Button>
        
        <div className="d-flex gap-3">
          <Dropdown> 
            <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
              {/* <FiCalendar /> Last {dateRange} days */}
            </Dropdown.Toggle>  
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDateRange(7)}>Last 7 days</Dropdown.Item>
              <Dropdown.Item onClick={() => setDateRange(14)}>Last 14 days</Dropdown.Item>
              <Dropdown.Item onClick={() => setDateRange(30)}>Last 30 days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
             <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
               <FiFilter /> {selectedStatus}
             </Dropdown.Toggle>
             <Dropdown.Menu>
               <Dropdown.Item onClick={() => setSelectedStatus('All')}>All</Dropdown.Item>
               <Dropdown.Item onClick={() => setSelectedStatus('Completed')}>Completed</Dropdown.Item>
               <Dropdown.Item onClick={() => setSelectedStatus('Pending')}>Pending</Dropdown.Item>
               <Dropdown.Item onClick={() => setSelectedStatus('Failed')}>Failed</Dropdown.Item>
             </Dropdown.Menu>
           </Dropdown>

           <Dropdown>
             <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2">
               {selectedType}
             </Dropdown.Toggle>
             <Dropdown.Menu>
               <Dropdown.Item onClick={() => setSelectedType('All')}>All</Dropdown.Item>
               <Dropdown.Item onClick={() => setSelectedType('Scheduled')}>Scheduled</Dropdown.Item>
               <Dropdown.Item onClick={() => setSelectedType('Automated')}>Automated</Dropdown.Item>
               <Dropdown.Item onClick={() => setSelectedType('Manual')}>Manual</Dropdown.Item>
             </Dropdown.Menu>
           </Dropdown>
        </div>
      </div>

      <Table hover className="align-middle shadow-sm bg-white rounded job-table">
        <thead className="bg-light border-bottom">
          <tr>
            <th className="ps-4 py-3" style={{ width: '40px' }}>
              <Form.Check type="checkbox" />
            </th>
            <th style={{ width: '120px' }}>Job ID</th>
            <th>Job Name</th>
            <th  style={{ whiteSpace: 'nowrap' }}>Start Time</th>
            <th style={{ width: '120px' }}>Duration</th>
            <th style={{ width: '120px' }}>Status</th>
            <th style={{ width: '120px' }}>Type</th>
            <th className="text-end pe-4" style={{ width: '80px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((job) => (
            <tr key={job.id}>
              <td className="ps-4">
                <Form.Check type="checkbox" />
              </td>
              <td>
                <span 
                
                  className="text-primary" 
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={() => handleJobClick(job)}
                >
                  {job.id}
                </span>
              </td>
              <td>
                <div  style={{ whiteSpace: 'nowrap' }} className="fw-medium">{job.name}</div>
                <div  style={{ whiteSpace: 'nowrap' }} className="text-muted small">{job.description}</div>
              </td>
              <td  style={{ whiteSpace: 'nowrap' }} className="text-muted">{job.startTime}</td>
              <td  style={{ whiteSpace: 'nowrap' }} className="text-muted">{job.duration}</td>
              <td>{getStatusBadge(job.status)}</td>
              <td>{getTypeBadge(job.type)}</td>
              <td className="text-end pe-4">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" size="sm" className="btn-icon">
                    <FiMoreVertical className="text-muted" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-sm border-0">
                    <Dropdown.Item>
                      <BsEye className="me-2" /> View details
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <BsPencil className="me-2" /> Edit
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <BsArrowClockwise className="me-2" /> Rerun
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <BsArchive className="me-2" /> Archive
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <BsDownload className="me-2" /> Export logs
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger">
                      <BsTrash className="me-2" /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

         <Row className="mt-4 align-items-center">
            <Col>
              <div className="text-muted small">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} results
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <Pagination className="mb-0 gap-1">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="rounded"
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded"
                />
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <Pagination.Ellipsis key={`ellipsis-${index}`} className="rounded" />
                  ) : (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                      className={`rounded ${page === currentPage ? 'bg-primary' : ''}`}
                    >
                      {page}
                    </Pagination.Item>
                  )
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded"
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="rounded"
                />
              </Pagination>
            </Col>
          </Row>
       </Container>
  );
}

export default Job_History;