import { useState } from "react";
import { ReactComponent as Logo } from '../../resources/logo.svg';
import CustomerLogin from "./CustomerLogin.component";
import EmployeeLogin from "./EmployeeLogin.component";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";

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
                    <span className="text-5xl font-bold mt-2">FBA</span>
                </div>
                <div className="mx-auto w-80">
                    <Switch checked={active} onChange={changeLoginType} className={[
                        (active ? 
                            "after:content-['Medewerker'] after:text-main-0 after:bg-white bg-main-0" 
                            : 
                            "after:content-['Klant'] after:text-white after:bg-main-0 bg-white after:translate-x-full"
                        ),
                        "text-center text-2xl w-full h-10 flex items-center flex-shrink-0 p-1 rounded-full ", 
                        "after:w-1/2 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300", 
                        
                    ].join(" ")}/>
                </div>
                {active ? <EmployeeLogin/> : <CustomerLogin/> }
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
