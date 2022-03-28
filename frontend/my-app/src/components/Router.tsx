import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CustomerHome from "./customercomponents/CustomerHome.component";
import CustomerCreditRequests from "./customercomponents/CustomerCreditRequests.component";
import CustomerNewCreditRequest from "./customercomponents/CustomerNewCreditRequest.component";
import AdminUsers from "./employeecomponents/admincomponents/AdminUsers.component";
import AdminNewCustomer from "./employeecomponents/admincomponents/AdminNewCustomer.component";
import AdminNewEmployee from "./employeecomponents/admincomponents/AdminNewEmployee.component"
import Login from "./logincomponents/Login.component";
import ChangePassword from "./passwordcomponents/ChangePassword.component";
import PasswordChangeRequest from "./passwordcomponents/PasswordChangeRequest.component";
import CustomerFinalization from "./userfinalizationcompontents/CustomerFinalization.component";
import UnauthenticatedHome from "./genericcomponents/HomeMenuUnauthenticated.component";
import EmployeeHome from "./employeecomponents/EmployeeHome.component";
import AuthService from "../services/Auth.service";
import EmployeeFinalization from "./userfinalizationcompontents/EmployeeFinalization.component";


export function CustomerRoutes() {
    return (
        <Routes>
            <Route path="kas/customer" element={<CustomerHome/>}>
                <Route index element={<Navigate replace to="/kas/customer/credit_requests"/>}/>
                <Route path="credit_requests" element={<CustomerCreditRequests/>}/>
                <Route path="new_credit_request" element={<CustomerNewCreditRequest/>}/>
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/customer"/>} />
        </Routes>
    )
}

export function EmployeeRoutes() {
    return(
        <Routes>
            <Route path="kas/employee" element={<EmployeeHome/>}>
                {AuthService.isAdmin() &&
                    <Route path="admin">
                        <Route index element={<Navigate replace to="/kas/employee/admin/users"/>}/>
                        <Route path ="users" element ={<AdminUsers/>}/>
                        <Route path ="new_customer" element ={<AdminNewCustomer/>}/>
                        <Route path ="new_employee" element ={<AdminNewEmployee/>}/>
                    </Route>
                }
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/employee"/>}/>
        </Routes>
    );
}

export function AuthRoutes() {
    return(
        <Routes>
            <Route path="kas/login" element={<Login/>}/>
            <Route path="kas/change_password" element={<UnauthenticatedHome/>}>
                <Route index element={<Navigate replace to="/kas/change_password/request"/>}/>
                <Route path=":tokenId" element={<ChangePassword/>}/>
                <Route path="request" element={<PasswordChangeRequest/>}/>
            </Route>
            <Route path="kas/finalize_account" element={<UnauthenticatedHome/>}>
                <Route index element={<Navigate replace to="/kas/finalize_account"/>}/>
                <Route path="customer/:tokenId" element={<CustomerFinalization/>}/>
                <Route path="employee/:tokenId" element={<EmployeeFinalization/>}/>
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/login"/>} />
        </Routes>
    );
}