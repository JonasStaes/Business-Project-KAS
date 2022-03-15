import { ReactComponent as Logo } from '../../resources/logo.svg';
import { UserCircleIcon } from '@heroicons/react/solid';
import { Outlet } from "react-router-dom";
import '../../App.css'
import { Menu } from '@headlessui/react';
import AuthService from '../../services/Auth.service';

export default function CustomerHome() {
    return(
        <div className='App'>
            <nav className="flex items-center justify-between flex-wrap bg-main-0 p-6 z-0 static">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Logo className="fill-current h-8 w-8 mr-2"/>
                    <span className="font-semibold text-3xl tracking-tight">Omega</span>
                </div>
                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button>
                            <UserCircleIcon className="h-8 w-8 rounded-full bg-transparent text-main-1"/>
                        </Menu.Button>
                        <Menu.Items className="z-10 absolute right-0 shadow rounded bg-white py-2 px-4">
                            <Menu.Item as="button" onClick={AuthService.logout}>
                                Logout
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </nav>
            <main className="bg-main-2 min-h-screen">
                <Outlet/>
            </main>
      </div>
    );
}