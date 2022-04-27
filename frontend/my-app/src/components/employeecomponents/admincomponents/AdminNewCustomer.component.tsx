import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateCustomerMutation, useGetCustomerRolesQuery } from "../../../redux/features/api/admin";
import { CustomerCreateDto } from "../../../redux/features/api/types";
import { useRequestCustomerFinalizationQuery } from "../../../redux/features/api/user";
import { validateStateObject } from "../../../services/frontend/StateObjectUpdater.service";
import { handleCompanyNrChange, handleEmailChange, handleNameChange } from "../../../services/frontend/Validator.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { StyledAppInput, StyledRadioGroup } from "../../genericcomponents/StyledInputs.component";

export default function NewCustomer() {
  const navigate = useNavigate(); 
  const [skip, setSkip] = useState<boolean>(true);
  const { data: roles, isLoading } = useGetCustomerRolesQuery();
  const [createCustomer, { data: customerData }] = useCreateCustomerMutation();
  useRequestCustomerFinalizationQuery(customerData === undefined ? "" : customerData.id, { skip });

  const [customerInfo, setCustomerInfo] = useState<CustomerCreateDto>({
    name: { value: "", valid: true, errorValue: ""},
    email: { value: "", valid: true, errorValue: ""},
    companyNr: { value: "", valid: true, errorValue: ""},
    role: { value: "", valid: true, errorValue: ""}
  })

  const submitNewCustomer = (e: FormEvent) => {
    e.preventDefault();
    createCustomer({
      customerCreateDto: customerInfo, 
      callback: () => {
        setSkip(false);
        navigate("../users");
      }
    })
  }

  return(
    <div className="mx-auto w-full py-8">
      <form className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6 w-3/5 h-1/3 mx-auto"
        onSubmit={submitNewCustomer}
      >
        <div className="container flex flex-row gap-8">
          <div className="container space-y-1">
            <StyledAppInput id="name" type="text" text="naam" 
              inputValue={customerInfo.name}
              validateChange={handleNameChange}
              stateObjectSetter={setCustomerInfo}    
              stateObject={customerInfo}        
              minLength={3}    
            />
            <StyledAppInput id="email" type="email" text="e-mail" 
              inputValue={customerInfo.email}
              validateChange={handleEmailChange} 
              stateObjectSetter={setCustomerInfo} 
              stateObject={customerInfo}                
            />
            <StyledAppInput id="companyNr" type="text" text="ondernemingsnummer"
              inputValue={customerInfo.companyNr}
              validateChange={handleCompanyNrChange}
              stateObjectSetter={setCustomerInfo}
              stateObject={customerInfo}
              pattern={"^(BE)?(0|1)([0-9]{9}|[0-9]{3}[-.][0-9]{3}[-.][0-9]{3})$"}
            />
          </div>
          <div className="container">
            {(isLoading || roles === undefined) ? <LoadingSpinner/> : 
            <StyledRadioGroup 
              value={roles[0]} 
              stateObjectSetter={setCustomerInfo} 
              stateObject={customerInfo} 
              roles={roles}
            />}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Link to="../users" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
            <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
            Terug
          </Link>
          <div>
            <input className="hidden peer" id="submit" 
              type="submit"
              disabled={!validateStateObject(createCustomer)}
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