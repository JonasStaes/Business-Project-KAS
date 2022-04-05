import { Transition } from "@headlessui/react";
import { ArrowCircleLeftIcon, CheckCircleIcon, ExclamationCircleIcon, PlusCircleIcon, XIcon } from "@heroicons/react/solid";
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminService from "../../../services/Admin.service";
import UserService from "../../../services/User.service";
import { StyledInputWithLabel } from "../../genericcomponents/StyledInput.component";

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
      AdminService.getEmployeeRoles()
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
      console.log(selectedValues)
    }, [selectedValues, getRoles]);

    function submitEmployee() {
      if(name !== "" && email !== "" && selectedValues.length > 0) {
        AdminService.createEmployee(name, email, selectedValues)
          .then(res => {
            console.info(res);
            UserService.requestEmployeeFinalization(email);
            navigate("../users");
          })
          .catch(e => {
            console.error(e);
          })
      }
    }

    const cleanUpRole = (role: string) => {
      return role.toLowerCase().replaceAll(/_/g, " ")
    }

    const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;

      if(checked) {
        setSelectedValues([...selectedValues, value])
      } else {
        setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value))
      }
    } 

    return(
      <div className="container w-full py-8">
        <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6 w-3/5 h-1/3 mx-auto">
          <div className="container flex flex-row gap-8">
              <div className="container">
                <StyledInputWithLabel id="name" type="text" validateChange={handleNameInputChange} text="naam"/>
                <StyledInputWithLabel id="email" type="email" validateChange={handleEmailInputChange} text="e-mail"/>
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                {roles.map(role => (
                  <div key={role}>
                    <input type="checkbox" id={role} value={role} className="peer hidden w-full" onChange={handleCheckChange}/>  
                    <label htmlFor={role} className={[ 
                      "peer-checked:bg-main-0 peer-checked:fill-current peer-checked:text-main-1",
                      "bg-gray-400 fill-gray-400 text-black",
                      "px-4 py-2 rounded-3xl border-2 border-main-0",
                      "flex flex-row items-center capitalize "
                      ].join(" ")}
                    >
                      <CheckCircleIcon className="h-7 w-7 mr-2 fill-inherit"/>
                      {cleanUpRole(role)}
                    </label>
                  </div>
                ))}
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