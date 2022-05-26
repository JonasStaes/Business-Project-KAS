import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowCircleLeftIcon, PlusCircleIcon, XCircleIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { cleanUpStringUppercase, formatNumber } from "../../../services/frontend/TextParser.service";
import { useGetOneCreditRequestAgentQuery, useSetApprovalStatusAgentMutation } from "../../../redux/features/api/ratingagent";
import { CreditRequestStatusConfirmationDto } from "../../../redux/features/api/types";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { validateStateObject } from "../../../services/frontend/StateObjectUpdater.service";
import { handleNoteChange } from "../../../services/frontend/Validator.service";
import { StyledTextArea } from "../../genericcomponents/StyledInputs.component";
import { Dialog } from "@headlessui/react";


const RateCreditRequest: FC = () => {
    let params = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { data: creditRequest, isLoading: creditRequestLoading } = useGetOneCreditRequestAgentQuery(params.id === undefined ? "" : params.id);
    const [confirmStatus] = useSetApprovalStatusAgentMutation();

    const [confirmationData, setConfirmationData] = useState<CreditRequestStatusConfirmationDto>({
        id: params.id === undefined ? "" : params.id,
        approvalNote: { value: "", valid: true, errorValue: "" }
    })

    const sendApprovalData = (approval: boolean) => {
        confirmStatus({
            creditRequestStatusConfirmationDto: confirmationData,
            callback: () => navigate("../credit_requests"),
            approval: approval
        })
    }

    const modifyStatusRow = (status: string) => {
        let tempStyle = ""
        if(status !== null) {
            switch(status.toLowerCase()) {
                case "in_behandeling":
                  tempStyle = "text-orange-500";
                  break;
                case "goedgekeurd":
                  tempStyle = "text-main-accepted";
                  break;
                case "afgekeurd":
                  tempStyle = "text-main-declined"
                  break;
              }
              return tempStyle;
        }
    }

    const calculateRequestedAmount = (totalAmount: number, financedAmount: number) => {
        return parseFloat((((parseFloat(totalAmount.toFixed(2)) * 10) - (parseFloat(financedAmount.toFixed(2))) * 10) / 10).toFixed(2))
    }

    useEffect(() => {
        console.log(creditRequest)
    })

    return(
        <div className="flex flex-col p-4 gap-y-8">
            <div className="flex flex-row divide-x text-left indent-4">
                {creditRequest?.companyInfo !== undefined && 
                    <div className="grow-[1] border border-main-2">
                        <h1 className="bg-main-0 text-main-1 rounded-t py-2">Bedrijf</h1>
                        <div className="bg-main-1 rounded-b">
                            <ul className="capitalize space-y-2 py-2">
                                <li>Bedrijfsnaam: {creditRequest.companyInfo.name}</li>
                                <li>BedrijfsNr: {creditRequest.companyNr}</li>
                                <li>Nacbel code: {creditRequest.companyInfo.nacbelCode}</li>
                            </ul>
                        </div>
                    </div>}
                {(creditRequestLoading || creditRequest === undefined) ? <LoadingSpinner/> : 
                    <div className="grow-[1] border border-main-2">
                        <h1 className="bg-main-0 text-main-1 rounded-t py-2">Aanvraag</h1>
                        <div className="bg-main-1 rounded-b">
                            <ul className="capitalize space-y-2 py-2">
                                <li>Naam: {creditRequest.name}</li>
                                <li>Investerings Type: {cleanUpStringUppercase(creditRequest.investmentType)}</li>
                                <li>Totaal bedrag: &euro; {formatNumber(creditRequest.totalAmount)}</li>
                                <li>Zelfgefinancieerd bedrag: &euro; {formatNumber(creditRequest.financedAmount)}</li>
                                <li>Gevraagd bedrag: &euro; {formatNumber(calculateRequestedAmount(creditRequest.totalAmount, creditRequest.financedAmount))}</li>
                                <li className={modifyStatusRow(creditRequest.status)}>Status: {cleanUpStringUppercase(creditRequest.status)}</li>
                            </ul>
                            <StyledTextArea 
                                id={"approvalNote"} 
                                text={"opmerking"} 
                                inputValue={confirmationData.approvalNote} 
                                validateChange={handleNoteChange} 
                                stateObjectSetter={setConfirmationData} 
                                stateObject={confirmationData}
                            />
                        </div>
                    </div>
                }
                <div className="grow-[2] border border-main-2">
                    <h1 className="bg-main-0 text-main-1 rounded-t py-2">Ratios</h1>
                    <div className="bg-main-1 rounded-b">
                        <div className="capitalize space-y-2 py-2">
                            {creditRequest?.feedbackDocument.calculatedRatios.map(ratio => (
                                <div key={ratio.name}>
                                    {ratio.name}: {ratio.ratio}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between pr-2 pl-4">
                <Link to="../credit_requests" className="bg-main-0 shadow text-main-1 rounded w-48 py-2 uppercase text-lg flex justify-center">
                  <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                  Terug
                </Link>
                <div className="flex flex-row gap-x-2">
                    <button className="bg-main-declined text-main-1 shadow rounded w-48 py-2 uppercase text-lg flex justify-center disabled:bg-main-input"
                        disabled={!validateStateObject(confirmationData)}
                        onClick={() => sendApprovalData(false)}
                    >
                        <XCircleIcon className="fill-current h-7 w-7 mr-2"/>
                        Afkeuren
                    </button>
                    <button className="bg-main-accepted text-main-1 shadow rounded w-48 py-2 uppercase text-lg flex justify-center disabled:bg-main-input"
                        disabled={!validateStateObject(confirmationData)}
                        onClick={() => sendApprovalData(true)}
                    >
                        <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                        Goedkeuren
                  </button>
                </div>
                <div className="flex flex-row gap-x-2">
                <button className="bg-main-0 text-main-1 shadow rounded w-48 py-2 uppercase text-lg flex justify-center disabled:bg-main-input"
                        onClick={() => {
                            setOpen(true)
                          }}
                    >
                        <ClipboardListIcon className="fill-current h-7 w-7 mr-2"/>
                        Jaarrekening
                  </button>
                </div>
            </div>
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
              Jaarrekening {creditRequest?.companyInfo?.name}
            </Dialog.Title>
            <Dialog.Description className="mt-2">
            {creditRequest?.companyInfo !== undefined && 
                    <div className="grow-[1] border border-main-2">
                        <div className="bg-main-1 rounded-b">
                            <ul className="capitalize space-y-2 py-2">
                                <li>Eigen vermogen: {creditRequest.companyInfo.equity}</li>
                                <li>Activa: {creditRequest.companyInfo.assets}</li>
                                <li>Resultaat: {creditRequest.companyInfo.result}</li>
                                <li>Belasting: {creditRequest.companyInfo.tax}</li>
                                <li>Resultaat na belasting: {creditRequest.companyInfo.resultAfterTax}</li>
                                <li>Financiële kosten: {creditRequest.companyInfo.financialCosts}</li>
                                <li>Vlottende activa: {creditRequest.companyInfo.currentAssets}</li>
                                <li>Stock: {creditRequest.companyInfo.stock}</li>
                                <li>Vaste activa: {creditRequest.companyInfo.fixedAssets}</li>
                                <li>Korte termijnsschulden: {creditRequest.companyInfo.shortTermDebt}</li>
                                <li>Lange termijnsschulden: {creditRequest.companyInfo.longTermDebt}</li>
                                <li>Afschrijving: {creditRequest.companyInfo.depreciation}</li>
                                <li>Write-down: {creditRequest.companyInfo.writeDown}</li>

                            </ul>
                        </div>
                    </div>}
            </Dialog.Description>
            <div className="flex items-center justify-between mt-4">
              <button className="bg-main-0 p-2 rounded flex flex-row items-center text-main-1"
                onClick={() => setOpen(false)}
              >
                <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                Terug
              </button>
            </div>
          </div>
        </div>
      </Dialog>
        </div>
    );

}

export default RateCreditRequest;