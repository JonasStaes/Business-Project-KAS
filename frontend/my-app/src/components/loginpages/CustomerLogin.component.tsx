import { useState } from "react";
import AuthService from "../../services/Auth.service";

export default function CustomerLogin() {
    const [companyNr, setCompanyNr] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginCustomer = () => {
        AuthService.customerLogin(companyNr, password)
            .then(data => {
                console.log(data);
            })
    }
    
    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8">
            <div className="text-white flex flex-col py-4 items-center gap-y-2">
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="ondernemingsnummer">ondernemingsnummer</label>
                    <input 
                        type="text"
                        className="bg-main-input rounded h-8 w-56 outline-none px-1" 
                        id="ondernemingsnummer"
                        onChange={e => setCompanyNr(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="wachtwoord">Wachtwoord</label>
                    <input 
                        type="password" 
                        className="bg-main-input rounded h-8 w-56 outline-none px-1" 
                        id="wachtwoord"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button 
                className="bg-white text-black px-8 py-1 rounded shadow"
                onClick={loginCustomer}
                >
                Inloggen
            </button>
        </div>
    );
}