import { FC } from 'react';
import AuthenticatedHome from '../genericcomponents/HomeMenuAuthenticated.component';
import UserMenu from '../genericcomponents/UserMenu.component';

const EmployeeHome: FC = ({}) => {
    return(
        <AuthenticatedHome>
            <UserMenu/>
        </AuthenticatedHome>
    );
}

export default EmployeeHome;