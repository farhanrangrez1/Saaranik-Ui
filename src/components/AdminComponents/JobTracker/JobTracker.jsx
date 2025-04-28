import React, { useState } from 'react';
import { Button, Form, Table, Dropdown } from 'react-bootstrap';
import { FaFilePdf, FaUpload, FaLink, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function JobTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesigner, setSelectedDesigner] = useState('Project Name');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedJobs, setSelectedJobs] = useState({});

  const jobData = [
    {
      jobNumber: '00001',
      brandName: 'Brand 1',
      subBrand: 'SubBrand1',
      flavour: 'Flavour1',
      packType: 'Type 1',
      packSize: 'Size 1ml',
      packCode: 'Code1',
      priority: 'High',
      status: 'In Progress',
      timeLogged: '12h 30m'
    },
    {
      jobNumber: '00002',
      brandName: 'Brand 2',
      subBrand: 'SubBrand2',
      flavour: 'Flavour2',
      packType: 'Type 2',
      packSize: 'Size 2ml',
      packCode: 'Code2',
      priority: 'Medium',
      status: 'Review',
      timeLogged: '8h 45m'
    },
    {
      jobNumber: '00003',
      brandName: 'Brand 3',
      subBrand: 'SubBrand3',
      flavour: 'Flavour3',
      packType: 'Type 3',
      packSize: 'Size 3ml',
      packCode: 'Code3',
      priority: 'Low',
      status: 'Not Started',
      timeLogged: '0h 0m'
    }
  ];

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'bg-warning text-dark';
      case 'review': return 'bg-info text-dark';
      case 'not started': return 'bg-secondary text-white';
      default: return 'bg-light';
    }
  };

  const handleCheckboxChange = (jobNumber) => {
    setSelectedJobs(prevSelectedJobs => ({
      ...prevSelectedJobs,
      [jobNumber]: !prevSelectedJobs[jobNumber]
    }));
  };

  const filteredJobs = jobData.filter(job => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      job.jobNumber.toLowerCase().includes(search) ||
      job.brandName.toLowerCase().includes(search) ||
      job.subBrand.toLowerCase().includes(search) ||
      job.flavour.toLowerCase().includes(search) ||
      job.packType.toLowerCase().includes(search) ||
      job.packSize.toLowerCase().includes(search);

    const matchesDesigner = selectedDesigner === 'Project Name' || job.designer === selectedDesigner;
    const matchesPriority = selectedPriority === 'All Priorities' || job.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'All Status' || job.status === selectedStatus;

    const jobDate = new Date(job.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate = (!from || jobDate >= from) && (!to || jobDate <= to);

    return matchesSearch && matchesDesigner && matchesPriority && matchesStatus && matchesDate;
  });

  return (
    <div className="p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="job-title mb-0">Job Tracker</h2>
      </div>

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
            {selectedDesigner}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedDesigner('Project Name')}>Project Name</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDesigner('John Smith')}>John Smith</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDesigner('Sarah Johnson')}>Sarah Johnson</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDesigner('Unassigned')}>Unassigned</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="filter-dropdown">
          <Dropdown.Toggle variant="light" id="priority-dropdown" className="custom-dropdown">
            {selectedPriority}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedPriority('All Priorities')}>All Priorities</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority('High')}>High</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority('Medium')}>Medium</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority('Low')}>Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="filter-dropdown">
          <Dropdown.Toggle variant="light" id="status-dropdown" className="custom-dropdown">
            {selectedStatus}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedStatus('All Status')}>All Status</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStatus('In Progress')}>In Progress</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStatus('Review')}>Review</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStatus('Not Started')}>Not Started</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="filter-dropdown">
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="filter-date"
          />
        </Dropdown>
        <Link to={"/AddJobTracker"}>
          <button className="btn btn-primary">
            <i className="bi bi-plus"></i> Add New Job
          </button>
        </Link>
      </div>

      <div className="table-responsive custom-table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Table hover className="align-middle custom-table sticky-header">
          <thead className="bg-light">
            <tr>
              <th><input type="checkbox" /></th>
              <th style={{ whiteSpace: "nowrap" }}>Job No</th>
              <th>ProjectName</th>
              <th>Brand</th>
              <th>SubBrand</th>
              <th>Flavour</th>
              <th>PackType</th>
              <th>PackSize</th>
              {/* <th>PackCode</th> */}
              <th>Priority</th>
              <th>Status</th>
              <th>TimeLogged</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJobs[job.jobNumber] || false}
                    onChange={() => handleCheckboxChange(job.jobNumber)}
                  />
                </td>
                <td><Link to={"/OvervieJobsTracker"}>{job.jobNumber}</Link></td>
                <th>name</th>
                <td>{job.brandName}</td>
                <td>{job.subBrand}</td>
                <td>{job.flavour}</td>
                <td>{job.packType}</td>
                <td>{job.packSize}</td>
                {/* <td>{job.packCode}</td> */}
                <td><span className={getPriorityClass(job.priority)}>{job.priority}</span></td>
                <td><span className={`badge ${getStatusClass(job.status)} px-2 py-1`}>{job.status}</span></td>
                <td>{job.timeLogged}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm"><FaFilePdf style={{ color: '#007bff' }} /></Button>
                    <Button variant="outline-secondary" size="sm"><FaUpload style={{ color: '#28a745' }} /></Button>
                    <Button variant="outline-secondary" size="sm"><FaLink style={{ color: '#b266ff' }} /></Button>
                    <Button variant="outline-secondary" size="sm"><FaClock style={{ color: '#5a5eff' }} /></Button>
                    <Button variant="outline-secondary" size="sm"><Link to={"/updateJobTracker"}><FaEdit style={{ color: '#000' }} /></Link></Button>
                    <Button variant="outline-secondary" size="sm"><FaTrash style={{ color: '#dc3545' }} /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default JobTracker;
