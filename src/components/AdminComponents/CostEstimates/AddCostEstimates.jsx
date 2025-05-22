

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createCostEstimate } from "../../../redux/slices/costEstimatesSlice";

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "SAR - Saudi Riyal", value: "SAR" },
];

const poStatuses = ["Pending", "Approved", "Rejected"];
const statuses = ["Active", "Inactive", "Completed"];

function AddCostEstimates() {
const navigate = useNavigate();
const dispatch = useDispatch()

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0, amount: 0 },
  ]);

  const [formData, setFormData] = useState({
    clientId: ["6821a7b537e654e25af3da1d"],
    projectsId: ["681f1eb87397dc2b7e25eba2"],
    projectName: "681f1eb87397dc2b7e25eba2",
    estimateDate: "",
    validUntil: "",
    Notes: "",
    currency: "USD",
    POStatus: "Pending",
    Status: "Active",
  });

  const [taxRate, setTaxRate] = useState(0.05);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        VATRate: taxRate * 100,
        lineItems: items,
      };
      console.log("Submitted Data:", payload);
      dispatch(createCostEstimate(payload))
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to create estimate!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <h5 className="fw-bold mb-4">Cost Estimates</h5>
        <div className="bg-white border rounded-3 p-4 shadow-sm">
          <h6 className="fw-semibold mb-4">Create New Estimate</h6>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="form-label">Client</label>
              <select
                className="form-select"
                name="clientId"
                value={formData.clientId}
                onChange={handleFormChange}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Number</label>
              <input
                type="text"
                className="form-control"
                name="projectsId"
                value={formData.projectsId}
                // onChange={handleProjectNumberChange}
                placeholder="Enter project number"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                readOnly
              />
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
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={formData.currency}
                onChange={handleFormChange}
              >
                {currencies.map((curr) => (
                  <option key={curr.value} value={curr.value}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">PO Status</label>
              <select
                className="form-select"
                name="POStatus"
                value={formData.POStatus}
                onChange={handleFormChange}
              >
                {poStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleFormChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
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
          {/* Line Items UI (Same as before) */}
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
                <span>
                  {formData.currency} {item.amount.toFixed(2)}
                </span>
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
            onClick={addItem}
          >
            + Add Line Item
          </button>

          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label">VAT Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={(taxRate * 100).toFixed(2)}
                onChange={(e) =>
                  setTaxRate(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) / 100)
                }
              />
              <div className="mt-3">
                Subtotal: {formData.currency} {subtotal.toFixed(2)}<br />
                VAT: {formData.currency} {tax.toFixed(2)}<br />
                <strong>Total: {formData.currency} {total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="4"
                name="Notes"
                value={formData.Notes}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-4">
            <Link to="/CostEstimates">
              <button className="btn btn-light me-2">Cancel</button>
            </Link>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Create Estimate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCostEstimates;
