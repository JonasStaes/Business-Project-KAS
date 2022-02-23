import { PlusCircleIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreditRequestService from "../services/CreditRequest.service";

interface CreditRequest {
  name: string
  accountability: string
  financedAmount: number
  requestedAmount: number
}

export default function CustomerCreditRequests() {
  const [creditRequests, setCreditRequests] = useState<Array<CreditRequest>>([]);

    const getCreditRequests = useCallback(() => {
      CreditRequestService.getAll()
        .then(res => {
          setCreditRequests(res.data.data);
          console.log(res.data);
          console.log(res.data.data);
        })
        .catch(e => {
          console.error(e);
        });
    }, [])

    useEffect(() => {
      getCreditRequests()
    }, [getCreditRequests])

    return(
      <div className="mx-auto max-w-6xl py-4 h-screen">
        <div className="flex items-center justify-between flex-wrap container pb-4">
          <div></div>
          <Link to="../new_credit_request" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
            <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
            <span className="text-xl tracking-wider mr-2 uppercase">Aanvraag</span>
          </Link>
        </div>
        <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg border-main-0 rounded border-2 h-4/5 overflow-y-auto">
          <table className="table-auto border-collapse min-w-full p-4">
            <thead className="bg-gray-300 sticky top-0">
              <tr className="h-8">
                <th>Naam</th>
                <th>Verantwoording</th>
                <th>Zelfgefinancierd (&euro;)</th>
                <th>Gevraagd Totaal (&euro;)</th>
              </tr>
            </thead>
            <tbody>
            {creditRequests.map((cr, i) => {
              if(i % 2 == 0) {
                return(
                  <tr key={nanoid()} className="h-8">
                    <td className="text-center border-x">{cr.name}</td>
                    <td className="text-center border-x">{cr.accountability}</td>
                    <td className="text-center border-x">{cr.financedAmount}</td>
                    <td className="text-center border-x">{cr.requestedAmount}</td>
                  </tr>
                );
              } else {
                return(
                  <tr key={nanoid()} className="bg-blue-200 h-8">
                    <td className="text-center border-x">{cr.name}</td>
                    <td className="text-center border-x">{cr.accountability}</td>
                    <td className="text-center border-x">{cr.financedAmount}</td>
                    <td className="text-center border-x">{cr.requestedAmount}</td>
                  </tr>
                );
              }
            })}
            </tbody>
          </table>
        </div>
      </div>
        
    );
}