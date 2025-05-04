import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { showToast } from './Toast';
import styles from '../styles/common.module.css';

const AddCustomerForm = () => {
  const navigate = useNavigate();
  const { addCustomer } = useCustomer();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addCustomer({
        name: data.name,
        phone: data.phone,
      });
      showToast.success('Customer added successfully!');
      navigate('/dashboard');
    } catch (error) {
      showToast.error('Failed to add customer. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.heading}>Add New Customer</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            type="text"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long'
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Name can only contain letters and spaces'
              }
            })}
          />
          {errors.name && (
            <div className={styles.errorText}>{errors.name.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number:</label>
          <input
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^\+?[1-9]\d{9,11}$/,
                message: 'Please enter a valid phone number'
              }
            })}
          />
          {errors.phone && (
            <div className={styles.errorText}>{errors.phone.message}</div>
          )}
        </div>

        <button 
          className={styles.button} 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomerForm; 