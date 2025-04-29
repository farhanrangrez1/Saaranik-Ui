// import axios from 'axios';
// import React, { useState } from 'react';
// import Base_Url from '../../ApiUrl/ApiUrl';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// function AddClientManagement() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     clientName: '',
//     industry: '',
//     clientWebsite: '',
//     clientAddress: '',
//     vatNumber: '',
//     csrCode: '',
//     clientStatus: 'active',
//     contactNumber: '',
//     jobTitle: '',
//     email: '',
//     phone: '',
//     department: '',
//     salesRepresentative: '',
//     billingAddress: '',
//     billingContact: '',
//     billingEmail: '',
//     billingPhone: '',
//     currency: 'USD',
//     paymentMethod: 'bank_transfer',
//     shippingAddress: '',
//     shippingContact: '',
//     shippingEmail: '',
//     shippingPhone: '',
//     shippingMethod: 'standard',
//     specialInstruction: '',
//     annualRevenue: '',
//     creditRating: '',
//     bankName: '',
//     accountNumber: '',
//     fiscalYearEnd: '',
//     financialContact: '',
//     accountCode: '',
//     accountType: 'receivable',
//     openingBalance: '',
//     balanceDate: '',
//     taxCategory: 'standard',
//     costCenter: '',
//     paymentTerms: 'net30',
//     creditLimit: '',
//     notes: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${Base_Url}/client/createClient`, formData);
//       console.log('Client Submitted:', res.data);
  
//       toast.success('Client created successfully!'); // optional toast
  
//       // Reset the form
//       setFormData({
//         clientName: '',
//         industry: '',
//         clientWebsite: '',
//         clientAddress: '',
//         vatNumber: '',
//         csrCode: '',
//         clientStatus: 'active',
//         contactNumber: '',
//         jobTitle: '',
//         email: '',
//         phone: '',
//         department: '',
//         salesRepresentative: '',
//         billingAddress: '',
//         billingContact: '',
//         billingEmail: '',
//         billingPhone: '',
//         currency: 'USD',
//         paymentMethod: 'bank_transfer',
//         shippingAddress: '',
//         shippingContact: '',
//         shippingEmail: '',
//         shippingPhone: '',
//         shippingMethod: 'standard',
//         specialInstruction: '',
//         annualRevenue: '',
//         creditRating: '',
//         bankName: '',
//         accountNumber: '',
//         fiscalYearEnd: '',
//         financialContact: '',
//         accountCode: '',
//         accountType: 'receivable',
//         openingBalance: '',
//         balanceDate: '',
//         taxCategory: 'standard',
//         costCenter: '',
//         paymentTerms: 'net30',
//         creditLimit: '',
//         notes: ''
//       });
  
//       // Navigate to clientManagement page after delay (optional)
//       setTimeout(() => {
//         navigate('/clientManagement');
//       }, 1000); // delay for smoother transition
//     } catch (err) {
//       console.error('Submit Error:', err);
//       toast.error('Failed to create client.');
//     }
//   };

//   return (
//     <>
//     <ToastContainer/>
//     <div className="container mt-5">
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h1 className="card-title h4 mb-4">Add Company</h1>   
//           <form className="row g-3" onSubmit={handleSubmit}>
//           <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
//            <div className='col-md-3'>
           
           
//               <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
            
//                 <option value="Client">Client</option>
//                 <option value="Sup">Suppliers</option>
//                 <option value="Other">Other</option>
//               </select></div>  <div className="col-md-6"></div>
//             <div className="col-md-6">
//               <label className="form-label">Name</label>
//               <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="form-control" placeholder="Enter  name" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Industry</label>
//               <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
//                 <option value="">Select industry</option>
//                 <option value="manufacturing">Manufacturing</option>
//                 <option value="tech">Technology</option>
//                 <option value="retail">Retail</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Website</label>
//               <input type="url" name="clientWebsite" value={formData.clientWebsite} onChange={handleChange} className="form-control" placeholder="https://" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Client Address</label>
//               <textarea className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
//             </div>  
//             <div className="col-md-6">
//               <label className="form-label">Tax ID/VAT Number</label>
//               <input type="text" name="vatNumber" value={formData.vatNumber} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">CSR Code</label>
//               <input type="text" name="csrCode" value={formData.csrCode} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Status</label>
//               <select className="form-select" name="clientStatus" value={formData.clientStatus} onChange={handleChange}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>

