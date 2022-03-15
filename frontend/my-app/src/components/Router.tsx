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
import AdminNewUsers from "./admincomponents/AdminNewUser.component";
import Login from "./loginpages/Login.component";


export function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/kas/customer" element={<CustomerHome/>}>
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
            <Route path="/kas/admin" element={<AdminHome/>}>
                <Route index element={<Navigate replace to="/kas/admin/users"/>}/>
                <Route path ="users" element ={<AdminUsers/>}/>
                <Route path ="new_user" element ={<AdminNewUsers/>}/>
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/admin"/>}/>
        </Routes>
    );
}

export function AuthRoutes() {
    return(
        <Routes>
            <Route path="/kas/login" element={<Login/>}/>
            <Route path="*" element={<Navigate replace to="/kas/login"/>} />
        </Routes>
    );
}