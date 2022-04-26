import { CheckIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeFinalizationDto } from "../../redux/features/api/types";
import { useFinalizeEmployeeMutation } from "../../redux/features/api/user";
import { validateStateObject } from "../../services/frontend/StateObjectUpdater.service";
import { handlePasswordChange } from "../../services/frontend/Validator.service";
import { StyledUnmaskableInput } from "../genericcomponents/StyledInputs.component";

export default function EmployeeFinalization() {
    const navigate = useNavigate(); 
    let params = useParams();
    const [finalize] = useFinalizeEmployeeMutation();

    const [employeeInfo, setEmployeeInfo] = useState<EmployeeFinalizationDto>({
        token: params.tokenId!,
        password: { value: "", valid: true, errorValue: "" }
    })

    const sendEmployeeData = (e: FormEvent) => {
        e.preventDefault()
        finalize({
            employeeFinalizationDto: employeeInfo,
            callback: () => navigate("../login")
        })
    }

    return(
        <div className="mx-auto flex flex-col py-4 items-center w-11/12 bg-main-1 rounded shadow">
            <form className="text-black p-4 w-full space-y-4"
                onSubmit={sendEmployeeData}
            >
                <div className="flex flex-row gap-x-8 space-y-4">
                    <div className="grow-[1] pt-4">
                        <StyledUnmaskableInput 
                            id={"password"} 
                            text={"wachtwoord"} 
                            value={employeeInfo.password} 
                            validateChange={handlePasswordChange} 
                            stateObjectSetter={setEmployeeInfo} 
                            stateObject={employeeInfo}
                        />
                    </div>
                    <div className="grow-[1] pt-4">
                        <div>
                            <input className="hidden peer" id="submit" 
                                type="submit"
                                disabled={!validateStateObject(employeeInfo)}
                            />
                            <label className="bg-main-accepted text-main-1 shadow rounded w-full py-2 uppercase text-md flex justify-center peer-disabled:bg-main-input"
                                htmlFor="submit"
                            >
                                <CheckIcon className="fill-current h-7 w-7 mr-2"/>
                                Activeer account
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}