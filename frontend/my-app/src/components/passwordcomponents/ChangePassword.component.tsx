import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useChangePasswordMutation } from "../../redux/features/api/password";
import { PasswordChangeDto } from "../../redux/features/api/types";
import { validateStateObject } from "../../services/frontend/StateObjectUpdater.service";
import { handlePasswordChange } from "../../services/frontend/Validator.service";
import { StyledUnmaskableInput } from "../genericcomponents/StyledInputs.component";

export default function ChangePassword() {

    const navigate = useNavigate(); 
    let params = useParams();
    const [changePassword] = useChangePasswordMutation()
    const [passwordChangeData, setPasswordChangeData] = useState<PasswordChangeDto>({
        token: params.tokenId!,
        password: { value: "", valid: true, errorValue: "" }
    }) 
  
    const submitNewPassword = (e: FormEvent) => {
        e.preventDefault()
        changePassword({
            passwordChangeDto: passwordChangeData,
            callback: () => navigate('../../kas/login')
        })
    }

    return(
        <div className="mx-auto flex flex-col py-4 items-center gap-y-8 bg-main-1 rounded shadow">
            <form  
                className="text-black flex flex-col py-4 items-center gap-y-2"
                onSubmit={submitNewPassword}
            >
                <StyledUnmaskableInput 
                    id={"password"} 
                    text={"wachtwoord"} 
                    inputValue={passwordChangeData.password} 
                    validateChange={handlePasswordChange} 
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