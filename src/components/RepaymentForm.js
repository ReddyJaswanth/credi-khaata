import React from 'react';
import { useForm } from 'react-hook-form';
import { useCustomer } from '../context/CustomerContext';
import { showToast } from './Toast';
import styles from '../styles/common.module.css';

const RepaymentForm = ({ customerId, loanId, onSuccess }) => {
  const { addRepayment, customers } = useCustomer();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const customer = customers.find(c => c.id === customerId);
  const loan = customer?.loans.find(l => l.id === loanId);

  if (!customer || !loan) {
    return (
      <div className={styles.error}>Loan not found</div>
    );
  }

  const totalRepaid = loan.repayments.reduce((sum, repayment) => sum + repayment.amount, 0);
  const remainingAmount = loan.amount - totalRepaid;

  const onSubmit = async (data) => {
    try {
      const repaymentAmount = parseFloat(data.amount);
      
      if (repaymentAmount > remainingAmount) {
        showToast.error('Repayment amount cannot exceed the remaining loan amount');
        return;
      }

      const repaymentData = {
        amount: repaymentAmount,
        date: data.date || new Date().toISOString().split('T')[0],
      };
      
      await addRepayment(customerId, loanId, repaymentData);
      showToast.success('Repayment recorded successfully!');
      onSuccess();
    } catch (error) {
      showToast.error('Failed to record repayment. Please try again.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.heading}>Record Repayment</h2>
      <div className={styles.loanInfo}>
        <p>Customer: {customer.name}</p>
        <p>Item: {loan.item}</p>
        <p>Total Loan Amount: ₹{loan.amount.toFixed(2)}</p>
        <p>Remaining Amount: ₹{remainingAmount.toFixed(2)}</p>
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Repayment Amount (₹):</label>
        <input
          className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
          type="number"
          step="0.01"
          max={remainingAmount}
          {...register('amount', {
            required: 'Amount is required',
            min: {
              value: 1,
              message: 'Amount must be greater than 0'
            },
            max: {
              value: remainingAmount,
              message: 'Amount cannot exceed the remaining balance'
            },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: 'Please enter a valid amount'
            }
          })}
        />
        {errors.amount && (
          <div className={styles.errorText}>{errors.amount.message}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Payment Date:</label>
        <input
          className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
          type="date"
          max={new Date().toISOString().split('T')[0]}
          defaultValue={new Date().toISOString().split('T')[0]}
          {...register('date', {
            validate: value => 
              new Date(value) <= new Date() || 'Payment date cannot be in the future'
          })}
        />
        {errors.date && (
          <div className={styles.errorText}>{errors.date.message}</div>
        )}
      </div>

      <button 
        className={styles.button} 
        type="submit"
        disabled={isSubmitting || remainingAmount <= 0}
      >
        {isSubmitting ? 'Recording...' : 'Record Repayment'}
      </button>
    </form>
  );
};

export default RepaymentForm;