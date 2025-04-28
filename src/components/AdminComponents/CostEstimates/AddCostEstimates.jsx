import React, { useEffect, useState } from "react";
import axios from "axios";
import Base_Url from "../../ApiUrl/ApiUrl";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];


function AddCostEstimates() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);
  const [formData, setFormData] = useState({
    clientId: "",
    projectName: "",
    estimateDate: "",
    validUntil: "",
    estimateNumber: "",
    notes: "",
    currency: "USD"
  });

  const [taxRate, setTaxRate] = useState(0.1);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount = calculateAmount(
      newItems[index].quantity,
      newItems[index].rate
    );
    setItems(newItems);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, rate: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        items,
      };

      const res = await axios.post(
        `${Base_Url}/costestimates/createCostEstimate`,
        payload
      );
      toast.success("Estimate created successfully!");

      setFormData({
        clientId: "",
        projectName: "",
        estimateDate: "",
        validUntil: "",
        estimateNumber: "",
        notes: "",
        currency: "USD",
      });
      setItems([{ description: "", quantity: 0, rate: 0, amount: 0 }]);

      setTimeout(() => {
        navigate("/CostEstimates");
      }, 1000);

    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to create estimate!");
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${Base_Url}/client/getAllClient`);
        setClients(response.data.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Client Name</label>

              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                onChange={handleFormChange}
                placeholder="Enter project name"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Project Name</label>
              <select
  className="form-select"
  name="projectName"
  value={formData.projectName}
  onChange={handleFormChange}
>
  <option value="">Select Project</option>
  <option value="POS">POS</option>
  <option value="CRM">CRM</option>
  <option value="HRM">HRM</option>
  <option value="Project Management">Project Management</option>
  <option value="Task Management">Task Management</option>
  <option value="E-commerce">E-commerce</option>
</select>

            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Date</label>
              <input
                type="date"
                className="form-control"
                name="estimateDate"
                value={formData.estimateDate}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Estimate Number</label>
              <select
                className="form-select"
                name="estimateNumber"
                value={formData.estimateNumber}
                onChange={handleFormChange}
              >
                <option value="">Select Estimate Number</option>
                <option value="EST-001">EST-00001</option>
                <option value="EST-002">EST-00002</option>
                <option value="EST-003">EST-00003</option>
                <option value="EST-004">EST-00004</option>
              </select>


            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Currency</option>
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h6 className="fw-semibold mb-3">Line Items</h6>
          <div className="row fw-semibold text-muted mb-2 px-2">
            <div className="col-md-5">Description</div>
            <div className="col-md-2">Quantity</div>
            <div className="col-md-2">Rate</div>
            <div className="col-md-2">Amount</div>
            <div className="col-md-1 text-end"></div>
          </div>

          {items.map((item, index) => (
            <div
              className="row gx-2 gy-2 align-items-center mb-2 px-2 py-2"
              key={index}
              style={{ background: "#f9f9f9", borderRadius: "8px" }}
            >
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-2">
                <span>{formData.currency} {item.amount.toFixed(2)}</span>
              </div>
              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeItem(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn border rounded px-3 py-1 mb-4 text-dark"
            style={{ borderColor: "#dee2e6", backgroundColor: "#fff" }}
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">VAT Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={(taxRate * 100).toFixed(2)}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setTaxRate(isNaN(value) ? 0 : value / 100);
                  }}
                />
              </div>

              <div className="mb-2">Subtotal: {formData.currency} {subtotal.toFixed(2)}</div>
              <div className="mb-2">VAT ({(taxRate * 100).toFixed(0)}%): {formData.currency} {tax.toFixed(2)}</div>
              <div className="fw-bold mb-2">Total: {formData.currency} {total.toFixed(2)}</div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                rows="4"
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                placeholder="Enter any additional notes"
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to={"/CostEstimates"}>
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button id="btn-All" className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;