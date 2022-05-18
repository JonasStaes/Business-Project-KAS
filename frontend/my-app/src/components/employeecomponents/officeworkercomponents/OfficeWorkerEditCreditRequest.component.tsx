import { Dialog } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { FC, FormEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { day } from "../../../redux/features/api/constants";
import { useCreateCreditRequestMutation, useValidateCreditRequestMutation } from "../../../redux/features/api/customerCreditRequest";
import { useGetAllInvestmentTypesQuery } from "../../../redux/features/api/enums";
import { useDeleteCreditRequestOfficeMutation } from "../../../redux/features/api/officeworker";
import { useGetOneCreditRequestOfficeQuery } from "../../../redux/features/api/officeworker";
import { CreditRequestCreateDto } from "../../../redux/features/api/types";
import { selectCurrentUserId } from "../../../redux/features/auth/authSlice";
import { validateStateObject } from "../../../services/frontend/StateObjectUpdater.service";
import { cleanUpInvestmentType } from "../../../services/frontend/TextParser.service";
import { handleFinancedAmountInputChange, handleNameChange, handleNoteChange, handleTotalAmountInputChange } from "../../../services/frontend/Validator.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { StyledFileInput, StyledAppInput, StyledSelect, StyledSlider, StyledTextArea } from "../../genericcomponents/StyledInputs.component";

export const EditCreditRequest: FC = () => {
    let params = useParams();
    const { data: creditRequest, isLoading: creditRequestLoading } = useGetOneCreditRequestOfficeQuery(params.id === undefined ? "" : params.id);
    const [deactivate] = useDeleteCreditRequestOfficeMutation();
  const navigate = useNavigate(); 
  const currentUser = useSelector(selectCurrentUserId);
  const [createCreditRequest] = useCreateCreditRequestMutation();
  const [validateRequest] = useValidateCreditRequestMutation();
  const { data: investmentTypes, isLoading } = useGetAllInvestmentTypesQuery(undefined, { pollingInterval: day });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCreditRequest, setSelectedCreditRequest] = useState<string>("");

  const [creditRequestInfo, setCreditRequestInfo] = useState<CreditRequestCreateDto>({
    name: { value: "", valid: true, errorValue: ""},
    totalAmount: { value: 0, valid: true, errorValue: ""},
    financedAmount: { value: 0, valid: true, errorValue: ""},
    duration: { value: 1, valid: true, errorValue: ""},
    investmentType: { value: { name: "Selecteer type", min: 1, max: 1 }, valid: true, errorValue: ""},
    approvalNote: { value: "", valid: true, errorValue: ""},
    files: [],
    currentUser: currentUser!
  })

  const calculateRequestedAmount = useCallback(() => {
    return creditRequestInfo.totalAmount.value - creditRequestInfo.financedAmount.value;
  }, [creditRequestInfo])

  const submitCreditRequest = (e: FormEvent) => {
    e.preventDefault()
    createCreditRequest({ 
      creditRequestCreateDto: creditRequestInfo, 
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
                selectedValue={creditRequestInfo.investmentType.value} 
                valueCleaner={cleanUpInvestmentType} 
                stateObjectSetter={setCreditRequestInfo} 
                stateObject={creditRequestInfo} 
              />
              <StyledSlider 
                id="duration" 
                min={creditRequestInfo.investmentType.value.min}
                max={creditRequestInfo.investmentType.value.max}
                currentValue={creditRequestInfo.duration.value} 
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
              <button className="bg-yellow-300 p-2 rounded flex flex-row items-center disabled:bg-gray-500" 
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2"/>
                  Deactiveren
                </button>
            </div>
          </div>
        </div>
      </form>
      <Dialog className="fixed inset-0 z-10 overflow-y-auto" 
        as="div"
        open={open} 
        onClose={() => setOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-60"/>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h2"
              className="text-lg font-semibold leading-6 "
            >
              Kredietaanvraag intrekken?
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-red-700">
              Deze actie zal deze kredietaanvraag permanent intrekken!
            </Dialog.Description>
            <div className="flex items-center justify-between mt-4">
              <button className="bg-main-0 p-2 rounded flex flex-row items-center text-main-1"
                onClick={() => setOpen(false)}
              >
                <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                Terug
              </button>
              <button className="bg-red-700 p-2 rounded flex flex-row items-center text-main-1"
                onClick={() => {
                  setOpen(false);
                  deactivate(creditRequest?.id!);
                  navigate("../credit_requests");
                }}
              >
                <TrashIcon className="fill-current h-7 w-7 mr-2"/>
                Intrekken kredietaanvraag
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default EditCreditRequest;


  