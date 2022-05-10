import { ReactComponent as Logo } from '../../resources/logo.svg';
import { Outlet } from "react-router-dom";
import '../../App.css';
import { FC } from 'react';
import UserMenu from './UserMenu.component';

const AuthenticatedHome: FC = ({children}) => {
    return(
        <div className="h-screen overflow-hidden bg-main-2">
            <nav className="flex items-center justify-between flex-wrap bg-main-0 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Logo className="fill-current h-8 w-8 mr-2"/>
                    <span className="font-semibold text-3xl tracking-tight capitalize">Omega</span>
                </div>
                <div className="flex flex-row items-center">
                    <div className="text-lg font-medium capitalize text-main-1">
                        {children}
                    </div>
                    <div className='ml-8'>
                        <UserMenu/>
                    </div>
                </div>
            </nav>
            <main className="bg-main-2 h-screen">
                <Outlet/>
            </main>
      </div>
    );
}

export default AuthenticatedHome;