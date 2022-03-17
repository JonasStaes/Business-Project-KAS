import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PasswordService from "../../services/Password.service";

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const navigate = useNavigate(); 
    let params = useParams();

    const checkIfValid = useCallback(() => {
        setValid(password == passwordCheck && password.trim().length > 0);
    }, [password, passwordCheck]);
  
    useEffect(() => {
        checkIfValid();
    }, [checkIfValid]);

    const changePassword = (e: FormEvent) => {
        e.preventDefault()
        PasswordService.changePassword(params.tokenId!, password)
            .then(res => {
                console.log(res.data.data);
                navigate('../../kas/login')
            })
            .catch(e => {
                console.error(e);
            });
        
    }

    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8">
            <form  
                className="text-black flex flex-col py-4 items-center gap-y-2"
                onSubmit={changePassword}
                encType="multipart/form-data"
            >
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="wachtwoord">Nieuw Wachtwoord</label>
                    <input 
                        type="password"
                        className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                        id="wachtwoord"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="wachtwoord_check">Confirmeer Nieuw Wachtwoord</label>
                    <input 
                        type="password"
                        className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                        id="wachtwoord_check"
                        onChange={e => setPasswordCheck(e.target.value)}
                    />
                </div>
                <input type="submit" value="Reset Wachtwoord"
                    className="bg-main-0 text-white px-8 py-1 rounded shadow disabled:bg-gray-400 disabled:opacity-50"
                    disabled={!valid}
                />
            </form>
        </div>
    );
}