//             <h5 className="mb-3 mt-4">Primary Contact</h5>
//             <div className="col-md-6">
//               <label className="form-label">Contact Name</label>
//               <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Job Title</label>
//               <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Email</label>
//               <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Phone</label>
//               <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Department</label>
//               <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Sales Representative</label>
//               <input type="text" name="salesRepresentative" value={formData.salesRepresentative} onChange={handleChange} className="form-control" />
//             </div>
//   {/* Billing Information */}
// <h5 className="mb-3 mt-4">Billing Information</h5>
// <div className="col-md-12">
//   <label className="form-label">Billing Address</label>
//   <textarea className="form-control" rows="3" name="billingAddress" value={formData.billingAddress} onChange={handleChange}></textarea>
// </div>
// <div className="col-md-6">
//   <label className="form-label">Billing Contact Name</label>
//   <input type="text" className="form-control" name="billingContact" value={formData.billingContact} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Billing Email</label>
//   <input type="email" className="form-control" name="billingEmail" value={formData.billingEmail} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Billing Phone</label>
//   <input type="tel" className="form-control" name="billingPhone" value={formData.billingPhone} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Currency</label>
//   <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
//     <option value="USD">USD</option>
//     <option value="EUR">EUR</option>
//     <option value="GBP">GBP</option>
//   </select>
// </div>
// <div className="col-md-6">
//   <label className="form-label">Preferred Payment Method</label>
//   <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
//     <option value="bank_transfer">Bank Transfer</option>
//     <option value="credit_card">Credit Card</option>
//     <option value="check">Check</option>
//   </select>
// </div>

// {/* Shipping Information */}
// <h5 className="mb-3 mt-4">Shipping Information</h5>
// <div className="col-md-12">
//   <label className="form-label">Shipping Address</label>
//   <textarea className="form-control" rows="3" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange}></textarea>
// </div>
// <div className="col-md-6">
//   <label className="form-label">Shipping Contact Name</label>
//   <input type="text" className="form-control" name="shippingContact" value={formData.shippingContact} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Shipping Email</label>
//   <input type="email" className="form-control" name="shippingEmail" value={formData.shippingEmail} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Shipping Phone</label>
//   <input type="tel" className="form-control" name="shippingPhone" value={formData.shippingPhone} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Preferred Shipping Method</label>
//   <select className="form-select" name="shippingMethod" value={formData.shippingMethod} onChange={handleChange}>
//     <option value="standard">Standard Ground</option>
//     <option value="express">Express</option>
//     <option value="overnight">Overnight</option>
//   </select>
// </div>
// <div className="col-md-12">
//   <label className="form-label">Special Instructions</label>
//   <textarea className="form-control" rows="3" name="specialInstruction" value={formData.specialInstruction} onChange={handleChange}></textarea>
// </div>

// {/* Financial Information */}
// <h5 className="mb-3 mt-4">Financial Information</h5>
// <div className="col-md-6">
//   <label className="form-label">Annual Revenue</label>
//   <input type="number" className="form-control" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Credit Rating</label>
//   <input type="text" className="form-control" name="creditRating" value={formData.creditRating} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Bank Name</label>
//   <input type="text" className="form-control" name="bankName" value={formData.bankName} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Account Number</label>
//   <input type="text" className="form-control" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Fiscal Year End</label>
//   <input type="date" className="form-control" name="fiscalYearEnd" value={formData.fiscalYearEnd} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Financial Contact</label>
//   <input type="text" className="form-control" name="financialContact" value={formData.financialContact} onChange={handleChange} />
// </div>

