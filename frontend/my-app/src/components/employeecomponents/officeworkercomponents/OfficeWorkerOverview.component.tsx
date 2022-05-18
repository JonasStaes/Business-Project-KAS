import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { day, tenMins } from "../../../redux/features/api/constants";
import { useGetAllStatusesQuery } from "../../../redux/features/api/enums";
import { cleanUpStringUppercase } from "../../../services/frontend/TextParser.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { useGetAllCreditRequestsQuery} from "../../../redux/features/api/officeworker";

const defaultStatus = "Geen Status";

const OfficeWorkerOverview: FC = () => {
  const navigate = useNavigate();
  const { data: creditRequests, isLoading: creditRequestsLoading } = useGetAllCreditRequestsQuery(undefined, { pollingInterval: tenMins });
  const { data: statuses, isLoading: statusesLoading } = useGetAllStatusesQuery(undefined, { pollingInterval: day })

  const [selectedStatus, setSelectedStatus] = useState<string>(statusesLoading ? defaultStatus : statuses![0])
  
  const filterRequests = () => {
    if(creditRequests !== undefined && statuses !== undefined) {
      return creditRequests.filter(cr => {
        if(selectedStatus === statuses[0] || selectedStatus === defaultStatus) {
          return cr;
        } else {
          if(cr.status.toLowerCase() === selectedStatus.toLowerCase()) {
            return cr;
          }

          return null;
        }
      });
    } else {
      return [];
    }
  };

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
    }
    return tempStyle;
  }

  const handleRowClick = (id: string) => {
    navigate(`.././credit_request/${id}`);
  }

  return(
    <div className="mx-auto max-w-6xl py-4 h-screen">
      <div className="flex items-center justify-end flex-wrap container pb-4 gap-16">
        {(statuses === undefined || statusesLoading) ? <LoadingSpinner/> : 
          <Listbox 
            className="space-y-2 w-56 relative border-b-2 border-main-0 text-lg"
            as="div" 
            value={selectedStatus}
            onChange={setSelectedStatus} 
          >
            <Listbox.Label>Filter status: </Listbox.Label>
            <Listbox.Button>{cleanUpStringUppercase(selectedStatus)}</Listbox.Button>
            <Listbox.Options className="absolute right-0 top-10 z-10 shadow rounded bg-white cursor-pointer divide-y divide-gray-300">
              {statuses.map((status) => (
                <Listbox.Option
                  key={status}
                  value={status}
                  as={Fragment}
                >
                  {({selected}) => (
                    <li className={[
                      "py-2 px-2 hover:bg-gray-300 hover:opacity-80 flex",
                      (selected ? "bg-main-0 text-white" : "bg-transparent text-black")
                      ].join(" ")}
                    >
                      {selected && <CheckIcon className="fill-current h-7 w-7 mr-2"/>}
                      {cleanUpStringUppercase(status)}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        }
      </div>
      <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg border-main-0 rounded border-2 h-4/5 overflow-y-auto">
        {creditRequestsLoading ? <LoadingSpinner/> : 
          <table className="table-auto border-collapse min-w-full p-4">
            <thead className="bg-gray-300 sticky top-0">
              <tr className="h-8">
                <th>Naam</th>
                <th>Investeringstype</th>
                <th>Totaal Bedrag (&euro;)</th>
                <th>Zelf Gefinancierd Bedrag (&euro;)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterRequests().map(cr => (
                <tr key={cr.id} className="h-8 odd:bg-blue-100 hover:bg-gray-300" onClick={() => handleRowClick(cr.id)}>
                  <td className="text-center border-x">{cr.name}</td>
                  <td className="text-center border-x text-ellipsis">{cleanUpStringUppercase(cr.investmentType)}</td>
                  <td className="text-center border-x">{cr.totalAmount}</td>
                  <td className="text-center border-x">{cr.financedAmount}</td>
                  <td className={["text-center border-x", modifyStatusRow(cr.status)].join(" ")}>{cleanUpStringUppercase(cr.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

export default OfficeWorkerOverview;