import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useRequestPasswordChangeMutation } from "../../redux/features/api/password";
import { PasswordChangeRequestDto } from "../../redux/features/api/types";
import { validateStateObject } from "../../services/frontend/StateObjectUpdater.service";
import { handleEmailChange, handleNameChange } from "../../services/frontend/Validator.service";
import { StyledLoginInput } from "../genericcomponents/StyledInputs.component";

export default function PasswordChangeRequest() {
    const navigate = useNavigate(); 
    const [requestPasswordChange] = useRequestPasswordChangeMutation();
    const [passwordChangeData, setPasswordChangeData] = useState<PasswordChangeRequestDto>({
        name: { value: "", valid: true, errorValue: "" },
        email: { value: "", valid: true, errorValue: "" }
    })
  
    const submitRequest = (e: FormEvent) => {
        e.preventDefault()
        requestPasswordChange({
            passwordChangeRequestDto: passwordChangeData,
            callback: () => navigate('../../kas/login')
        });
    }

    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8 bg-main-1 rounded shadow">
            <form  
                className="text-black flex flex-col py-4 items-center gap-y-2"
                onSubmit={submitRequest}
            >
                <StyledLoginInput className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                    id={"name"} 
                    text={"naam"} 
                    inputValue={passwordChangeData.name} 
                    validateChange={handleNameChange} 
                    stateObjectSetter={setPasswordChangeData} 
                    stateObject={passwordChangeData}
                />
                <StyledLoginInput
                    className="bg-gray-300 opacity-80 rounded h-8 w-56 outline-none px-1" 
                    id={"email"} 
                    text={"e-mail"} 
                    inputValue={passwordChangeData.email} 
                    validateChange={handleEmailChange} 
                    stateObjectSetter={setPasswordChangeData} 
                    stateObject={passwordChangeData}
                />
                <input type="submit" value="Reset Wachtwoord"
                    className="bg-main-0 text-white px-8 py-1 rounded shadow disabled:bg-gray-400 disabled:opacity-50"
                    disabled={!validateStateObject(passwordChangeData)}
                />
            </form>
        </div>
    );
}