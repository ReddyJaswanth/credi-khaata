import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from '../styles/common.module.css';
import ThemeToggle from './ThemeToggle';
import { showToast } from './Toast';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === data.email && user.password === data.password) {
        localStorage.setItem('auth', JSON.stringify({ email: data.email }));
        showToast.success('Login successful!');
        navigate('/dashboard');
      } else {
        showToast.error('Invalid credentials');
      }
    } catch (error) {
      showToast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.heading}>Login</h2>
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
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <p className={styles.linkText}>
          New to CrediKhaata?{' '}
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
      <ThemeToggle />
    </div>
  );
};

export default Login; 