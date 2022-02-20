import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { CustomerRoutes } from './components/Router';

export default function App() {
  
  return (
    <Router>
      <CustomerRoutes/>
    </Router>
  );
}

