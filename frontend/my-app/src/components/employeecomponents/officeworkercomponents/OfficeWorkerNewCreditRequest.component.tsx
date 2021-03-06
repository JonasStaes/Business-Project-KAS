import { FC, FormEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { day } from "../../../redux/features/api/constants";

import { useGetAllInvestmentTypesQuery } from "../../../redux/features/api/enums";

import { selectCurrentUserId } from "../../../redux/features/auth/authSlice";
import { StyledAppInput, StyledFileInput, StyledSelect, StyledSlider, StyledTextArea } from "../../genericcomponents/StyledInputs.component";
import { useState } from "react";
import { handleFinancedAmountInputChange, handleNameChange, handleNoteChange, handleTotalAmountInputChange } from "../../../services/frontend/Validator.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { cleanUpInvestmentType } from "../../../services/frontend/TextParser.service";
import { Link } from "react-router-dom";
import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { validateStateObject } from "../../../services/frontend/StateObjectUpdater.service";
import { OfficeWorkerCreditRequestCreateDto } from "../../../redux/features/api/types";
import { useCreateCreditRequestOfficeMutation, useValidateCreditRequestOfficeMutation } from "../../../redux/features/api/officeworker";

export const OfficeWorkerNewCreditRequest: FC = () => {
  const navigate = useNavigate(); 
  const currentUser = useSelector(selectCurrentUserId);
  const [createCreditRequest] = useCreateCreditRequestOfficeMutation();
  const [validateRequest] = useValidateCreditRequestOfficeMutation();
  const { data: investmentTypes, isLoading } = useGetAllInvestmentTypesQuery(undefined, { pollingInterval: day });

  const [creditRequestInfo, setCreditRequestInfo] = useState<OfficeWorkerCreditRequestCreateDto>({
    name: { value: "", valid: true, errorValue: ""},
    totalAmount: { value: 0, valid: true, errorValue: ""},
    financedAmount: { value: 0, valid: true, errorValue: ""},
    duration: 1,
    investmentType: { name: "Selecteer type", min: 1, max: 1 },
    approvalNote: { value: "", valid: true, errorValue: ""},
    files: [],
    companyNr: { value: "", valid: true, errorValue: ""}
  })

  const calculateRequestedAmount = useCallback(() => {
    return creditRequestInfo.totalAmount.value - creditRequestInfo.financedAmount.value;
  }, [creditRequestInfo])

  const submitCreditRequest = (e: FormEvent) => {
    e.preventDefault()
    createCreditRequest({ 
      officeWorkerCreditRequestCreateDto: creditRequestInfo, 
      callback: async (id: string) => {
        await validateRequest(id)
        navigate("../credit_requests") 
      }
    })
  }

  return(
    <div className="mx-auto max-w-3xl py-8 min-h-full">
      <form className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6"
        onSubmit={submitCreditRequest}
      >
        <div className="flex justify-between gap-8">
          <div className="w-72 p-2">
          <StyledAppInput id="companyNr" text="Bedrijfsnummer" type="text"
              inputValue={creditRequestInfo.companyNr}
              validateChange={handleNameChange} 
              stateObjectSetter={setCreditRequestInfo} 
              stateObject={creditRequestInfo}    
              minLength={3}
            />
            <StyledAppInput id="name" text="Projectnaam" type="text"
              inputValue={creditRequestInfo.name}
              validateChange={handleNameChange} 
              stateObjectSetter={setCreditRequestInfo} 
              stateObject={creditRequestInfo}    
              minLength={3}
            />
            <StyledAppInput id="totalAmount" text={"Totaal bedrag (\u20ac)"} type="number"
              inputValue={creditRequestInfo.totalAmount}
              validateChange={handleTotalAmountInputChange} 
              stateObjectSetter={setCreditRequestInfo} 
              stateObject={creditRequestInfo} 
              min={1000}           
            />
            <StyledAppInput id="financedAmount" text={"Zelf gefinancierd (\u20ac)"} type="number"
              inputValue={creditRequestInfo.financedAmount}
              validateChange={handleFinancedAmountInputChange} 
              stateObjectSetter={setCreditRequestInfo} 
              stateObject={creditRequestInfo} 
              min={1000}   
              max={creditRequestInfo.totalAmount.value}
            />
            <div className="container pl-2 flex flex-col space-y-2">
              <label className="text-2xl uppercase" htmlFor="total_value">{"Gevraagd bedrag (\u20ac): "}</label>
              <input className="bg-main-input rounded border-0 p-2"
                id="total_value"
                type="text" 
                disabled
                value={calculateRequestedAmount()}
              />
            </div>
          </div>
          <div className="flex flex-col gap-x-2 justify-between w-72 p-2">
            {(isLoading || investmentTypes === undefined) ? <LoadingSpinner/> : 
            <div>
              <StyledSelect 
                id="investmentType" 
                values={investmentTypes} 
                keyExtractor={({name}) => name}
                selectedValue={creditRequestInfo.investmentType} 
                valueCleaner={cleanUpInvestmentType} 
                stateObjectSetter={setCreditRequestInfo} 
                stateObject={creditRequestInfo} 
              />
              <StyledSlider 
                id="duration" 
                min={creditRequestInfo.investmentType.min}
                max={creditRequestInfo.investmentType.max}
                currentValue={creditRequestInfo.duration} 
                stateObjectSetter={setCreditRequestInfo} 
                stateObject={creditRequestInfo} 
              />
            </div>}
            <div className="self-end flex flex-row">
              <StyledTextArea 
                id={"approvalNote"} 
                text={"Verantwoording nieuwe aanvraag"} 
                inputValue={creditRequestInfo.approvalNote} 
                validateChange={handleNoteChange} 
                stateObjectSetter={setCreditRequestInfo} 
                stateObject={creditRequestInfo}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between pr-2 pl-4">
          <Link to="../credit_requests" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
            <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
            Terug
          </Link>
          <div className="flex flex-row gap-8">
            <StyledFileInput 
              id="files" 
              currentFiles={creditRequestInfo.files} 
              stateObjectSetter={setCreditRequestInfo}
              stateObject={creditRequestInfo} 
            />
            <div>
              <input className="hidden peer" id="submit" 
                type="submit"
                disabled={!validateStateObject(creditRequestInfo)}
              />
              <label className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center peer-disabled:bg-main-input"
                htmlFor="submit"
              >
                <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                Volgende
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}