import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/User.service";

export default function NewUser() {
  const navigate = useNavigate(); 
 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  

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


    function submitUser() {
      if(name !== "" && email !== "") {     
        UserService.create(name, email, false)
          .then(res => {
            console.info(res);
            navigate("../users");
          })
          .catch(e => {
            console.error(e);
          })
      }
    }

    return(
        <div className="mx-auto max-w-7xl py-8">
            <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6">
                <div className="justify-between gap-8">
                  <div className="w-72">
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
                              type={"text"} 
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
              </div>
              <div className="w-full flex justify-between position-relative">
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
        </div>
        </div>
    );
}


  