import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from '../../resources/logo.svg';

export default function PasswordHome() {
    return(
        <div className="bg-white w-screen h-screen overflow-auto text-white">
            <div className="mx-auto py-4 space-y-2">
                <div className="mx-auto w-96 h-24 bg-main-0 rounded py-2 flex justify-center">
                    <Logo className="fill-current h-full w-auto align-middle"/>
                    <span className="text-5xl font-bold mt-2">Omega</span>
                </div>
                <main className="mx-auto w-80">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}