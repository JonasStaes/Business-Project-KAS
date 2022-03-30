import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { EmployeeRoutes, AuthRoutes, CustomerRoutes } from './components/Router';
import AuthService from './services/Auth.service';

export default function App() {
  
  if(AuthService.getCurrentUser() === null) {
    return(
      <Router>
        <AuthRoutes/>
      </Router>
    );
  } else if(AuthService.isCustomer()){
    return (
      <Router>
        <CustomerRoutes/>
      </Router>
    );
  } else  {
    return(
      <Router>
        <EmployeeRoutes/>
      </Router>
    );
  } 

} 

