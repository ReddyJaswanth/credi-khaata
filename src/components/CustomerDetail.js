import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import styles from '../styles/common.module.css';
import AddLoanForm from './AddLoanForm';
import RepaymentForm from './RepaymentForm';

const CustomerDetail = () => {
  const { id } = useParams();
  const { customers, loading, calculateCustomerStatus } = useCustomer();
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [showRepayment, setShowRepayment] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const customer = customers.find(c => c.id === parseInt(id));

  if (!customer) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Customer not found</div>
      </div>
    );
  }

  const { totalOutstanding, status } = calculateCustomerStatus(customer.loans);

  const calculateLoanStatus = (loan) => {
    const repaidAmount = loan.repayments.reduce((sum, repayment) => sum + repayment.amount, 0);
    const outstanding = loan.amount - repaidAmount;
    const dueDate = new Date(loan.dueDate);
    const today = new Date();
    
    return {
      repaidAmount,
      outstanding,
      isOverdue: outstanding > 0 && dueDate < today
    };
  };

  const handleAddRepayment = (loanId) => {
    setSelectedLoanId(loanId);
    setShowRepayment(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.customerHeader}>
        <h2 className={styles.heading}>{customer.name}</h2>
        <div className={styles.customerInfo}>
          <p>Phone: {customer.phone}</p>
          <p>Total Outstanding: ₹{totalOutstanding.toFixed(2)}</p>
          <div className={`${styles.status} ${status === 'Overdue' ? styles.statusOverdue : styles.statusUpToDate}`}>
            {status}
          </div>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => setShowAddLoan(true)}
        >
          Add New Loan
        </button>
      </div>

      {showAddLoan && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button 
              className={styles.closeButton}
              onClick={() => setShowAddLoan(false)}
            >
              ×
            </button>
            <AddLoanForm 
              customerId={parseInt(id)}
              onSuccess={() => setShowAddLoan(false)}
            />
          </div>
        </div>
      )}

      {showRepayment && selectedLoanId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button 
              className={styles.closeButton}
              onClick={() => {
                setShowRepayment(false);
                setSelectedLoanId(null);
              }}
            >
              ×
            </button>
            <RepaymentForm 
              customerId={parseInt(id)}
              loanId={selectedLoanId}
              onSuccess={() => {
                setShowRepayment(false);
                setSelectedLoanId(null);
              }}
            />
          </div>
        </div>
      )}

      <div className={styles.transactionHistory}>
        <h3>Transaction History</h3>
        {customer.loans.map(loan => {
          const { repaidAmount, outstanding, isOverdue } = calculateLoanStatus(loan);
          
          return (
            <div key={loan.id} className={styles.loanCard}>
              <div className={styles.loanHeader}>
                <h4>Item: {loan.item}</h4>
                <div className={`${styles.loanStatus} ${isOverdue ? styles.overdue : styles.active}`}>
                  {isOverdue ? 'Overdue' : 'Active'}
                </div>
              </div>
              
              <div className={styles.loanDetails}>
                <p>Loan Amount: ₹{loan.amount.toFixed(2)}</p>
                <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
                <p>Repaid Amount: ₹{repaidAmount.toFixed(2)}</p>
                <p>Outstanding: ₹{outstanding.toFixed(2)}</p>
                {outstanding > 0 && (
                  <button 
                    className={styles.repayButton}
                    onClick={() => handleAddRepayment(loan.id)}
                  >
                    Add Repayment
                  </button>
                )}
              </div>

              {loan.repayments.length > 0 && (
                <div className={styles.repaymentHistory}>
                  <h5>Repayment History</h5>
                  <div className={styles.repaymentList}>
                    {loan.repayments.map(repayment => (
                      <div key={repayment.id} className={styles.repaymentItem}>
                        <span>₹{repayment.amount.toFixed(2)}</span>
                        <span>{new Date(repayment.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {customer.loans.length === 0 && (
          <div className={styles.emptyState}>
            <p>No transactions found for this customer.</p>
            <button 
              className={styles.addButton}
              onClick={() => setShowAddLoan(true)}
            >
              Add First Loan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail; 