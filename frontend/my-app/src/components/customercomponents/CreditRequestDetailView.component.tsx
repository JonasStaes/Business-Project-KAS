import { Dialog } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteCreditRequestCustomerMutation, useGetOneCustomerCreditRequestQuery } from "../../redux/features/api/customerCreditRequest";
import { cleanUpStringUppercase, formatNumber } from "../../services/frontend/TextParser.service";
import { LoadingSpinner } from "../genericcomponents/LoadingSpinner";
import { Feedback } from "./FeedbackDocument.component";

export const CreditRequestDetail = () => {
    let params = useParams();
    const { data: creditRequest, isLoading: creditRequestLoading } = useGetOneCustomerCreditRequestQuery(params.id === undefined ? "" : params.id);
    const [open, setOpen] = useState<boolean>(false);
    const [deactivate] = useDeleteCreditRequestCustomerMutation();
    const navigate = useNavigate();
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

    function checkType(status: string){
        if (status == "in_behandeling"){
            return true;
        }
        return false;
    }

    const calculateRequestedAmount = (totalAmount: number, financedAmount: number) => {
        return parseFloat((((parseFloat(totalAmount.toFixed(2)) * 10) - (parseFloat(financedAmount.toFixed(2))) * 10) / 10).toFixed(2))
    }

    return (
    <div className="flex flex-col p-4 gap-y-8 max-h-full">
        <div className="flex flex-row divide-x text-left indent-4 max-h-screen">
            {(creditRequestLoading || creditRequest === undefined) ? <LoadingSpinner/> : 
                <>
                    <div className="flex flex-col justify-start gap-y-2 grow-[1] ">
                        <div className="border border-main-2">
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
                            </div>
                        </div>
                        {(creditRequest?.files !== undefined && creditRequest?.files.length > 0) && 
                        <div className="border border-main-2 ">
                            <h1 className="bg-main-0 text-main-1 rounded-t py-2">Documenten</h1>
                            <div className="bg-main-1 rounded-b">
                                {
                                    creditRequest.files.map(file => (
                                        <a href={URL.createObjectURL(new File([Buffer.from(file.data.toString(), "base64")], file.name, { type: file.type}))} rel="noopener noreferrer" target="_blank">
                                            <div>
                                                {file.name}
                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                        }
                        <div className="justify-self-end">
                            <div className="w-full flex justify-between pr-2">
                                <Link to="../credit_requests" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
                                    <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                                    Terug
                                </Link>
                                <button className="bg-yellow-300 p-2 rounded flex flex-row items-center disabled:bg-gray-500"
                                    disabled={!checkType(creditRequest.status)} 
                                    onClick={() => {
                                    setOpen(true)
                                                    }}
                                >
                                    <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2"/>
                                    Intrekken
                                </button>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="grow-[1] border border-main-2 h-screen">
                        <h1 className="bg-main-0 text-main-1 rounded-t py-2">Feedback</h1>
                        <div className="bg-main-1 rounded-b">
                            <PDFViewer showToolbar={false} className="w-full h-[34rem]">
                                <Feedback feedbackDocument={creditRequest.feedbackDocument} creditRequest={creditRequest}/>
                            </PDFViewer>
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
                </>
            }
        </div>
    </div>
    );
}
