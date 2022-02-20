import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CustomerHome from "./CustomerHome.component";
import CustomerCreditRequests from "./CustomerCreditRequests.component";
import CustomerNewCreditRequest from "./CustomerNewCreditRequest.component";

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