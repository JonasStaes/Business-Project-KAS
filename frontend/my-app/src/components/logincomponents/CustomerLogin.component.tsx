import { FormEvent, useState } from "react";
import AuthService from "../../services/Auth.service";

export default function CustomerLogin() {
    const [companyNr, setCompanyNr] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginCustomer = (e: FormEvent) => {
        e.preventDefault()
        AuthService.customerLogin(companyNr.replace(/\D/g, ''), password)
            .then(data => {
                console.log(data);
            })
    }
    
    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8">
            <form 
                className="text-white flex flex-col py-4 items-center gap-y-2"
                onSubmit={loginCustomer}
                encType="multipart/form-data"
            >
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
                <input type="submit" value="Log in"
                    className="bg-white text-black px-8 py-1 rounded shadow"
                />
            </form>
        </div>
    );
}