import { ReactComponent as Logo } from '../../resources/logo.svg';
import { Outlet } from "react-router-dom";
import '../../App.css';
import { FC } from 'react';

const AuthenticatedHome: FC = ({children}) => {
    return(
        <div className='App'>
            <nav className="flex items-center justify-between flex-wrap bg-main-0 p-6 z-0">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Logo className="fill-current h-8 w-8 mr-2"/>
                    <span className="font-semibold text-3xl tracking-tight">Omega</span>
                </div>
                <div>
                    {children}
                </div>
            </nav>
            <main className="bg-main-2 min-h-screen">
                <Outlet/>
            </main>
      </div>
    );
}

export default AuthenticatedHome;