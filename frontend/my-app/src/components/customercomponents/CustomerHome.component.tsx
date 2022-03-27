import '../../App.css'
import { FC } from 'react';
import AuthenticatedHome from '../genericcomponents/HomeMenuAuthenticated.component';
import UserMenu from '../genericcomponents/UserMenu.component';

const CustomerHome: FC = ({}) => {
    return(
        <AuthenticatedHome>
            <UserMenu/>
        </AuthenticatedHome>
    );
}

export default CustomerHome;