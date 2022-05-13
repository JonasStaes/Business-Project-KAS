import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOneCustomerCreditRequestQuery } from "../../redux/features/api/customerCreditRequest";
import { cleanUpStringUppercase } from "../../services/frontend/TextParser.service";
import { LoadingSpinner } from "../genericcomponents/LoadingSpinner";
import { Feedback } from "./FeedbackDocument.component";

export const CreditRequestDetail = () => {
    let params = useParams();
    const { data: creditRequest, isLoading: creditRequestLoading } = useGetOneCustomerCreditRequestQuery(params.id === undefined ? "" : params.id);

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
        return (((parseFloat(totalAmount.toFixed(2)) * 10) - (parseFloat(financedAmount.toFixed(2))) * 10) / 10).toFixed(2)
    }

    useEffect(() => {
        console.log(creditRequest?.feedbackDocument)
    })
    
    return (
    <div className="flex flex-col p-4 gap-y-8 max-h-full">
        <div className="flex flex-row divide-x text-left indent-4 max-h-full">
            {(creditRequestLoading || creditRequest === undefined) ? <LoadingSpinner/> : 
                <>
                    <div className="grow-[1] border border-main-2 space-y-2">
                        <div>
                            <h1 className="bg-main-0 text-main-1 rounded-t py-2">Aanvraag</h1>
                            <div className="bg-main-1 rounded-b">
                                <ul className="capitalize space-y-2 py-2">
                                    <li>Naam: {creditRequest.name}</li>
                                    <li>Investerings Type: {cleanUpStringUppercase(creditRequest.investmentType)}</li>
                                    <li>Totaal bedrag: &euro; {creditRequest.totalAmount}</li>
                                    <li>Zelfgefinancieerd bedrag: &euro; {creditRequest.financedAmount}</li>
                                    <li>Gevraagd bedrag: &euro; {calculateRequestedAmount(creditRequest.totalAmount, creditRequest.financedAmount)}</li>
                                    <li className={modifyStatusRow(creditRequest.status)}>Status: {cleanUpStringUppercase(creditRequest.status)}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full flex justify-between pr-2">
                            <Link to="../credit_requests" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
                                <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                                Terug
                            </Link>
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
                </>
            }
        </div>
    </div>
    );
}
