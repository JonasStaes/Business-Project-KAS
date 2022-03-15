import { useState } from "react";
import { ReactComponent as Logo } from '../../resources/logo.svg';
import AuthService from "../../services/Auth.service";
import CustomerLogin from "./CustomerLogin.component";
import AdminLogin from "./AdminLogin.component";

export default function Login() {
    const [active, setActive] = useState<boolean>(true);
    const [principal, setPrincipal] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const changeLoginType = () => {
        setActive(!active)
    }

    const login = () => {
        AuthService.customerLogin(principal, password)
            .then(data => {
                console.log(data);
            })
    }

    return(
        <div className={[
                (active ? "bg-white" : "bg-main-0"), 
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
            </div>
        </div>
    );
    
}