// {/* Ledger Information */}
// <h5 className="mb-3 mt-4">Ledger Information</h5>
// <div className="col-md-6">
//   <label className="form-label">Account Code</label>
//   <input type="text" className="form-control" name="accountCode" value={formData.accountCode} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Account Type</label>
//   <select className="form-select" name="accountType" value={formData.accountType} onChange={handleChange}>
//     <option value="receivable">Accounts Receivable</option>
//     <option value="payable">Accounts Payable</option>
//   </select>
// </div>
// <div className="col-md-6">
//   <label className="form-label">Opening Balance</label>
//   <input type="number" className="form-control" name="openingBalance" value={formData.openingBalance} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Balance Date</label>
//   <input type="date" className="form-control" name="balanceDate" value={formData.balanceDate} onChange={handleChange} />
// </div>
// <div className="col-md-6">
//   <label className="form-label">Tax Category</label>
//   <select className="form-select" name="taxCategory" value={formData.taxCategory} onChange={handleChange}>
//     <option value="standard">Standard Rate</option>
//     <option value="reduced">Reduced Rate</option>
//     <option value="zero">Zero Rate</option>
//   </select>
// </div>
// <div className="col-md-6">
//   <label className="form-label">Cost Center</label>
//   <input type="text" className="form-control" name="costCenter" value={formData.costCenter} onChange={handleChange} />
// </div>

// {/* Additional Information */}
// <h5 className="mb-3 mt-4">Additional Information</h5>
// <div className="col-md-6">
//   <label className="form-label">Payment Terms</label>
//   <select className="form-select" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange}>
//     <option value="net30">Net 30</option>
//     <option value="net60">Net 60</option>
//     <option value="net90">Net 90</option>
//   </select>
// </div>
// <div className="col-md-6">
//   <label className="form-label">Credit Limit</label>
//   <input type="number" className="form-control" name="creditLimit" value={formData.creditLimit} onChange={handleChange} />
// </div>
// <div className="col-md-12">
//   <label className="form-label">Notes</label>
//   <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional notes"></textarea>
// </div>


//             <div className="col-12 d-flex justify-content-end gap-2 mt-4">
//               <button type="button" className="btn btn-outline-secondary">Cancel</button>
//               <button type="submit" id="btn-All" className="btn btn-dark">Create </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     </>
   
//   );
// }

// export default AddClientManagement;








