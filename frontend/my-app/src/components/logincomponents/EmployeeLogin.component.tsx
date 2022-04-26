import { FormEvent, useState } from "react";
import { useLoginEmployeeMutation } from "../../redux/features/api/auth";
import { EmployeeLoginRequest } from "../../redux/features/api/types";
import { handleEmailChange, handlePasswordChange } from "../../services/frontend/Validator.service";
import { StyledLoginInput } from "../genericcomponents/StyledInputs.component";

export default function EmployeeLogin() {
    const [login] = useLoginEmployeeMutation();

    const [loginInfo, setLoginInfo] = useState<EmployeeLoginRequest>({
        email: { value: "", valid: true, errorValue: "" },
        password: { value: "", valid: true, errorValue: "" }
    })

    const loginAdmin = (e: FormEvent) => {
        e.preventDefault()
        login(loginInfo);
    }
    
    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8">
            <form  className="text-black flex flex-col py-4 items-center gap-y-2"
                onSubmit={loginAdmin}
            >
                <StyledLoginInput className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1 border-2 border-inherit"
                    id="email" 
                    text="e-mail"
                    type="email"
                    value={loginInfo.email}
                    validateChange={handleEmailChange} 
                    stateObjectSetter={setLoginInfo} 
                    stateObject={loginInfo}
                />
                <StyledLoginInput className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1 border-2 border-inherit"
                    id="password" 
                    text="wachtwoord"
                    type="password"
                    value={loginInfo.password}
                    validateChange={handlePasswordChange} 
                    stateObjectSetter={setLoginInfo} 
                    stateObject={loginInfo}
                />
                <input type="submit" value="Log in"
                    className="bg-main-0 text-white px-8 py-1 rounded shadow"
                />
            </form>
        </div>
    );
}
