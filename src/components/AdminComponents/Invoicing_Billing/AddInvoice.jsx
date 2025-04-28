import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const currencies = [
  { value: 'USD', label: 'US Dollars/Cents', mainUnit: 'Dollars', subUnit: 'Cents' },
  { value: 'GBP', label: 'British Pounds/Pence', mainUnit: 'Pounds', subUnit: 'Pence' },
  { value: 'EUR', label: 'Euro/Cents', mainUnit: 'Euro', subUnit: 'Cents' },
  { value: 'INR', label: 'Rupees/Paise', mainUnit: 'Rupees', subUnit: 'Paise' },
  { value: 'AED', label: 'Dirham/Fils', mainUnit: 'Dirham', subUnit: 'Fils' },
  { value: 'SAR', label: 'Riyals/Halala', mainUnit: 'Riyals', subUnit: 'Halala' }
];

const documentFormats = [
  { value: 'invoice', label: 'Tax Invoice' },
  { value: 'estimate', label: 'Invoice' },
  { value: 'po', label: 'Dummy Invoice' },
  { value: 'proforma', label: 'Proforma Invoice' }
];

const formatStyles = [
  { value: 'format1', label: 'Format 1 (Classic)' },
  { value: 'format2', label: 'Format 2 (Modern)' },
  { value: 'format3', label: 'Format 3 (Professional)' }
];

const numberToWords = (num) => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numToWord = (n) => {
    if (n < 20) return units[n];
    const digit = n % 10;
    return tens[Math.floor(n / 10)] + (digit ? '-' + units[digit] : '');
  };

  if (num === 0) return 'Zero';
  
  const convert = (n) => {
    if (n < 100) return numToWord(n);
    if (n < 1000) return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWord(n % 100) : '');
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '');
    return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '');
  };
  
  return convert(num);
};

function AddInvoice({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    client: '',
    project: '',
    dueDate: '',
    status: 'Pending',
    currency: 'INR',
    documentType: 'invoice',
    formatStyle: 'format1'
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const calculateAmount = (quantity, rate) => quantity * rate;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = calculateAmount(
        field === 'quantity' ? value : newItems[index].quantity,
        field === 'rate' ? value : newItems[index].rate
      );
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      ...formData,
      items,
      amount: subtotal
    };
    onSubmit(invoiceData);
  };

  return (
    <div className="container-fluid p-4" style={{backgroundColor: "white", borderRadius: "10px"}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Generate New Invoice</h2>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Select
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
              >
                <option value="">Select Client</option>
                <option value="Acme Corp">Acme Corp</option>
                <option value="Tech Solutions">Tech Solutions</option>
                <option value="Global Inc">Global Inc</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6 mb-3">
            <Form.Group>
              <Form.Label>Project</Form.Label>
              <Form.Control
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="Enter project name"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6 mb-3">
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6 mb-3">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6 mb-3">
            <Form.Group>
              <Form.Label>Currency</Form.Label>
              <Form.Select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              >
                {currencies.map(curr => (
                  <option key={curr.value} value={curr.value}>{curr.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6 mb-3">
            <Form.Group>
              <Form.Label>Document Type</Form.Label>
              <Form.Select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                {documentFormats.map(format => (
                  <option key={format.value} value={format.value}>{format.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3">
  <Form.Group>
    <Form.Label>Output Format</Form.Label>
    <Form.Select
      name="outputFormat"
      value={formData.outputFormat}
      onChange={handleChange}
      required
    >
      {formatStyles.map(style => (
        <option key={style.value} value={style.value}>
          {style.label}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
</div>

        </div>

        <h6 className="mb-3">Line Items</h6>
        <Table responsive className="mb-3">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount ({formData.currency})</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                    required
                  />
                </td>
                <td>{item.amount.toFixed(2)}</td>
                <td>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="outline-secondary"
          className="mb-4"
          onClick={addItem}
          type="button"
        >
          + Add Line Item
        </Button>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="mb-2">Subtotal: {formData.currency} {subtotal.toFixed(2)}</div>
            <div className="mb-2" style={{ fontSize: '0.9em', color: '#666' }}>
  {currencies.find(c => c.value === formData.currency)?.mainUnit}{' '}
  {numberToWords(Math.floor(subtotal))}
  {subtotal % 1 > 0 &&
    ` and ${numberToWords(Math.round((subtotal % 1) * 100))} ${currencies.find(c => c.value === formData.currency)?.subUnit}`} Only
</div>

          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button id='All_btn' type="submit">Generate Invoice</Button>
        </div>
      </Form>
    </div>
  );
}

export default AddInvoice;