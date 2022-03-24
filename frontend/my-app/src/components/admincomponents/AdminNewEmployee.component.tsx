import { Listbox, Transition } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon, XIcon } from "@heroicons/react/solid";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/User.service";
import MultipleSelect from "../genericcomponents/MultipleSelect.component";
import StyledInput from "../genericcomponents/StyledInput.component";

export default function NewEmployee() {
    const navigate = useNavigate(); 
    const [roles, setRoles] = useState<Array<string>>([]);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [selectedValues, setSelectedValues] = useState<Array<string>>([]);

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

    const getRoles = useCallback(() => {
      UserService.getAllRoles()
        .then(res => {
          console.log(res.data)
          setRoles(res.data.data)
        })
        .catch(e => {
          console.error(e)
        })
    }, []) 

    useEffect(() => {
      getRoles();
    }, [getRoles]);

    function submitEmployee() {
      if(name !== "" && email !== "" && selectedValues.length > 0) {
        UserService.createEmployee(name, email, selectedValues)
          .then(res => {
            console.info(res);
            //PasswordService.passwordChangeRequest(name, email)
            navigate("../users");
          })
          .catch(e => {
            console.error(e);
          })
      }
    }

    return(
      <div className="mx-auto max-w-3xl py-8">
        <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6">
          <div className="flex justify-between gap-8">
            <div className="w-full flex flex-row justify-between">
              <div>
                <StyledInput id="name" inputType="text" validateChange={handleNameInputChange} text="naam"/>
                <StyledInput id="email" inputType="email" validateChange={handleEmailInputChange} text="e-mail"/>
              </div>
              <div className="w-80">
                <MultipleSelect inputValues={roles} selectedValues={selectedValues} setSelectedValues={setSelectedValues}/>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
              <Link to="../users" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
                <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                Terug
              </Link>
              <button className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center"
                onClick={submitEmployee}
              >
                <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                Volgende
              </button>
          </div>
      </div>
      <Transition className="absolute inset-x-0 top-4 mx-auto max-w-lg"
        show={false}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <div className="shadow rounded-lg bg-main-1">
          <button className="absolute top-0 right-0"
            
          >
            <XIcon className="h-6 w-6"/>
          </button>
          <div className="p-2">
            <div className="flex justify-center">
              <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2 text-main-declined"/>
              
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