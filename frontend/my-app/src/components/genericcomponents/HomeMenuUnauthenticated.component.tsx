import { ReactComponent as Logo } from '../../resources/logo.svg';
import { Outlet } from "react-router-dom";
import '../../App.css';
import { FC } from 'react';

const UnauthenticatedHome: FC = ({}) => {
    return(
        <div className="bg-main-2 w-screen h-screen overflow-auto">
            <div className="mx-auto py-4 space-y-2">
                <div className="mx-auto w-96 h-24 bg-main-0 rounded py-2 flex justify-center text-white">
                    <Logo className="fill-current h-full w-auto align-middle"/>
                    <span className="text-5xl font-bold mt-2">Omega</span>
                </div>
                <main className="mx-auto w-6/12">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default UnauthenticatedHome;