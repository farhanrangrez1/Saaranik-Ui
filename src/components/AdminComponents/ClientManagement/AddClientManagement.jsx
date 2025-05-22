import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { createClients, fetchClient, updateClients } from '../../../redux/slices/ClientSlice';
import "react-toastify/dist/ReactToastify.css";


function AddClientManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // for edit mode
  const location = useLocation();
  const { client } = location.state || {};
  console.log(client);

  // Initial form state
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    website: '',
    clientAddress: '',
    TaxID_VATNumber: '',
    CSRCode: '',
    Status: 'Active'
  });

  // Contact persons state
  const [contactPersons, setContactPersons] = useState([
    {
      contactName: '',
      jobTitle: '',
      email: '',
      phone: '',
      department: '',
      salesRepresentative: ''
    }
  ]);

  // Billing information state
  const [billingInformation, setBillingInformation] = useState([
    {
      billingAddress: '',
      billingContactName: '',
      billingEmail: '',
      billingPhone: '',
      currency: '',
      preferredPaymentMethod: ''
    }
  ]);
  // Shipping information state
  const [shippingInformation, setShippingInformation] = useState([
    {
      shippingAddress: '',
      shippingContactName: '',
      shippingEmail: '',
      shippingPhone: '',
      preferredShippingMethod: '',
      specialInstructions: ''
    }
  ]);
  // Financial information state
  const [financialInformation, setFinancialInformation] = useState([
    {
      annualRevenue: '',
      creditRating: '',
      bankName: '',
      accountNumber: '',
      fiscalYearEnd: '',
      financialContact: ''
    }
  ]);

  // Ledger information state
  const [ledgerInformation, setLedgerInformation] = useState([
    {
      accountCode: '',
      accountType: '',
      openingBalance: '',
      balanceDate: '',
      taxCategory: '',
      costCenter: ''
    }
  ]);

  // Additional information state
  const [additionalInformation, setAdditionalInformation] = useState({
    paymentTerms: '',
    creditLimit: '',
    notes: ''
  });


