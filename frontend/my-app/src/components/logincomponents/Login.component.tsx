import { useState } from "react";
import { ReactComponent as Logo } from '../../resources/logo.svg';
import CustomerLogin from "./CustomerLogin.component";
import AdminLogin from "./AdminLogin.component";
import { Link } from "react-router-dom";

export default function Login() {
    const [active, setActive] = useState<boolean>(true);
    const changeLoginType = () => {
        setActive(!active)
    }


    return(
        <div className={[
                (active ? "bg-white" : "bg-main-0" ), 
                "w-screen h-screen overflow-auto text-white"
            ].join(" ")}>
            <div className="mx-auto py-4 space-y-2">
                <div className="mx-auto w-96 h-24 bg-main-0 rounded py-2 flex justify-center">
                    <Logo className="fill-current h-full w-auto align-middle"/>
                    <span className="text-5xl font-bold mt-2">Omega</span>
                </div>
                <div className="mx-auto w-80">
                    <input
                        id="switch"  
                        type="checkbox" 
                        className="absolute left-1/2 -translate-x-1/2 w-full h-8 peer appearance-none rounded-md"
                        onClick={changeLoginType} />
                    <label 
                        htmlFor="switch"
                        className={[
                            "after:content-['Medewerker'] after:text-main-0 after:bg-white bg-main-0",
                            "peer-checked:after:content-['Klant'] peer-checked:after:text-white peer-checked:after:bg-main-0 peer-checked:bg-white",
                            "text-center text-2xl",
                            "w-full h-10 flex items-center flex-shrink-0  p-1 rounded-full duration-300 ease-in-out", 
                            "after:w-1/2 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300", 
                            "peer-checked:after:translate-x-full group-hover:after:translate-x-1"
                        ].join(" ")}>
                        
                    </label>
                </div>
                {active ? <AdminLogin/> : <CustomerLogin/> }
                <div>
                    <Link to="/kas/change_password/request" className={[
                            (active ? "text-black" : "text-main-1"), 
                            "mx-auto rounded w-80 py-2 uppercase text-center flex justify-center"
                        ].join(" ")}>
                        Wachtwoord vergeten?
                    </Link>
                </div>
            </div>
        </div>
    );
    
}
