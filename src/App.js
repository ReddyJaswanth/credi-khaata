import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import CustomerDetail from './components/CustomerDetail';
import Layout from './components/Layout';
import AddCustomerForm from './components/AddCustomerForm';
import { CustomerProvider } from './context/CustomerContext';

function App() {
  return (
    <CustomerProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer/:id" element={<CustomerDetail />} />
            <Route path="/add-customer" element={<AddCustomerForm />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </CustomerProvider>
  );
}

export default App;
