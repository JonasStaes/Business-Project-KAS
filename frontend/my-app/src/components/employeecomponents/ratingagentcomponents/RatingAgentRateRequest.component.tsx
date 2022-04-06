import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import RatingAgentService from "../../../services/api/RatingAgent.service";
import { useNavigate, useParams } from "react-router";
import { number } from "prop-types";
import { Link } from "react-router-dom";
import { ArrowCircleLeftIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import TextParserService from "../../../services/frontend/TextParser.service";

interface CreditRequest {
    name: string
    investmentType: string
    totalAmount: number
    financedAmount: number
    status: string
}

const RateCreditRequest: FC = ({}) => {
    let params = useParams();
    const navigate = useNavigate();

    const [creditRequest, setCreditRequest] = useState<CreditRequest>();

    const [note, setNote] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const getCreditRequest = useCallback(() => {
        RatingAgentService.getOne(params.Id!)
            .then(res => {
                console.log(res.data);
                setCreditRequest(res.data.data);
            })
            .catch(e => {
                console.error(e);
            })            
    }, [params])

    const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if(e.target.validity.valid && e.target.value.trim().length !== 0) {
            setNote(e.target.value);
        } else {
            setNote("");
        }
    }

    const checkIfNoteValid = useCallback(() => {
        setValid(note !== "");
    }, [note, setValid])

    const sendApprovalData = (approval: boolean) => {
        RatingAgentService.setApprovalStatus(params.Id!, approval, note)
            .then(() => {
                navigate("../credit_requests");
            })
            .catch(e => {
                console.error(e);
            })
    }

    useEffect(() => {
        getCreditRequest();
        checkIfNoteValid();
    }, [getCreditRequest, checkIfNoteValid])

  
    const modifyStatusRow = (status?: string) => {
        let tempStyle = ""
        if(status !== undefined) {
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
        return totalAmount - financedAmount
    }

    if(creditRequest) {
        return(
            <div className="flex flex-col p-4 gap-y-8">
                <div className="flex flex-row divide-x text-center">
                    <div className="grow-[1] border border-main-2">
                        <h1 className="bg-main-0 text-main-1 rounded-t py-2">Bedrijf</h1>
                        <div className="bg-main-1 rounded-b">
                            Work in progress
                        </div>
                    </div>
                    <div className="grow-[1] border border-main-2">
                        <h1 className="bg-main-0 text-main-1 rounded-t py-2">Aanvraag</h1>
                        <div className="bg-main-1 rounded-b">
                            <ul className="capitalize space-y-2 py-2">
                                <li>Naam: {creditRequest.name}</li>
                                <li>Investerings Type: {creditRequest.investmentType}</li>
                                <li>Totaal bedrag: {creditRequest.totalAmount}</li>
                                <li>Zelfgefinancieerd bedrag: {creditRequest.financedAmount}</li>
                                <li>Gevraagd bedrag: {calculateRequestedAmount(creditRequest.totalAmount, creditRequest.financedAmount)}</li>
                                <li className={modifyStatusRow(creditRequest.status)}>Status: {TextParserService.cleanUpStatus(creditRequest.status)}</li>
                            </ul>
                            <div className="flex flex-col items-center p-4">
                                <label htmlFor="note" className="uppercase text-lg self-start">opmerking</label>
                                <textarea className="resize-none bg-main-input border-2 border-main-0 rounded h-40 w-full" name="note" id="note" onChange={handleNoteChange} required/>
                            </div>
                        </div>
                    </div>
                    <div className="grow-[2] border border-main-2">
                        <h1 className="bg-main-0 text-main-1 rounded-t py-2">Ratios</h1>
                        <div className="bg-main-1 rounded-b">
                            Work in progress
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
                            disabled={!valid}
                            onClick={() => sendApprovalData(false)}
                        >
                            <XCircleIcon className="fill-current h-7 w-7 mr-2"/>
                            Afkeuren
                        </button>
                        <button className="bg-main-accepted text-main-1 shadow rounded w-48 py-2 uppercase text-lg flex justify-center disabled:bg-main-input"
                            disabled={!valid}
                            onClick={() => sendApprovalData(true)}
                        >
                            <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                            Goedkeuren
                      </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }

    
}

export default RateCreditRequest;