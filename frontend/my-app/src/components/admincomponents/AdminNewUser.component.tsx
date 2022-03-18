import { Transition } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordService from "../../services/Password.service";
import UserService from "../../services/User.service";

export default function NewUser() {
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
        UserService.create(name, email, companyNr, false)
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
                <div className="pb-4">
                  <div className="relative group">
                    <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer" 
                      id="name_input"
                      type={"text"} 
                      required
                      onChange={handleNameInputChange}
                    />
                    <label className={[
                      "text-2xl uppercase",
                      "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                      "group-focus-within:text-xs peer-valid:text-xs",
                      "group-focus-within:h-1/2 peer-valid:h-1/2",
                      "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                      "group-focus-within:pl-0 peer-valid:pl-0"
                    ].join(" ")}
                      htmlFor="name_input" 
                    >
                      NAAM
                    </label>
                  </div>
                </div>
                <div className="pb-4">
                  <div className="relative group">
                    <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"
                      id="requested_amount_input" 
                      type={"email"} 
                      required
                      onChange={handleEmailInputChange}
                    />
                    <label className={[
                      "text-2xl uppercase",
                      "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                      "group-focus-within:text-xs peer-valid:text-xs",
                      "group-focus-within:h-1/2 peer-valid:h-1/2",
                      "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                      "group-focus-within:pl-0 peer-valid:pl-0"
                    ].join(" ")}
                      htmlFor="email_input"
                    >
                      E-MAIL
                    </label>
                  </div>
                </div>
                <div className="pb-4">
                  <div className="relative group">
                    <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"
                      id="ondernemingsnummer" 
                      type={"text"} 
                      required
                      onChange={handleCompanyNrChange}
                    />
                    <label className={[
                      "text-2xl uppercase",
                      "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                      "group-focus-within:text-xs peer-valid:text-xs",
                      "group-focus-within:h-1/2 peer-valid:h-1/2",
                      "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                      "group-focus-within:pl-0 peer-valid:pl-0"
                    ].join(" ")}
                      htmlFor="ondernemingsnummer"
                    >
                      ondernemingsnummer
                    </label>
                  </div>
                </div>
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
        <Transition 
          show={errorMessageOpen}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="shadow rounded-lg absolute inset-x-0 top-0 mt-4 bg-main-1 mx-auto max-w-lg p-2 flex justify-center">
            <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2 text-main-declined"/>
            {errorMessage}
          </div>
        </Transition>
      </div>
    );
}


  