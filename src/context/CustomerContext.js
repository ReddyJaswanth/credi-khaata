import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

// Mock data for initial customers
const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    phone: '+1234567890',
    loans: [
      {
        id: 1,
        amount: 5000,
        dueDate: '2024-03-25',
        item: 'Groceries',
        repayments: [
          { id: 1, amount: 2000, date: '2024-03-10' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '+9876543210',
    loans: [
      {
        id: 2,
        amount: 10000,
        dueDate: '2025-05-15',
        item: 'Electronics',
        repayments: []
      }
    ]
  }
];

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch customers
    const fetchCustomers = () => {
      setTimeout(() => {
        const savedCustomers = localStorage.getItem('customers');
        if (savedCustomers) {
          setCustomers(JSON.parse(savedCustomers));
        } else {
          setCustomers(mockCustomers);
          localStorage.setItem('customers', JSON.stringify(mockCustomers));
        }
        setLoading(false);
      }, 1000);
    };

    fetchCustomers();
  }, []);

  const calculateCustomerStatus = (loans) => {
    const today = new Date();
    let totalOutstanding = 0;
    let nextDueDate = null;
    let isOverdue = false;

    loans.forEach(loan => {
      const repaidAmount = loan.repayments.reduce((sum, repayment) => sum + repayment.amount, 0);
      const outstanding = loan.amount - repaidAmount;
      totalOutstanding += outstanding;

      const dueDate = new Date(loan.dueDate);
      if (outstanding > 0) {
        if (!nextDueDate || dueDate < nextDueDate) {
          nextDueDate = dueDate;
        }
        if (dueDate < today) {
          isOverdue = true;
        }
      }
    });

    return {
      totalOutstanding,
      nextDueDate: nextDueDate ? nextDueDate.toISOString().split('T')[0] : null,
      status: isOverdue ? 'Overdue' : 'Up-to-date'
    };
  };

  const addCustomer = (newCustomer) => {
    const updatedCustomers = [...customers, { ...newCustomer, id: Date.now(), loans: [] }];
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const addLoan = (customerId, loan) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          loans: [...customer.loans, { ...loan, id: Date.now(), repayments: [] }]
        };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const addRepayment = (customerId, loanId, repayment) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        const updatedLoans = customer.loans.map(loan => {
          if (loan.id === loanId) {
            return {
              ...loan,
              repayments: [...loan.repayments, { ...repayment, id: Date.now() }]
            };
          }
          return loan;
        });
        return { ...customer, loans: updatedLoans };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        calculateCustomerStatus,
        addCustomer,
        addLoan,
        addRepayment
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};