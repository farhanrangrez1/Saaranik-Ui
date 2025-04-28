import React, { useEffect, useState } from 'react';
import { Button, Form, Table, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Base_Url from '../../ApiUrl/ApiUrl';

function IssuablePurchase() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(`${Base_Url}/purchase/getAllPurchase`);
      setPurchaseOrders(response.data.data);
      console.log("purchase",response.data.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this purchase order?")) {
      try {
        await axios.delete(`${Base_Url}/purchase/deletePurchase/${id}`);
        fetchPurchaseOrders(); // Refresh the list
      } catch (error) {
        console.error("Error deleting purchase order:", error);
      }
    }
  };

  useEffect(() => {
    fetchPurchaseOrders(); 
  }, []);
 
  const filteredOrders = purchaseOrders.filter(po =>
    (po.clientName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) 
  );
   
      
  return (
    <Container fluid className="p-4 m-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <h3 className='p-3'>Issuable Purchase Orders</h3>
      <Row className="mb-3 g-3">
        <Col xs={12} sm>
          <Form.Control
            type="search"
            placeholder="Search POs..."
            className="w-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={12} sm="auto">
          <Link to="/AddIssuablePurchase">
            <Button id='btn-All' variant="primary" className="w-100 d-flex align-items-center justify-content-center">
              + New Purchase Order
            </Button>
          </Link>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>SL.</th>
              <th>Client</th>
              <th>Project/Job</th>
              <th>Issue Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((po,index) => (
                <tr key={po._id}>
                  <td>{index+1}</td>
                  <td>{po.clientName}</td>
                  <td>{po.projectId}</td>
                  <td>{new Date(po.issueDate).toLocaleDateString()}</td>
                  <td>${po.total}</td>
                  <td className="d-flex gap-2">
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="link" className="text-dark no-caret p-0">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View Details</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDelete(po.id)}>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center">No Purchase Orders Found</td></tr>
            )}
          </tbody>
        </Table>
      </div>

      <Row className="mt-3 align-items-center">
        <Col xs={12} sm className="text-center text-sm-start mb-3 mb-sm-0">
          Showing {filteredOrders.length} of {purchaseOrders.length} entries
        </Col>
        <Col xs={12} sm="auto" className="d-flex justify-content-center justify-content-sm-end">
          <Button variant="outline-primary" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline-primary" size="sm" className="ms-2" disabled>
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default IssuablePurchase;
