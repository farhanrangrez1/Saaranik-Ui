import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaTasks, FaProjectDiagram, FaFileInvoiceDollar, FaClipboardCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashbord() {
  // Sample data for the donut chart
  const projectStatusData = {
    labels: ['In Progress', 'Completed', 'Pending', 'Delayed'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444'],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const recentActivities = [
    { type: 'new', title: 'New project created', description: 'Premium Packaging Design - Client XYZ', time: '2 hours ago' },
    { type: 'completed', title: 'Project completed', description: 'Eco-friendly Bag Design - Client ABC', time: '1 day ago' },
    { type: 'po', title: 'New PO received', description: 'Design Update - Client DEF', time: '1 day ago' },
  ];

  return (
    <Container fluid className="container p-3">
 <Row className="g-4 mb-4">
  {/* Projects in Progress */}
  <Col md={4} lg={4}>
    <Link to="/InProgressDashboardProject" className="text-decoration-none w-100 d-block">
      <Card className="h-100 shadow-sm border-0">
        <Card.Body className="d-flex align-items-center">
          <div
            className="rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#e6f4ec", width: "50px", height: "50px" }}
          >
            <FaTasks className="text-success" size={20} />
          </div>
          <div>
            <h3 className="mb-0">36</h3>
            <p className="text-muted mb-0">Projects in Progress</p>
            <small className="text-info">+5 since last week</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>

  {/* Jobs in Progress */}
  <Col md={4} lg={4}>
    <Link to="/InProgressDashboard" className="text-decoration-none w-100 d-block">
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <div className="rounded-circle p-3 bg-light-green me-3">
            <FaProjectDiagram className="text-success" size={24} />
          </div>
          <div>
            <h3 className="mb-0">56</h3>
            <p className="text-muted mb-0">Jobs in Progress</p>
            <small className="text-success">↑ 8% from last month</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>

  {/* Jobs Due Today */}
  <Col md={4} lg={4}>
    <Link to="/InProgressDashboardJobsDueToday" className="text-decoration-none w-100 d-block">
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <div className="rounded-circle p-3 bg-light-yellow me-3">
            <FaFileInvoiceDollar className="text-warning" size={24} />
          </div>
          <div>
            <h3 className="mb-0">18</h3>
            <p className="text-muted mb-0">Jobs Due Today</p>
            <small className="text-warning">Requires attention</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>

  {/* Cost Estimates Awaiting POs */}
  <Col md={4} lg={4}>
    <Link to="/CostEstimates" className="text-decoration-none w-100 d-block">
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <div className="rounded-circle p-3 bg-light-purple me-3">
            <FaClipboardCheck className="text-purple" size={24} />
          </div>
          <div>
            <h3 className="mb-0">892</h3>
            <p className="text-muted mb-0">Cost Estimates</p>
            <small className="text-danger">Waiting to receive POs</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>

  {/* Completed Projects to be Invoiced */}
  <Col md={4} lg={4}>
    <Link to="/Invoicing_Billing" className="text-decoration-none w-100 d-block">
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <div className="rounded-circle p-3 bg-light-red me-3">
            <FaFileInvoiceDollar className="text-danger" size={24} />
          </div>
          <div>
            <h3 className="mb-0">285.4k</h3>
            <p className="text-muted mb-0">Completed Projects</p>
            <small className="text-danger">To be Invoiced</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>

  {/* Timesheet Discrepancies */}
  <Col md={4} lg={4}>
    <Link to="/TimesheetWorklog" className="text-decoration-none w-100 d-block">
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <div className="rounded-circle p-3 bg-light-orange me-3">
            <FaExclamationTriangle className="text-orange" size={24} />
          </div>
          <div>
            <h3 className="mb-0">8</h3>
            <p className="text-muted mb-0">Timesheet Discrepancies</p>
            <small className="text-warning">Action needed</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>
</Row>

      <Row className="g-4">
        {/* Project Status Overview */}
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-4">Project Status Overview</h5>
              <div style={{ height: '300px' }}>
                <Doughnut data={projectStatusData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-4">Recent Activity</h5>
              {recentActivities.map((activity, index) => (
                <div key={index} className="d-flex align-items-start mb-3">
                  <div className={`rounded-circle p-2 bg-light-${activity.type === 'new' ? 'blue' : activity.type === 'completed' ? 'green' : 'yellow'} me-3`}>
                    {activity.type === 'new' && <FaProjectDiagram className="text-primary" />}
                    {activity.type === 'completed' && <FaClipboardCheck className="text-success" />}
                    {activity.type === 'po' && <FaFileInvoiceDollar className="text-warning" />}
                  </div>
                  <div>
                    <h6 className="mb-1">{activity.title}</h6>
                    <p className="text-muted mb-0">{activity.description}</p>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashbord;





