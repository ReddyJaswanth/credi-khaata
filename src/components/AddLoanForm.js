import React from 'react';
import { useForm } from 'react-hook-form';
import { useCustomer } from '../context/CustomerContext';
import { showToast } from './Toast';
import styles from '../styles/common.module.css';

const AddLoanForm = ({ customerId, onSuccess }) => {
  const { addLoan, customers } = useCustomer();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const customer = customers.find(c => c.id === customerId);

  if (!customer) {
    return (
      <div className={styles.error}>Customer not found</div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const loanData = {
        amount: parseFloat(data.amount),
        item: data.item,
        dueDate: data.dueDate,
      };
      
      await addLoan(customerId, loanData);
      showToast.success('Loan added successfully!');
      onSuccess();
    } catch (error) {
      showToast.error('Failed to add loan. Please try again.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.heading}>Add New Loan</h2>
      <p className={styles.subheading}>Customer: {customer.name}</p>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Item Description:</label>
        <input
          className={`${styles.input} ${errors.item ? styles.inputError : ''}`}
          type="text"
          {...register('item', {
            required: 'Item description is required',
            minLength: {
              value: 3,
              message: 'Item description must be at least 3 characters long'
            }
          })}
        />
        {errors.item && (
          <div className={styles.errorText}>{errors.item.message}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Loan Amount (₹):</label>
        <input
          className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
          type="number"
          step="0.01"
          {...register('amount', {
            required: 'Amount is required',
            min: {
              value: 1,
              message: 'Amount must be greater than 0'
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
        <label className={styles.label}>Due Date:</label>
        <input
          className={`${styles.input} ${errors.dueDate ? styles.inputError : ''}`}
          type="date"
          min={new Date().toISOString().split('T')[0]}
          {...register('dueDate', {
            required: 'Due date is required',
            validate: value => 
              new Date(value) > new Date() || 'Due date must be in the future'
          })}
        />
        {errors.dueDate && (
          <div className={styles.errorText}>{errors.dueDate.message}</div>
        )}
      </div>

      <button 
        className={styles.button} 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Loan'}
      </button>
    </form>
  );
};

export default AddLoanForm; 