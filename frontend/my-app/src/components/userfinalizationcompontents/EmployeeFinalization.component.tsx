import { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/User.service";
import { StyledInputWithLabel } from "../genericcomponents/StyledInput.component";

export default function EmployeeFinalization() {
    const navigate = useNavigate(); 
    let params = useParams();

    const [password, setPassword] = useState<string>("");

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setPassword(e.target.value)
        } else {
            setPassword("")
        }
    }

    const sendEmployeeData = (e: FormEvent) => {
        e.preventDefault()
        UserService.finalizeEmployee(params.tokenId!, password)
            .then(res => {
                navigate('../../kas/login');
            })
            .catch(e => {
                console.error(e);
            });
        
    }

    return(
        <div className="mx-auto flex flex-col py-4 items-center w-9/12 bg-main-1 rounded shadow">
            <form
                className="text-black py-4 px-4 w-full"
                onSubmit={sendEmployeeData}
                encType="multipart/form-data"
            >
                <div className="flex flex-row gap-x-8">
                    <StyledInputWithLabel id="password" type="password" inputMode="text" validateChange={handlePasswordChange} text="wachtwoord"/>
                </div>
                <input type="submit" value="Activeer account"
                    className="bg-main-accepted text-white px-8 py-1 rounded shadow w-full"
                />
            </form>
        </div>
    );
}