import axios from 'axios';
import React, { useState } from 'react';
import Base_Url from '../../ApiUrl/ApiUrl';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddClientManagement() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    clientWebsite: '',
    clientAddress: '',
    vatNumber: '',
    csrCode: '',
    clientStatus: 'active',
    contactNumber: '',
    jobTitle: '',
    email: '',
    phone: '',
    department: '',
    salesRepresentative: '',
    billingAddress: '',
    billingContact: '',
    billingEmail: '',
    billingPhone: '',
    currency: 'USD',
    paymentMethod: 'bank_transfer',
    shippingAddress: '',
    shippingContact: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingMethod: 'standard',
    specialInstruction: '',
    annualRevenue: '',
    creditRating: '',
    bankName: '',
    accountNumber: '',
    fiscalYearEnd: '',
    financialContact: '',
    accountCode: '',
    accountType: 'receivable',
    openingBalance: '',
    balanceDate: '',
    taxCategory: 'standard',
    costCenter: '',
    paymentTerms: 'net30',
    creditLimit: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [contacts, setContacts] = useState([
    { contactName: '', jobTitle: '', email: '', phone: '', department: '', salesRepresentative: '' }
  ]);
  
  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...contacts];
    updatedContacts[index][name] = value;
    setContacts(updatedContacts);
  };
  
  const addContact = () => {
    setContacts([
      ...contacts,
      { contactName: '', jobTitle: '', email: '', phone: '', department: '', salesRepresentative: '' }
    ]);
  };
  
  const removeContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Base_Url}/client/createClient, formData`);
      console.log('Client Submitted:', res.data);
  
      toast.success('Client created successfully!'); // optional toast
  
      // Reset the form
      setFormData({
        clientName: '',
        industry: '',
        clientWebsite: '',
        clientAddress: '',
        vatNumber: '',
        csrCode: '',
        clientStatus: 'active',
        contactNumber: '',
        jobTitle: '',
        email: '',
        phone: '',
        department: '',
        salesRepresentative: '',
        billingAddress: '',
        billingContact: '',
        billingEmail: '',
        billingPhone: '',
        currency: 'USD',
        paymentMethod: 'bank_transfer',
        shippingAddress: '',
        shippingContact: '',
        shippingEmail: '',
        shippingPhone: '',
        shippingMethod: 'standard',
        specialInstruction: '',
        annualRevenue: '',
        creditRating: '',
        bankName: '',
        accountNumber: '',
        fiscalYearEnd: '',
        financialContact: '',
        accountCode: '',
        accountType: 'receivable',
        openingBalance: '',
        balanceDate: '',
        taxCategory: 'standard',
        costCenter: '',
        paymentTerms: 'net30',
        creditLimit: '',
        notes: ''
      });
  
      // Navigate to clientManagement page after delay (optional)
      setTimeout(() => {
        navigate('/clientManagement');
      }, 1000); // delay for smoother transition
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error('Failed to create client.');
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title h4 mb-4">Add Company</h1>   
          <form className="row g-3" onSubmit={handleSubmit}>
          <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
           <div className='col-md-3'>
           
           
              <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
            
                <option value="Client">Client</option>
                <option value="Sup">Suppliers</option>
                <option value="Other">Other</option>
              </select></div>  <div className="col-md-6"></div>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="form-control" placeholder="Enter  name" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Industry</label>
              <select className="form-select" name="industry" value={formData.industry} onChange={handleChange}>
                <option value="">Select industry</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="tech">Technology</option>
                <option value="retail">Retail</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Website</label>
              <input type="url" name="clientWebsite" value={formData.clientWebsite} onChange={handleChange} className="form-control" placeholder="https://" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Client Address</label>
              <textarea className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
            </div>  
            <div className="col-md-6">
              <label className="form-label">Tax ID/VAT Number</label>
              <input type="text" name="vatNumber" value={formData.vatNumber} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">CSR Code</label>
              <input type="text" name="csrCode" value={formData.csrCode} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select className="form-select" name="clientStatus" value={formData.clientStatus} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className='col-md-12 row'>
  <h5 className="mb-3 mt-4">Contact Persons</h5>

  {contacts.map((contact, index) => (
    <div className="border p-3 mb-3" key={index}>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Contact Name</label>
          <input
            type="text"
            name="contactName"
            value={contact.contactName}
            onChange={(e) => handleContactChange(index, e)}
            className="form-control"
            placeholder="Enter Contact Name"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={contact.jobTitle}
            onChange={(e) => handleContactChange(index, e)}
            className="form-control"
            placeholder="Enter Job Title"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={(e) => handleContactChange(index, e)}
            className="form-control"
            placeholder="Enter Email"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={(e) => handleContactChange(index, e)}
            className="form-control"
            placeholder="Enter Phone"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            value={contact.department}
            onChange={(e) => handleContactChange(index, e)}
            className="form-control"
            placeholder="Enter Department"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sales Representative</label>
          <input
            type="text"
            name="salesRepresentative"
            value={contact.salesRepresentative}
            onChange={(e) => handleContactChange(index, e)}
            className="form-control"
            placeholder="Enter Sales Representative"
          />
        </div>

        <div className="col-md-12 mt-2 d-flex justify-content-end">
          {contacts.length > 1 && (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeContact(index)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  ))}

  {/* Add More Button */}
  <div className="mb-3">
    <button
      type="button"
      className="btn btn-primary"
      onClick={addContact}
    >
      + Add Another Contact
    </button>
  </div>
</div>

  {/* Billing Information */}
  <div className='col-md-12 row'>
<h5 className="mb-3 mt-4">Billing Information</h5>
<div className="col-md-12">
  <label className="form-label">Billing Address</label>
  <textarea className="form-control" rows="3" name="billingAddress" value={formData.billingAddress} onChange={handleChange}></textarea>
</div>
<div className="col-md-6">
  <label className="form-label">Billing Contact Name</label>
  <input type="text" className="form-control" name="billingContact" value={formData.billingContact} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Billing Email</label>
  <input type="email" className="form-control" name="billingEmail" value={formData.billingEmail} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Billing Phone</label>
  <input type="tel" className="form-control" name="billingPhone" value={formData.billingPhone} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Currency</label>
  <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
  </select>
</div>
<div className="col-md-6">
  <label className="form-label">Preferred Payment Method</label>
  <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
    <option value="bank_transfer">Bank Transfer</option>
    <option value="credit_card">Credit Card</option>
    <option value="check">Check</option>
  </select>
</div>

{/* Shipping Information */}
<h5 className="mb-3 mt-4">Shipping Information</h5>
<div className="col-md-12">
  <label className="form-label">Shipping Address</label>
  <textarea className="form-control" rows="3" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange}></textarea>
</div>
<div className="col-md-6">
  <label className="form-label">Shipping Contact Name</label>
  <input type="text" className="form-control" name="shippingContact" value={formData.shippingContact} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Shipping Email</label>
  <input type="email" className="form-control" name="shippingEmail" value={formData.shippingEmail} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Shipping Phone</label>
  <input type="tel" className="form-control" name="shippingPhone" value={formData.shippingPhone} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Preferred Shipping Method</label>
  <select className="form-select" name="shippingMethod" value={formData.shippingMethod} onChange={handleChange}>
    <option value="standard">Standard Ground</option>
    <option value="express">Express</option>
    <option value="overnight">Overnight</option>
  </select>
</div>
<div className="col-md-12">
  <label className="form-label">Special Instructions</label>
  <textarea className="form-control" rows="3" name="specialInstruction" value={formData.specialInstruction} onChange={handleChange}></textarea>
</div>

{/* Financial Information */}
<h5 className="mb-3 mt-4">Financial Information</h5>
<div className="col-md-6">
  <label className="form-label">Annual Revenue</label>
  <input type="number" className="form-control" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Credit Rating</label>
  <input type="text" className="form-control" name="creditRating" value={formData.creditRating} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Bank Name</label>
  <input type="text" className="form-control" name="bankName" value={formData.bankName} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Account Number</label>
  <input type="text" className="form-control" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Fiscal Year End</label>
  <input type="date" className="form-control" name="fiscalYearEnd" value={formData.fiscalYearEnd} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Financial Contact</label>
  <input type="text" className="form-control" name="financialContact" value={formData.financialContact} onChange={handleChange} />
</div>

{/* Ledger Information */}
<h5 className="mb-3 mt-4">Ledger Information</h5>
<div className="col-md-6">
  <label className="form-label">Account Code</label>
  <input type="text" className="form-control" name="accountCode" value={formData.accountCode} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Account Type</label>
  <select className="form-select" name="accountType" value={formData.accountType} onChange={handleChange}>
    <option value="receivable">Accounts Receivable</option>
    <option value="payable">Accounts Payable</option>
  </select>
</div>
<div className="col-md-6">
  <label className="form-label">Opening Balance</label>
  <input type="number" className="form-control" name="openingBalance" value={formData.openingBalance} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Balance Date</label>
  <input type="date" className="form-control" name="balanceDate" value={formData.balanceDate} onChange={handleChange} />
</div>
<div className="col-md-6">
  <label className="form-label">Tax Category</label>
  <select className="form-select" name="taxCategory" value={formData.taxCategory} onChange={handleChange}>
    <option value="standard">Standard Rate</option>
    <option value="reduced">Reduced Rate</option>
    <option value="zero">Zero Rate</option>
  </select>
</div>
<div className="col-md-6">
  <label className="form-label">Cost Center</label>
  <input type="text" className="form-control" name="costCenter" value={formData.costCenter} onChange={handleChange} />
</div>

{/* Additional Information */}
<h5 className="mb-3 mt-4">Additional Information</h5>
<div className="col-md-6">
  <label className="form-label">Payment Terms</label>
  <select className="form-select" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange}>
    <option value="net30">Net 30</option>
    <option value="net60">Net 60</option>
    <option value="net90">Net 90</option>
  </select>
</div>
<div className="col-md-6">
  <label className="form-label">Credit Limit</label>
  <input type="number" className="form-control" name="creditLimit" value={formData.creditLimit} onChange={handleChange} />
</div>
</div>
<div className="col-md-12">
  <label className="form-label">Notes</label>
  <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional notes"></textarea>
</div>


            <div className="col-12 d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-outline-secondary">Cancel</button>
              <button type="submit" id="btn-All" className="btn btn-dark">Create </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
}

export default AddClientManagement;



