import { Listbox } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreditRequestService from "../../services/CreditRequest.service";

interface CreditRequest {
  name: string
  accountability: string
  totalAmount: number
  requestedAmount: number
  status: string
}

const statuses = [
  "geen filter",
  "in_behandeling",
  "goedgekeurd",
  "afgekeurd"
]


export default function CustomerCreditRequests() {
  const [selectedStatus, setSelectedStatus] = useState<string>(statuses[0])
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

    const filterRequests = () => {
      return creditRequests.filter(cr => {
        if(selectedStatus === statuses[0]) {
          return cr;
        } else {
          if(cr.status.toLowerCase() === selectedStatus.toLowerCase()) {
            return cr;
          }
        }
      });
    };

    useEffect(() => {
      getCreditRequests()
    }, [getCreditRequests])

    const cleanUpStatus = (status: string) => {
      return status.replaceAll(/_/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase() })
    }

    const modifyStatusRow = (status: string) => {
      let tempStyle = ""
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

    return(
      <div className="mx-auto max-w-6xl py-4 h-screen">
        <div className="flex items-center justify-end flex-wrap container pb-4 gap-16">
          <Listbox 
            className="py-2 w-60 relative border-b-2 border-main-0 text-lg"
            as="div" 
            value={selectedStatus} 
            onChange={setSelectedStatus} 
          >
            <Listbox.Button>{"Filter status: " + cleanUpStatus(selectedStatus)}</Listbox.Button>
            <Listbox.Options className="absolute right-0 top-10 z-10 shadow rounded bg-white w-40 cursor-pointer divide-y divide-gray-300">
              {statuses.map((status) => (
                <Listbox.Option className="py-2 px-2 hover:bg-gray-300 hover:opacity-80"
                  key={nanoid()}
                  value={status}
                >
                  {cleanUpStatus(status)}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
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
                <th>Totaal Bedrag (&euro;)</th>
                <th>Gevraagd Bedrag (&euro;)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {filterRequests().map(cr => {
              return(
                <tr key={nanoid()} className="h-8 odd:bg-blue-100">
                  <td className="text-center border-x">{cr.name}</td>
                  <td className="text-center border-x text-ellipsis">{cr.accountability}</td>
                  <td className="text-center border-x">{cr.totalAmount}</td>
                  <td className="text-center border-x">{cr.requestedAmount}</td>
                  <td className={["text-center border-x", modifyStatusRow(cr.status)].join(" ")}>{cleanUpStatus(cr.status)}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    );
}