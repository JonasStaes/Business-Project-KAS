import { FormEvent, useState } from "react";
import { useLoginCustomerMutation } from "../../redux/features/api/auth";
import { CustomerLoginRequest } from "../../redux/features/api/types";
import { handleCompanyNrChange, handlePasswordChange } from "../../services/frontend/Validator.service";
import { StyledLoginInput } from "../genericcomponents/StyledInputs.component";

export default function CustomerLogin() {
    const [login] = useLoginCustomerMutation();

    const [loginInfo, setLoginInfo] = useState<CustomerLoginRequest>({
        companyNr: { value: "", valid: true, errorValue: "" },
        password: { value: "", valid: true, errorValue: "" }
    })

    const loginCustomer = async (e: FormEvent) => {
        e.preventDefault()
        login(loginInfo);
    }
    
    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8">
            <form 
                className="text-white flex flex-col py-4 items-center gap-y-2"
                onSubmit={loginCustomer}
            >
                <StyledLoginInput className="bg-main-input rounded h-8 w-56 outline-none px-1 border-2 border-inherit"
                    id={"companyNr"} 
                    text={"ondernemingsnummer"} 
                    value={loginInfo.companyNr} 
                    type="text"
                    validateChange={handleCompanyNrChange} 
                    stateObjectSetter={setLoginInfo} 
                    stateObject={loginInfo}                
                />
                <StyledLoginInput className="bg-main-input rounded h-8 w-56 outline-none px-1 border-2 border-inherit"
                    id={"password"} 
                    text={"Wachtwoord"} 
                    type="password"
                    value={loginInfo.password} 
                    validateChange={handlePasswordChange} 
                    stateObjectSetter={setLoginInfo} 
                    stateObject={loginInfo}
                />
                <input type="submit" value="Log in"
                    className="bg-white text-black px-8 py-1 rounded shadow"
                    
                />
            </form>
        </div>
    );
}