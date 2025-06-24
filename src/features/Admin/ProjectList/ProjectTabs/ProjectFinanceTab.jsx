import React from 'react';
import PurchaseOrder from './PurchaseOrder';
import ReceivablePurchaseOrders from './ReceivablePurchaseOrders';
import Invoicing_Billing from '../../Invoicing_Billing/Invoicing_Billing';

function ProjectFinanceTab({ budget, purchaseOrders }) {
  return (
    <div className="row g-4">
      {/* Budget Overview Card */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Budget Overview</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-3">
                <div className="text-center">
                  <h6 className="text-muted mb-2">Estimated Budget</h6>
                  <h3 className="mb-0">{budget.estimated}</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h6 className="text-muted mb-2">Actual Spent</h6>
                  <h3 className="mb-0">{budget.actual}</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h6 className="text-muted mb-2">Status</h6>
                  <h3 className={`mb-0 ${budget.isUnderBudget ? 'text-success' : 'text-danger'}`}>
                    {budget.status}
                  </h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h6 className="text-muted mb-2">Remaining</h6>
                  <h3 className="mb-0">
                    {parseFloat(budget.estimated.replace('$', '').replace(',', '')) -
                      parseFloat(budget.actual.replace('$', '').replace(',', ''))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Orders */}
      <div className="col-12">
      <PurchaseOrder/>
      </div>

    

      {/* Received POs Section */}
      <div className="col-12">
        <ReceivablePurchaseOrders/>
      </div>

   
      {/* Financial Summary Charts */}
      <div className="col-12">
        <Invoicing_Billing/>
      </div>

    </div>
  );
}

export default ProjectFinanceTab;