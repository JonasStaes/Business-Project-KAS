import { Dialog } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon, TrashIcon, ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteWhiteListEntryMutation, useGetAllWhiteListEntriesQuery } from "../../../redux/features/api/commercialdirection";
import { tenMins } from "../../../redux/features/api/constants";
import { cleanUpArrayNoUppercase } from "../../../services/frontend/TextParser.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";

export default function CommercialDirectionOverview() {
  const { data: entries, isLoading: entriesLoading } = useGetAllWhiteListEntriesQuery(undefined, { pollingInterval: tenMins });

  const navigate = useNavigate(); 
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<string>("");
  const [remove] = useDeleteWhiteListEntryMutation();

  return(
    <div className="mx-auto max-w-6xl py-4 h-screen">
      <div className="flex items-center justify-end gap-4 flex-wrap container pb-4">
        <Link to="../new_whitelist_entry" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
          <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
          <span className="text-xl tracking-wider mr-2 uppercase">Sector</span>
        </Link>
        <Link to="../blacklist" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
          <ArrowCircleRightIcon className="fill-current h-7 w-7 mr-2"/>
          <span className="text-xl tracking-wider mr-2 uppercase">Zwarte lijst</span>
        </Link>
        
      </div>
      <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg border-main-0 rounded border-2 h-4/5">
      {entriesLoading ? <LoadingSpinner/> : 
        <table className="table-auto border-collapse min-w-full p-4 overflow-y-auto">
          <thead className="bg-gray-300">
            <tr className="h-8">
              <th>NACEBEL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {entries!.map(entry => (
            <tr key={JSON.stringify(entry)} className="odd:bg-blue-200 h-8">
              <td className="text-center border-x">{entry.nacebel}</td>
              <td className="p-2 flex justify-center">
                <button className="bg-yellow-300 p-2 rounded flex flex-row items-center disabled:bg-gray-500" 
                  onClick={() => {
                    setOpen(true)
                    setSelectedEntry(entry.id);
                  }}
                >
                  <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2"/>
                  Verwijderen
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      }
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
              Verwijder sector?
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-red-700">
              Deze actie zal deze sector permanent verwijderen!
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
                  remove(selectedEntry);
                  window.location.reload();
                }}
              >
                <TrashIcon className="fill-current h-7 w-7 mr-2"/>
                Verwijder sector
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}