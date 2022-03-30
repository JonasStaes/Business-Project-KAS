import { FC } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/Auth.service';
import AuthenticatedHome from '../genericcomponents/HomeMenuAuthenticated.component';

const EmployeeHome: FC = ({}) => {
    return(
        <AuthenticatedHome>
            <div className="space-x-4">
                {AuthService.isAdmin() && <Link to="/kas/employee/admin" className="hover:bg-gray-400 hover:bg-opacity-80 rounded p-2">Admin</Link>}
                {AuthService.isRatingAgent() && <Link to="/kas/employee/rating_agent" className="hover:bg-gray-400 hover:bg-opacity-80 rounded p-2">Kredietbeoordelaar</Link>}
            </div>
        </AuthenticatedHome>
    );
}

export default EmployeeHome;