import { ReactComponent as Logo } from '../resources/logo.svg';
import { UserCircleIcon } from '@heroicons/react/solid';
import { Outlet } from "react-router-dom";
import '../App.css'

export default function AdminHome() {
    return(
        <div className='App'>
            <nav className="flex items-center justify-between flex-wrap bg-main-0 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Logo className="fill-current h-8 w-8 mr-2"/>
                    <span className="font-semibold text-3xl tracking-tight">Omega</span>
                </div>
                <div>
                    <UserCircleIcon className="h-8 w-8 rounded-full bg-transparent text-main-1"/>
                </div>
            </nav>
            <main className="bg-main-2 min-h-screen">
                <Outlet/>
            </main>
      </div>
    );
}