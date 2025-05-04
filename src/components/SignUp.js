import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from '../styles/common.module.css';
import ThemeToggle from './ThemeToggle';
import { showToast } from './Toast';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Check if user already exists
      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser && existingUser.email === data.email) {
        showToast.error('User already exists with this email');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      showToast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      showToast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.heading}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && (
            <div className={styles.errorText}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message: 'Password must contain at least one letter and one number'
              }
            })}
          />
          {errors.password && (
            <div className={styles.errorText}>{errors.password.message}</div>
          )}
        </div>
        <button 
          className={styles.button} 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className={styles.linkText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
      <ThemeToggle />
    </div>
  );
};

export default SignUp; 