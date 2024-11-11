// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element ={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
          
        <Route path="/landing" element={
          <ProtectedRoute requiredRole={false}>
            <LandingPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole={true}>
            <AdminPage />
          </ProtectedRoute>
        } />


        </Routes>
    </Router>
  );
};

export default App;
