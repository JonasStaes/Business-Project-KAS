import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { CustomerCreditRequests } from "./customercomponents/CustomerCreditRequests.component";
import { NewCreditRequest } from "./customercomponents/CustomerNewCreditRequest.component";
import AdminUsers from "./employeecomponents/admincomponents/AdminUsers.component";
import AdminNewCustomer from "./employeecomponents/admincomponents/AdminNewCustomer.component";
import AdminNewEmployee from "./employeecomponents/admincomponents/AdminNewEmployee.component"
import Login from "./logincomponents/Login.component";
import ChangePassword from "./passwordcomponents/ChangePassword.component";
import PasswordChangeRequest from "./passwordcomponents/PasswordChangeRequest.component";
import CustomerFinalization from "./userfinalizationcompontents/CustomerFinalization.component";
import UnauthenticatedHome from "./genericcomponents/HomeMenuUnauthenticated.component";
import EmployeeHomeLinks, { EmployeeHome } from "./employeecomponents/EmployeeHome.component";
import EmployeeFinalization from "./userfinalizationcompontents/EmployeeFinalization.component";
import RatingAgentOverview from "./employeecomponents/ratingagentcomponents/RatingAgentOverview.component";
import AuthenticatedHome from "./genericcomponents/HomeMenuAuthenticated.component";
import RateCreditRequest from "./employeecomponents/ratingagentcomponents/RatingAgentRateRequest.component";
import { ComplianceOverview } from "./employeecomponents/compliancecomponents/ComplianceOverview.component";
import CreditRequestDetailView from "./employeecomponents/compliancecomponents/ComplianceCreditRequestDetailView.component";
import CommercialDirectionOverview  from "./employeecomponents/commercialdirectioncomponents/CommercialDirectionOverview.component";
import CommercialDirectionBlacklist  from "./employeecomponents/commercialdirectioncomponents/CommercialDirectionBlacklist.component";
import CommercialDirectionAddWhiteList  from "./employeecomponents/commercialdirectioncomponents/CommercialDirectionAddWhiteList.component";
import CommercialDirectionAddBlackList  from "./employeecomponents/commercialdirectioncomponents/CommercialDirectionAddBlackList.component";
import OfficeWorkerOverview  from "./employeecomponents/officeworkercomponents/OfficeWorkerOverview.component";
import OfficeWorkerEditCreditRequest from "./employeecomponents/officeworkercomponents/OfficeWorkerEditCreditRequest.component";

import { useSelector } from "react-redux";
import { CreditRequestDetail } from "./customercomponents/CreditRequestDetailView.component";
import { selectIsAdmin, selectIsCommercialDirection, selectIsCompliance, selectIsOfficeWorker, selectIsRatingAgent } from "../redux/features/auth/authSlice";
import { OfficeWorkerNewCreditRequest } from "./employeecomponents/officeworkercomponents/OfficeWorkerNewCreditRequest.component";



export const CustomerRoutes = () => {

    return (
        <Routes>
            <Route path="kas/customer" element={<AuthenticatedHome/>}>
                <Route index element={<Navigate replace to="/kas/customer/credit_requests"/>}/>
                <Route path="credit_requests" element={<CustomerCreditRequests/>}/>
                <Route path="credit_request/:id" element={<CreditRequestDetail/>}/>
                <Route path="new_credit_request" element={<NewCreditRequest/>}/>
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/customer"/>} />
        </Routes>
    )
}

export const EmployeeRoutes = () => {
    const isAdmin = useSelector(selectIsAdmin);
    const isRatingAgent = useSelector(selectIsRatingAgent);
    const isCompliance = useSelector(selectIsCompliance);
    const isCommercialDirection = useSelector(selectIsCommercialDirection);
    const isOfficeWorker = useSelector(selectIsOfficeWorker);

    return(
        <Routes>
            <Route path="kas/employee" element={<EmployeeHomeLinks/>}>
                <Route index element={<EmployeeHome/>}/>
                {isAdmin && 
                    <Route path="admin">
                        <Route index element={<Navigate replace to="/kas/employee/admin/users"/>}/>
                        <Route path ="users" element ={<AdminUsers/>}/>
                        <Route path ="new_customer" element ={<AdminNewCustomer/>}/>
                        <Route path ="new_employee" element ={<AdminNewEmployee/>}/>
                    </Route>
                }
                {isRatingAgent && 
                    <Route path="rating_agent">
                        <Route index element={<Navigate replace to="/kas/employee/rating_agent/credit_requests"/>}/>
                        <Route path="credit_requests" element={<RatingAgentOverview/>}/>
                        <Route path="credit_request/:id" element={<RateCreditRequest/>}/>
                    </Route>
                }
                {isCompliance && 
                    <Route path="compliance">
                        <Route index element={<Navigate replace to="/kas/employee/compliance/suspicious_credit_requests"/>}/>
                        <Route path="suspicious_credit_requests" element={<ComplianceOverview/>}/>
                        <Route path="suspicious_credit_request/:id" element={<CreditRequestDetailView/>}/>
                    </Route>
                }
                {isCommercialDirection && 
                    <Route path="commercial_direction">
                        <Route index element={<Navigate replace to="/kas/employee/commercial_direction/whitelist"/>}/>
                        <Route path="whitelist" element={<CommercialDirectionOverview/>}/>
                        <Route path ="blacklist" element ={<CommercialDirectionBlacklist/>}/>
                        <Route path="new_whitelist_entry" element={<CommercialDirectionAddWhiteList/>}/>
                        <Route path="new_blacklist_entry" element={<CommercialDirectionAddBlackList/>}/>
                    </Route>
                }
                {isOfficeWorker && 
                    <Route path="office_worker">
                        <Route index element={<Navigate replace to="/kas/employee/office_worker/credit_requests"/>}/>
                        <Route path="credit_requests" element={<OfficeWorkerOverview/>}/>
                        <Route path="credit_request/:id" element={<OfficeWorkerEditCreditRequest/>}/>   
                        <Route path="new_credit_request" element={<OfficeWorkerNewCreditRequest/>}/>   

                    </Route>
                }
            </Route>
            <Route path="*" element={<Navigate replace to="/kas/employee"/>}/>
        </Routes>
    );
}

export const AuthRoutes = () => {
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
