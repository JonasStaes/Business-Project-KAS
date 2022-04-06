import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../../services/api/Admin.service";
import UserService from "../../../services/api/User.service";
import AlertToast from "../../genericcomponents/AlertToast.component";
import { StyledInputWithLabel } from "../../genericcomponents/StyledInput.component";

export default function NewCustomer() {
    const navigate = useNavigate(); 

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [companyNr, setCompanyNr] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setName(e.target.value);
      } else {
        setName("");
      }
    }

    function handleEmailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setEmail(e.target.value);
      } else {
        setEmail("");
      }
    }

    function handleCompanyNrChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setCompanyNr(parseInt(e.target.value.replace(/\D/, '')));
      } else {
        setCompanyNr(0);
      }
    }

    function submitCustomer() {
      if(name !== "" && email !== "") {
        AdminService.createCustomer(name, email, companyNr)
          .then(res => {
            console.info(res);
            UserService.requestUserFinalization(companyNr);
            navigate("../users");
          })
          .catch(e => {
            openErrorMessage(e.response.data.message);
          })
      }
    }

    const openErrorMessage = (message: string) => {
      setErrorMessage(message);
    }

    return(
        <div className="mx-auto max-w-md py-8">
          <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6">
            <div className="flex justify-between gap-8">
              <div className="w-full">
                <StyledInputWithLabel id="name" type="text" validateChange={handleNameInputChange} text="naam"/>
                <StyledInputWithLabel  id="email" type="email" validateChange={handleEmailInputChange} text="e-mail"/>
                <StyledInputWithLabel  id="ondernemingsnummer" type="text" validateChange={handleCompanyNrChange} text="ondernemingsnummer"/>
              </div>
            </div>
            <div className="w-full flex justify-between">
                <Link to="../users" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
                  <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                  Terug
                </Link>
                <button className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center"
                  onClick={submitCustomer}
                >
                  <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                  Volgende
                </button>
              </div>
        </div>
        <AlertToast error={errorMessage} setError={setErrorMessage}/>
      </div>
    );
}