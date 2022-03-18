import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { AdminRoutes, AuthRoutes, CustomerRoutes } from './components/Router';
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
  } else if(AuthService.isAdmin()) {
    return(
      <Router>
        <AdminRoutes/>
      </Router>
    );
  } else {
    return(
      <div>something went horribly wrong</div>
    );
  }

} 

