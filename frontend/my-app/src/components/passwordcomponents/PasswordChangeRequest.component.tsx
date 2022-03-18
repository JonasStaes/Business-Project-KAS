import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PasswordService from "../../services/Password.service";

export default function PasswordChangeRequest() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const navigate = useNavigate(); 

    const validate = (name: string, email: string) => {
        return {
            name: name.trim().length > 0,
            email: email.toLowerCase().match(
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                )
        };
    }

    const checkIfValid = useCallback(() => {
        const validFields = validate(name, email);
        const noErrors = Object.keys(validFields).every(x => validFields[x as keyof Object])
        setValid(noErrors);
    }, [email, name]);
  
    useEffect(() => {
        checkIfValid();
    }, [checkIfValid]);

    const requestPasswordChange = (e: FormEvent) => {
        e.preventDefault()
        PasswordService.passwordChangeRequest(name, email)
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
                onSubmit={requestPasswordChange}
                encType="multipart/form-data"
            >
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="naam">Naam</label>
                    <input 
                        type="text"
                        className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                        id="naam"
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col py-4 space-y-4 items-center">
                    <label className="uppercase text-2xl text-center" htmlFor="email">E-mail</label>
                    <input 
                        type="email"
                        className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                        id="email"
                        onChange={e => setEmail(e.target.value)}
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