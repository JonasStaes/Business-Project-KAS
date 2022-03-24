import { Transition } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon, XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordService from "../../services/Password.service";
import UserService from "../../services/User.service";
import StyledInput from "../genericcomponents/StyledInput.component";

export default function NewCustomer() {
  const navigate = useNavigate(); 
 

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [companyNr, setCompanyNr] = useState<number>(0);

  const [timeOutID, setTimeOutID] = useState<number>(0);
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false);
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

    const closeErrorMessage = () => {
      setErrorMessageOpen(false)
      window.clearTimeout(timeOutID);
      setTimeOutID(0);
    }

    function submitUser() {
      if(name !== "" && email !== "") {
        UserService.createCustomer(name, email, companyNr)
          .then(res => {
            console.info(res);
            PasswordService.passwordChangeRequest(name, email)
            navigate("../users");
          })
          .catch(e => {
            setErrorMessage(e.response.data.message);
            setErrorMessageOpen(true);
            setTimeOutID(window.setTimeout(closeErrorMessage, 4000));
          })
      }
    }

    return(
        <div className="mx-auto max-w-md py-8">
          <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6">
            <div className="flex justify-between gap-8">
              <div className="w-full">
                <StyledInput id="name" inputType="text" validateChange={handleNameInputChange} text="naam"/>
                <StyledInput id="email" inputType="email" validateChange={handleEmailInputChange} text="e-mail"/>
                <StyledInput id="ondernemingsnummer" inputType="text" validateChange={handleCompanyNrChange} text="ondernemingsnummer"/>
              </div>
            </div>
            <div className="w-full flex justify-between">
                <Link to="../users" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
                  <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                  Terug
                </Link>
                <button className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center"
                  onClick={submitUser}
                >
                  <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                  Volgende
                </button>
              </div>
        </div>
        <Transition className="absolute inset-x-0 top-4 mx-auto max-w-lg"
          show={errorMessageOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div className="shadow rounded-lg bg-main-1">
            <button className="absolute top-0 right-0"
              onClick={closeErrorMessage}
            >
              <XIcon className="h-6 w-6"/>
            </button>
            <div className="p-2">
              <div className="flex justify-center">
                <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2 text-main-declined"/>
                {errorMessage}
              </div>
            </div>
            
            <Transition.Child
              enter="transform transition origin-left duration-[4000ms]"
              enterFrom="scale-x-100"
              enterTo="scale-x-0"
              leave="scale-x-0"
            >
              <div className="w-full h-2 bg-main-declined"/>
            </Transition.Child>
          </div>
        </Transition>
      </div>
    );
}