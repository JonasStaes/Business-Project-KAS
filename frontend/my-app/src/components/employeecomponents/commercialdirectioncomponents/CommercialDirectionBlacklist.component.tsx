import { Dialog } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon, TrashIcon, ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBlackListEntriesQuery } from "../../../redux/features/api/commercialdirection";
import { tenMins } from "../../../redux/features/api/constants";
import { cleanUpArrayNoUppercase } from "../../../services/frontend/TextParser.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";

export default function CommercialDirectionBlacklist() {
  const { data: entries, isLoading: entriesLoading } = useGetAllBlackListEntriesQuery(undefined, { pollingInterval: tenMins });


  const [open, setOpen] = useState<boolean>(false);


  return(
    <div className="mx-auto max-w-6xl py-4 h-screen">
      <div className="flex items-center justify-end gap-4 flex-wrap container pb-4">
        <Link to="../new_customer" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
          <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
          <span className="text-xl tracking-wider mr-2 uppercase">Sector</span>
        </Link>
        <Link to="../whitelist" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
          <ArrowCircleRightIcon className="fill-current h-7 w-7 mr-2"/>
          <span className="text-xl tracking-wider mr-2 uppercase">Witte lijst</span>
        </Link>
        
      </div>
      <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg border-main-0 rounded border-2 h-4/5">
      {entriesLoading ? <LoadingSpinner/> : 
        <table className="table-auto border-collapse min-w-full p-4 overflow-y-auto">
          <thead className="bg-gray-300">
            <tr className="h-8">
              <th>NACEBEL</th>
            </tr>
          </thead>
          <tbody>
          {entries!.map(entry => (
            <tr key={JSON.stringify(entry)} className="odd:bg-blue-200 h-8">
              <td className="text-center border-x">{entry.nacebel}</td>
            </tr>
          ))}
          </tbody>
        </table>
      }
      </div>
    </div>
  );
}