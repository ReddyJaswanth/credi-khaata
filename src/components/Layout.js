import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Toast from './Toast';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      <Toast />
    </>
  );
};

export default Layout; 