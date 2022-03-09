import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CustomerHome from "./CustomerHome.component";
import CustomerCreditRequests from "./CustomerCreditRequests.component";
import CustomerNewCreditRequest from "./CustomerNewCreditRequest.component";
import AdminHome from "./AdminHome.component";
import AdminUsers from "./AdminUsers.component";
import AdminNewUsers from "./AdminNewUser.component";


export function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/kas/customer" element={<CustomerHome/>}>
                <Route index element={<Navigate replace to="/kas/customer/credit_requests"/>}/>
                <Route path="credit_requests" element={<CustomerCreditRequests/>}/>
                <Route path="new_credit_request" element={<CustomerNewCreditRequest/>}/>
            </Route>
            <Route path="/kas/admin" element={<AdminHome/>}>
                <Route index element={<Navigate replace to="/kas/admin/users"/>}/>
                <Route path ="users" element ={<AdminUsers/>}/>
                <Route path ="new_user" element ={<AdminNewUsers/>}/>
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/customer"/>} />
        </Routes>
    )
}