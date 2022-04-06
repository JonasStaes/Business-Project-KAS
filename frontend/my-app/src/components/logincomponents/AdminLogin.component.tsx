import { FormEvent, useState } from "react";
import AuthService from "../../services/api/Auth.service";

export default function AdminLogin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginAdmin = (e: FormEvent) => {
        e.preventDefault()
        AuthService.adminLogin(email, password)
            .then(data => {
                console.log(data);
            })
    }
    
    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8">
            <form  
                className="text-black flex flex-col py-4 items-center gap-y-2"
                onSubmit={loginAdmin}
                encType="multipart/form-data"
            >
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="e-mail">e-mail</label>
                    <input 
                        type="text"
                        className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                        id="e-mail"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="wachtwoord">Wachtwoord</label>
                    <input 
                        type="password"
                        className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                        id="wachtwoord"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Log in"
                    className="bg-main-0 text-white px-8 py-1 rounded shadow"
                />
            </form>
        </div>
    );
}