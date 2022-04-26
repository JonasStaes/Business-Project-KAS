import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { EmployeeRoutes, AuthRoutes, CustomerRoutes } from './components/Router';
import AlertToast from './components/genericcomponents/AlertToast.component';
import { selectCurrentToken, selectIsCustomer } from './redux/features/auth/authSlice';
import { useSelector } from 'react-redux';

export default function App() {

  const currentUserToken = useSelector(selectCurrentToken);
  const isCustomer = useSelector(selectIsCustomer);
  
  let content = undefined;
  if(currentUserToken === null) {
    content = (
      <Router>
        <AuthRoutes/>
      </Router>
    );
  } else if(isCustomer){
    content = (
      <Router>
        <CustomerRoutes/>
      </Router>
    );
  } else  {
    content = (
      <Router>
        <EmployeeRoutes/>
      </Router>
    );
  } 
  
  return(
    <div className="App">
      {content}
      <AlertToast/>
    </div>
  );
} 

