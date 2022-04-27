import { CheckIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerFinalizationDto } from "../../redux/features/api/types";
import { useFinalizeCustomerMutation } from "../../redux/features/api/user";
import { validateStateObject } from "../../services/frontend/StateObjectUpdater.service";
import { handleBirthDateChange, handleBirthplaceChange, handleHomeNumberChange, handlePasswordChange, handlePhoneNrChange, handlePostalCodeChange, handleSocialRegistryNrChange, handleStreetNameChange, handleTownShipChange } from "../../services/frontend/Validator.service";
import { StyledAppInput, StyledUnmaskableInput } from "../genericcomponents/StyledInputs.component";

export default function CustomerFinalization() {
    const params = useParams();
    const navigate = useNavigate(); 
    const [finalize] = useFinalizeCustomerMutation();

    const getEighteenYearsAgo = () => {
        let now = new Date();
        now.setFullYear(now.getFullYear() - 18)
        return now;
    }

    const convertDateToYMDString = (date: Date) => {
        return date.toISOString().split('T')[0];
    }

    const [finalizationData, setFinalizationData] = useState<CustomerFinalizationDto>({
        token: params.tokenId!,
        password: { value: "", valid: true, errorValue: "" },
        township: { value: "", valid: true, errorValue: "" },
        homeNumber: { value: 0, valid: true, errorValue: "" },
        streetName: { value: "", valid: true, errorValue: "" },
        postalCode: { value: 0, valid: true, errorValue: "" },
        birthplace: { value: "", valid: true, errorValue: "" },
        birthDate: { value: getEighteenYearsAgo(), valid: true, errorValue: "" },
        phoneNr: { value: 0, valid: true, errorValue: "" },
        socialRegistryNr: { value: 0, valid: true, errorValue: "" }
    });

    const sendCustomerData = (e: FormEvent) => {
        e.preventDefault()
        finalize({ 
            customerFinalizationDto: finalizationData, 
            callback: () => navigate("../login")
        });        
    }

    return(
        <div className="mx-auto flex flex-col py-4 items-center w-11/12 bg-main-1 rounded shadow">
            <form
                className="text-black p-4 w-full space-y-4"
                onSubmit={sendCustomerData}
            >
                <div className="flex flex-row gap-x-8">
                    <div className="grow space-y-4">
                        <StyledAppInput 
                            id={"township"} 
                            text={"gemeente"} 
                            type="text"
                            inputMode="text"
                            minLength={2}
                            pattern={"[a-zA-Z-]{2,}"}
                            inputValue={finalizationData.township}
                            validateChange={handleTownShipChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}
                        />
                        <StyledAppInput 
                            id={"homeNumber"} 
                            text={"huisnr."}
                            type="number"
                            min={1} 
                            inputValue={finalizationData.homeNumber}
                            validateChange={handleHomeNumberChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}                        
                        />
                        <StyledAppInput 
                            id={"streetName"} 
                            text={"straatnaam"} 
                            type="text"
                            minLength={2}
                            inputMode="text"
                            inputValue={finalizationData.streetName}
                            validateChange={handleStreetNameChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}                         
                        />
                        <StyledAppInput 
                            id={"postalCode"} 
                            text={"postcode"} 
                            type="number"
                            min={1000}
                            max={9999}
                            inputValue={finalizationData.postalCode}
                            validateChange={handlePostalCodeChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}                           
                        />
                    </div>
                    <div className="grow space-y-4">
                        <StyledAppInput 
                            id={"birthDate"} 
                            text={"geboortedatum"} 
                            type="date"
                            max={convertDateToYMDString(getEighteenYearsAgo())}
                            inputValue={finalizationData.birthDate}
                            validateChange={handleBirthDateChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}
                        />
                        <StyledAppInput 
                            id={"birthplace"} 
                            text={"geboorteplaats"} 
                            type="text"
                            minLength={2}
                            inputValue={finalizationData.birthplace}
                            validateChange={handleBirthplaceChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}                       
                        />
                        <StyledAppInput 
                            id={"phoneNr"} 
                            text={"telefoonnr."} 
                            type="tel"
                            inputMode="tel"
                            pattern="(?:\+\d{2}|\(?\d{3}\)?)\s?\d{2,3}\s?(?:\d{7}|(?:\d{2}\s?){2})"
                            inputValue={finalizationData.phoneNr}
                            validateChange={handlePhoneNrChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}
                        />
                        <StyledAppInput 
                            id={"socialRegistryNr"} 
                            text={"rijksregisternr."} 
                            type="text"
                            pattern="(?:\d{2}.?){3}-?\d{3}.?\d{2}"
                            inputValue={finalizationData.socialRegistryNr}
                            validateChange={handleSocialRegistryNrChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-x-8">
                    <div className="grow">
                        <StyledUnmaskableInput
                            id={"password"} 
                            text={"wachtwoord"} 
                            type="password"
                            inputValue={finalizationData.password}
                            validateChange={handlePasswordChange} 
                            stateObjectSetter={setFinalizationData} 
                            stateObject={finalizationData}  
                        />
                    </div>
                    <div className="grow pt-4">
                        <div>
                            <input className="hidden peer" id="submit" 
                                type="submit"
                                disabled={!validateStateObject(finalizationData)}
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