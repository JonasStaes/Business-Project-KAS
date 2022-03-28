import { number } from "prop-types";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/User.service";
import { StyledInput, StyledInputWithLabel } from "../genericcomponents/StyledInput.component";

export default function CustomerFinalization() {
    const navigate = useNavigate(); 
    let params = useParams();

    const [password, setPassword] = useState<string>("");

    const [township, setTownship] = useState<string>("");

    const [homeNumber, setHomeNumber] = useState<number>(0);
    const [homeNumberValid, setHomeNumbervalid] = useState<boolean>(true);

    const [streetName, setStreetName] = useState<string>("");

    const [postalCode, setPostalCode] = useState<number>(0);

    const [birthplace, setBirthplace] = useState<string>("");

    //const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [birthDate, setBirthDate] = useState<Date>(new Date());

    const [phoneNr, setPhoneNr] = useState<number>(0);

    const [socialRegistryNr, setSocialRegistryNr] = useState<number>(0);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setPassword(e.target.value)
        } else {
            setPassword("")
        }
    }

    const handleTownShipChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setTownship(e.target.value)
        } else {
            setTownship("")
        }
    }

    const handleHomeNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setHomeNumber(parseInt(e.target.value));
            setHomeNumbervalid(true);
        } else {
            setHomeNumber(0);
            setHomeNumbervalid(false);
        }
    }

    const handleStreetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setStreetName(e.target.value);
        } else {
            setStreetName("");
        }
    }

    const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setPostalCode(parseInt(e.target.value));
        } else {
            setPostalCode(0);
        }
    }

    const handleBirthplaceChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setBirthplace(e.target.value);
        } else {
            setBirthplace("");
        }
    }

    const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setBirthDate(new Date(e.target.value));
        } else {
            setBirthDate(new Date());
        }
    }

    const handlePhoneNrChange  = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setPhoneNr(parseInt(e.target.value));
        } else {
            setPhoneNr(0);
        }
    }

    const handleSocialRegistryNrChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setSocialRegistryNr(parseInt(e.target.value));
        } else {
            setSocialRegistryNr(0);
        }
    }

    const sendCustomerData = (e: FormEvent) => {
        e.preventDefault()
        UserService.finalizeCustomer(params.tokenId!, password, township, homeNumber, streetName, postalCode, birthplace, birthDate.toISOString().substring(0,10), phoneNr, socialRegistryNr)
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
                onSubmit={sendCustomerData}
                encType="multipart/form-data"
            >
                <div className="flex flex-row gap-x-8">
                    <div>
                        <StyledInputWithLabel id="password" type="password" inputMode="text" validateChange={handlePasswordChange} text="wachtwoord"/>
                        <StyledInputWithLabel id="township" type="text" inputMode="text" validateChange={handleTownShipChange} text="gemeente"/>
                        <StyledInputWithLabel id="homenumber" type="number" inputMode="numeric" validateChange={handleHomeNumberChange} text="huisnummer"/>
                        <StyledInputWithLabel id="streetname" type="text" inputMode="text" validateChange={handleStreetNameChange} text="straatnaam"/>
                        <StyledInputWithLabel id="postalcode" type="number" inputMode="numeric" validateChange={handlePostalCodeChange} text="postcode"/>
                    </div>
                    <div>
                        <StyledInputWithLabel id="birthplace" type="string" inputMode="text" validateChange={handleBirthplaceChange} text="geboorteplaats"/>
                        <StyledInput id="birthdate" type="date" inputMode="numeric" validateChange={handleBirthDateChange}>
                            <label className="before:content-['geboortedatum'] uppercase text-xs absolute -top-4"/>
                        </StyledInput>
                        <StyledInputWithLabel id="phonenr" type="tel" inputMode="tel" validateChange={handlePhoneNrChange} text="telefoonnr"/>
                        <StyledInputWithLabel id="socialregistrynr" type="number" inputMode="numeric" validateChange={handleSocialRegistryNrChange} text="rijksregisternr"/>
                    </div>
                </div>
                <input type="submit" value="Activeer account"
                    className="bg-main-accepted text-white px-8 py-1 rounded shadow w-full"
                />
            </form>
        </div>
    );
}