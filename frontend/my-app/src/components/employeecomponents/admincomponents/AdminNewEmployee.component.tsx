import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateEmployeeMutation, useGetEmployeeRolesQuery } from "../../../redux/features/api/admin";
import { EmployeeCreateDto } from "../../../redux/features/api/types";
import { useRequestEmployeeFinalizationQuery } from "../../../redux/features/api/user";
import { validateStateObject } from "../../../services/frontend/StateObjectUpdater.service";
import { handleEmailChange, handleNameChange } from "../../../services/frontend/Validator.service";
import ChipMenu from "../../genericcomponents/ChipMenu.component";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { StyledAppInput } from "../../genericcomponents/StyledInputs.component";

export default function NewEmployee() {
  const navigate = useNavigate(); 
  const [skip, setSkip] = useState<boolean>(true);
  const { data: roles, isLoading } = useGetEmployeeRolesQuery();
  const [createEmployee, { data: employeeData }] = useCreateEmployeeMutation();
  useRequestEmployeeFinalizationQuery(employeeData === undefined ? "" : employeeData.id, { skip }) 

  const [employeeInfo, setEmployeeInfo] = useState<EmployeeCreateDto>({
    name: { value: "", valid: true, errorValue: ""},
    email: { value: "", valid: true, errorValue: ""},
    roles: { value: [], valid: true, errorValue: ""},
  })

  const submitEmployee = (e: FormEvent) => {
    e.preventDefault()
    createEmployee({ 
      employeeCreateDto: employeeInfo,
      callback: () => {
        setSkip(false);
        navigate("../users"); 
      }
    })
  }

  return(
    <div className="container w-full py-8">
      <form className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6 w-3/5 h-1/3 mx-auto"
        onSubmit={submitEmployee}
      >
        <div className="container flex flex-row gap-8">
          <div className="container space-y-4">
            <StyledAppInput id={"name"} text={"naam"} 
              type="text"
              value={employeeInfo.name} 
              validateChange={handleNameChange} 
              stateObjectSetter={setEmployeeInfo} 
              stateObject={employeeInfo}
              minLength={3}  
            />
            <StyledAppInput id={"email"} text={"e-mail"} 
              type="email"
              value={employeeInfo.email} 
              validateChange={handleEmailChange} 
              stateObjectSetter={setEmployeeInfo} 
              stateObject={employeeInfo}
            />
          </div>
          {(isLoading || roles === undefined) ? <LoadingSpinner/> : 
          <ChipMenu id={"roles"} 
            values={roles} 
            selectedValues={employeeInfo.roles.value} 
            stateObjectSetter={setEmployeeInfo} 
            stateObject={employeeInfo}
          />}
        </div>
        <div className="w-full flex justify-between">
          <Link to="../users" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
            <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
            Terug
          </Link>
          <div>
            <input className="hidden peer" id="submit" 
              type="submit"
              disabled={!validateStateObject(employeeInfo)}
            />
            <label className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center peer-disabled:bg-main-input"
              htmlFor="submit"
            >
              <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
              Volgende
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}