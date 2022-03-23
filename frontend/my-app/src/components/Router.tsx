import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CustomerHome from "./customercomponents/CustomerHome.component";
import CustomerCreditRequests from "./customercomponents/CustomerCreditRequests.component";
import CustomerNewCreditRequest from "./customercomponents/CustomerNewCreditRequest.component";
import AdminHome from "./admincomponents/AdminHome.component";
import AdminUsers from "./admincomponents/AdminUsers.component";
import AdminNewCustomer from "./admincomponents/AdminNewCustomer.component";
import Login from "./logincomponents/Login.component";
import PasswordHome from "./passwordcomponents/PasswordHome.component";
import ChangePassword from "./passwordcomponents/ChangePassword.component";
import PasswordChangeRequest from "./passwordcomponents/PasswordChangeRequest.component";


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

export function AdminRoutes() {
    return(
        <Routes>
            <Route path="kas/admin" element={<AdminHome/>}>
                <Route index element={<Navigate replace to="/kas/admin/users"/>}/>
                <Route path ="users" element ={<AdminUsers/>}/>
                <Route path ="new_customer" element ={<AdminNewCustomer/>}/>
                {/*<Route path ="new_employee" element ={<AdminNewUsers/>}/>*/}
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/admin"/>}/>
        </Routes>
    );
}

export function AuthRoutes() {
    return(
        <Routes>
            <Route path="kas/login" element={<Login/>}/>
            <Route path="kas/change_password" element={<PasswordHome/>}>
                <Route index element={<Navigate replace to="/kas/change_password/request"/>}/>
                <Route path=":tokenId" element={<ChangePassword/>}/>
                <Route path="request" element={<PasswordChangeRequest/>}/>
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/login"/>} />
        </Routes>
    );
}