import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAdmin, selectIsCommercialDirection, selectIsCompliance, selectIsRatingAgent } from '../../redux/features/auth/authSlice';
import AuthenticatedHome from '../genericcomponents/HomeMenuAuthenticated.component';

const EmployeeHomeLinks: FC = () => {
    const isAdmin = useSelector(selectIsAdmin);
    const isRatingAgent = useSelector(selectIsRatingAgent);
    const isCompliance = useSelector(selectIsCompliance);

    return(
        <AuthenticatedHome>
            <div className="space-x-4">
                {isAdmin && <Link to="/kas/employee/admin" className="hover:bg-gray-400 hover:bg-opacity-80 rounded p-2">Admin</Link>}
                {isRatingAgent && <Link to="/kas/employee/rating_agent" className="hover:bg-gray-400 hover:bg-opacity-80 rounded p-2">Kredietbeoordelaar</Link>}
                {isCompliance && <Link to="/kas/employee/compliance" className="hover:bg-gray-400 hover:bg-opacity-80 rounded p-2">Compliance medewerker</Link>}
            </div>
        </AuthenticatedHome>
    );
}

export default EmployeeHomeLinks;

export const EmployeeHome: FC = () => {
    const isAdmin = useSelector(selectIsAdmin);
    const isRatingAgent = useSelector(selectIsRatingAgent);
    const isCompliance = useSelector(selectIsCompliance);
    const isCommercialDirection = useSelector(selectIsCommercialDirection);

    return(
        <div className="p-8 flex flex-row gap-8 justify-between">
            {isAdmin && 
            <div className="grow bg-main-1 rounded shadow p-2 flex flex-col">
                <div className="text-center text-lg capitalize underline">admin</div>
                <Link className="bg-main-accepted text-white px-8 py-1 rounded shadow mx-auto" 
                    to="./admin/users"
                >
                    Open Dashboard
                </Link>
            </div>}
            {isRatingAgent && 
            <div className="grow bg-main-1 rounded shadow p-2 flex flex-col">
                <div className="text-center text-lg capitalize underline">Kredietbeoordelaar</div>
                <Link className="bg-main-accepted text-white px-8 py-1 rounded shadow mx-auto"
                    to="./rating_agent/credit_requests"
                >
                    Open Dashboard
                </Link>
            </div>}
            {isCompliance && 
            <div className="grow bg-main-1 rounded shadow p-2 flex flex-col">       
                <div className="text-center text-lg capitalize underline">compliance</div>
                <Link className="bg-gray-400 opacity-80 text-white px-8 py-1 rounded shadow mx-auto"
                    to="./compliance/suspicious_credit_requests"
                >
                    Open Dashboard
                </Link>
            </div>}
            {isCommercialDirection && 
            <div className="grow bg-main-1 rounded shadow p-2 flex flex-col">
                <div className="text-center text-lg capitalize underline">commerciële directie</div>
                <Link className="bg-gray-400 opacity-80 text-white px-8 py-1 rounded shadow mx-auto"
                    to=""
                >
                    Open Dashboard
                </Link>
            </div>}
        </div>
    );
}
