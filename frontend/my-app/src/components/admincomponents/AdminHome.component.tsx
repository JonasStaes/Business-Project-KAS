import '../../App.css'
import AuthenticatedHome from '../genericcomponents/HomeMenuAuthenticated.component';
import UserMenu from '../genericcomponents/UserMenu.component';

export default function AdminHome() {
    return(
        <AuthenticatedHome>
            <UserMenu/>
        </AuthenticatedHome>
    );
}