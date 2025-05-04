import React from 'react';
import { Link } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import styles from '../styles/common.module.css';

const Dashboard = () => {
  const { customers, loading, calculateCustomerStatus } = useCustomer();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Customer Dashboard</h2>
      <div className={styles.gridContainer}>
        {customers.map(customer => {
          const { totalOutstanding, nextDueDate, status } = calculateCustomerStatus(customer.loans);
          const isOverdue = status === 'Overdue';

          return (
            <div key={customer.id} className={styles.card}>
              <Link
                to={`/customer/${customer.id}`}
                className={styles.cardLink}
              >
                <h3 className={styles.cardTitle}>{customer.name}</h3>
                <div className={styles.cardContent}>
                  <p>Phone: {customer.phone}</p>
                  <p>Outstanding: ₹{totalOutstanding.toFixed(2)}</p>
                  {nextDueDate && (
                    <p>Next Due Date: {nextDueDate}</p>
                  )}
                  <div
                    className={`${styles.status} ${
                      isOverdue ? styles.statusOverdue : styles.statusUpToDate
                    }`}
                  >
                    {status}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {customers.length === 0 && (
        <div className={styles.emptyState}>
          <p>No customers found.</p>
          <Link to="/add-customer" className={styles.button}>
            Add Customer
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 