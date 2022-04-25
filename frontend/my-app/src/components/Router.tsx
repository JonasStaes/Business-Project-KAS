import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
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
import EmployeeHomeLinks, { EmployeeHome } from "./employeecomponents/EmployeeHome.component";
import AuthService from "../services/Auth.service";
import EmployeeFinalization from "./userfinalizationcompontents/EmployeeFinalization.component";
import RatingAgentOverview from "./employeecomponents/ratingagentcomponents/RatingAgentOverview.component";
import AuthenticatedHome from "./genericcomponents/HomeMenuAuthenticated.component";
import RateCreditRequest from "./employeecomponents/ratingagentcomponents/RatingAgentRateRequest.component";
import ComplianceOverview from "./employeecomponents/compliancecomponents/ComplianceOverview.component";


export function CustomerRoutes() {
    return (
        <Routes>
            <Route path="kas/customer" element={<AuthenticatedHome/>}>
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
            <Route path="kas/employee" element={<EmployeeHomeLinks/>}>
                <Route index element={<EmployeeHome/>}/>
                {AuthService.isAdmin() &&
                    <Route path="admin">
                        <Route index element={<Navigate replace to="/kas/employee/admin/users"/>}/>
                        <Route path ="users" element ={<AdminUsers/>}/>
                        <Route path ="new_customer" element ={<AdminNewCustomer/>}/>
                        <Route path ="new_employee" element ={<AdminNewEmployee/>}/>
                    </Route>
                }
                {AuthService.isRatingAgent() && 
                    <Route path="rating_agent">
                        <Route index element={<Navigate replace to="/kas/employee/rating_agent/credit_requests"/>}/>
                        <Route path="credit_requests" element={<RatingAgentOverview/>}/>
                        <Route path="credit_request/:Id" element={<RateCreditRequest/>}/>
                    </Route>
                }
                {AuthService.isCompliance() && 
                    <Route path="compliance">
                        <Route index element={<Navigate replace to="/kas/employee/compliance/suspicious_credit_requests"/>}/>
                        <Route path="suspicious_credit_requests" element={<ComplianceOverview/>}/>
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