useEffect(() => {
  const updateStates = (clientData) => {
    setFormData({
      clientName: clientData.clientName || '',
      industry: clientData.industry || '',
      website: clientData.website || '',
      clientAddress: clientData.clientAddress || '',
      TaxID_VATNumber: clientData.TaxID_VATNumber || '',
      CSRCode: clientData.CSRCode || '',
      Status: clientData.Status || 'Active'
    });

    setContactPersons(clientData.contactPersons || []);
    setBillingInformation(clientData.billingInformation || []);
    setShippingInformation(clientData.shippingInformation || []);
    setFinancialInformation(clientData.financialInformation || []);
    setLedgerInformation(clientData.ledgerInformation || []);
    setAdditionalInformation(clientData.additionalInformation || {
      paymentTerms: '',
      creditLimit: '',
      notes: ''
    });
  };

  if (client) {
    updateStates(client);
  } else if (id) {
    dispatch(fetchclientById(id)).then((res) => {
      const fetchedclient = res.payload;
      if (fetchedclient) {
        updateStates(fetchedclient);
      }
    });
  }
}, [id, dispatch, client]);



  // Handle basic form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact person changes
  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...contactPersons];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [name]: value
    };
    setContactPersons(updatedContacts);
  };

  // Handle billing information changes
  const handleBillingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBilling = [...billingInformation];
    updatedBilling[index] = {
      ...updatedBilling[index],
      [name]: value
    };
    setBillingInformation(updatedBilling);
  };

  // Handle shipping information changes
  const handleShippingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedShipping = [...shippingInformation];
    updatedShipping[index] = {
      ...updatedShipping[index],
      [name]: value
    };
    setShippingInformation(updatedShipping);
  };

  // Handle financial information changes
  const handleFinancialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFinancial = [...financialInformation];
    updatedFinancial[index] = {
      ...updatedFinancial[index],
      [name]: value
    };
    setFinancialInformation(updatedFinancial);
  };

  // Handle ledger information changes
  const handleLedgerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLedger = [...ledgerInformation];
    updatedLedger[index] = {
      ...updatedLedger[index],
      [name]: value
    };
    setLedgerInformation(updatedLedger);
  };


  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInformation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullData = {
      ...formData,
      contactPersons,
      billingInformation,
      shippingInformation,
      financialInformation,
      ledgerInformation,
      additionalInformation
    };
    console.log('Full Data Object:', fullData);
    if (id) {
      dispatch(updateClients(fullData))
        .unwrap()
        .then(() => {
          toast.success("clientupdated successfully!");
          navigate("/clientManagement");
              dispatch(fetchClient());
        })
        .catch(() => {
          toast.error("Failed to update client!");
        });
    } else {
          dispatch(createClients(fullData))
        .unwrap()
        .then(() => {
          toast.success("clientcreated successfully!");
          navigate("/clientManagement");
              dispatch(fetchClient());
        })
        .catch(() => {
          toast.error("Error creating client");
        });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const fullData = {
  //     ...formData,
  //     contactPersons,
  //     billingInformation,
  //     shippingInformation,
  //     financialInformation,
  //     ledgerInformation,
  //     additionalInformation
  //   };
  //         dispatch(createClients(fullData))
  //       .unwrap()
  //       .then(() => {
  //         toast.success("clientcreated successfully!");
  //         navigate("/clientManagement");
  //       })
  //       .catch(() => {
  //         toast.error("Error creating client");
  //       });
    
  // };

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            {/* <h1 className="card-title h4 mb-4">Add Company</h1> */}
                   <h2 className="mb-4">{id || client?._id ? "Edit client" : "New Company"}</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className='col-md-3'>  <h6 className="mb-3">Client/Supplier Information</h6></div>
              <div className="col-md-6"></div>
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
                <input type="url" name="website" value={formData.website} onChange={handleChange} className="form-control" placeholder="https://" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Client Address</label>
                <textarea className="form-control" name="clientAddress" value={formData.clientAddress} onChange={handleChange}></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tax ID/VAT Number</label>
                <input type="text" name="TaxID_VATNumber" value={formData.TaxID_VATNumber} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">CSR Code</label>
                <input type="text" name="CSRCode" value={formData.CSRCode} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select className="form-select" name="Status" value={formData.Status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className='col-md-12 row'>
                <h5 className="mb-3 mt-4">Contact Persons</h5>

                {contactPersons.map((contact, index) => (
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
                        {contactPersons.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              const updatedContacts = [...contactPersons];
                              updatedContacts.splice(index, 1);
                              setContactPersons(updatedContacts);
                            }}
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
                    onClick={() => {
                      setContactPersons([
                        ...contactPersons,
                        {
                          contactName: '',
                          jobTitle: '',
                          email: '',
                          phone: '',
                          department: '',
                          salesRepresentative: ''
                        }
                      ]);
                    }}
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
                  <textarea className="form-control" rows="3" name="billingAddress" value={billingInformation[0].billingAddress} onChange={(e) => handleBillingChange(0, e)}></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Billing Contact Name</label>
                  <input type="text" className="form-control" name="billingContactName" value={billingInformation[0].billingContactName} onChange={(e) => handleBillingChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Billing Email</label>
                  <input type="email" className="form-control" name="billingEmail" value={billingInformation[0].billingEmail} onChange={(e) => handleBillingChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Billing Phone</label>
                  <input type="tel" className="form-control" name="billingPhone" value={billingInformation[0].billingPhone} onChange={(e) => handleBillingChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Currency</label>
                  <select className="form-select" name="currency" value={billingInformation[0].currency} onChange={(e) => handleBillingChange(0, e)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Preferred Payment Method</label>
                  <select className="form-select" name="preferredPaymentMethod" value={billingInformation[0].preferredPaymentMethod} onChange={(e) => handleBillingChange(0, e)}>
                    <option value="">Select Payment Method</option>
                    <option value="BankTransfer">BankTransfer</option>
                    <option value="CreditCard">CreditCard</option>
                    <option value="Check">Check</option>
                  </select>
                </div>

                {/* Shipping Information */}
                <h5 className="mb-3 mt-4">Shipping Information</h5>
                <div className="col-md-12">
                  <label className="form-label">Shipping Address</label>
                  <textarea className="form-control" rows="3" name="shippingAddress" value={shippingInformation[0].shippingAddress} onChange={(e) => handleShippingChange(0, e)}></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Shipping Contact Name</label>
                  <input type="text" className="form-control" name="shippingContactName" value={shippingInformation[0].shippingContactName} onChange={(e) => handleShippingChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Shipping Email</label>
                  <input type="email" className="form-control" name="shippingEmail" value={shippingInformation[0].shippingEmail} onChange={(e) => handleShippingChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Shipping Phone</label>
                  <input type="tel" className="form-control" name="shippingPhone" value={shippingInformation[0].shippingPhone} onChange={(e) => handleShippingChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Preferred Shipping Method</label>
                  <select className="form-select" name="preferredShippingMethod" value={shippingInformation[0].preferredShippingMethod} onChange={(e) => handleShippingChange(0, e)}>
                    <option value="">Select Shipping Method</option>
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                    <option value="Overnight">Overnight</option>
                    <option value="Ground">Ground</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Special Instructions</label>
                  <textarea className="form-control" rows="3" name="specialInstructions" value={shippingInformation[0].specialInstructions} onChange={(e) => handleShippingChange(0, e)}></textarea>
                </div>

                {/* Financial Information */}
                <h5 className="mb-3 mt-4">Financial Information</h5>
                <div className="col-md-6">
                  <label className="form-label">Annual Revenue</label>
                  <input type="number" className="form-control" name="annualRevenue" value={financialInformation[0].annualRevenue} onChange={(e) => handleFinancialChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Credit Rating</label>
                  <input type="text" className="form-control" name="creditRating" value={financialInformation[0].creditRating} onChange={(e) => handleFinancialChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bank Name</label>
                  <input type="text" className="form-control" name="bankName" value={financialInformation[0].bankName} onChange={(e) => handleFinancialChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Account Number</label>
                  <input type="text" className="form-control" name="accountNumber" value={financialInformation[0].accountNumber} onChange={(e) => handleFinancialChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Fiscal Year End</label>
                  <input type="date" className="form-control" name="fiscalYearEnd" value={financialInformation[0].fiscalYearEnd} onChange={(e) => handleFinancialChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Financial Contact</label>
                  <input type="text" className="form-control" name="financialContact" value={financialInformation[0].financialContact} onChange={(e) => handleFinancialChange(0, e)} />
                </div>

                {/* Ledger Information */}
                <h5 className="mb-3 mt-4">Ledger Information</h5>
                <div className="col-md-6">
                  <label className="form-label">Account Code</label>
                  <input type="text" className="form-control" name="accountCode" value={ledgerInformation[0].accountCode} onChange={(e) => handleLedgerChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Account Type</label>
                  <select className="form-select" name="accountType" value={ledgerInformation[0].accountType} onChange={(e) => handleLedgerChange(0, e)}>
                    <option value="">Select Account Type</option>
                    <option value="AccountsReceivable">AccountsReceivable</option>
                    <option value="AccountsPayable">AccountsPayable</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Opening Balance</label>
                  <input type="number" className="form-control" name="openingBalance" value={ledgerInformation[0].openingBalance} onChange={(e) => handleLedgerChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Balance Date</label>
                  <input type="date" className="form-control" name="balanceDate" value={ledgerInformation[0].balanceDate} onChange={(e) => handleLedgerChange(0, e)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tax Category</label>
                  <select className="form-select" name="taxCategory" value={ledgerInformation[0].taxCategory} onChange={(e) => handleLedgerChange(0, e)}>
                    <option value="standard">Standard Rate</option>
                    <option value="reduced">Reduced Rate</option>
                    <option value="zero">Zero Rate</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cost Center</label>
                  <input type="text" className="form-control" name="costCenter" value={ledgerInformation[0].costCenter} onChange={(e) => handleLedgerChange(0, e)} />
                </div>

                {/* Additional Information */}
                <h5 className="mb-3 mt-4">Additional Information</h5>
                <div className="col-md-6">
                  <label className="form-label">Payment Terms</label>
                  <select className="form-select" name="paymentTerms" value={additionalInformation.paymentTerms} onChange={handleAdditionalChange}>
                    <option value="net30">Net 30</option>
                    <option value="net60">Net 60</option>
                    <option value="net90">Net 90</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Credit Limit</label>
                  <input type="number" className="form-control" name="creditLimit" value={additionalInformation.creditLimit} onChange={handleAdditionalChange} />
                </div>
              </div>
              <div className="col-md-12">
                <label className="form-label">Notes</label>
                <textarea className="form-control" rows="3" name="notes" value={additionalInformation.notes} onChange={handleAdditionalChange} placeholder="Additional notes"></textarea>
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

