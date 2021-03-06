import { Dialog } from "@headlessui/react";
import { ArrowCircleLeftIcon, ExclamationCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeactivateUserMutation, useGetAllUsersQuery } from "../../../redux/features/api/admin";
import { cleanUpArrayNoUppercase } from "../../../services/frontend/TextParser.service";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";

export default function AdminUsers() {
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();
  const [deactivate] = useDeactivateUserMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>("");

  return(
    <div className="mx-auto max-w-6xl py-4 h-screen">
      <div className="flex items-center justify-end gap-4 flex-wrap container pb-4">
        <Link to="../new_customer" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
          <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
          <span className="text-xl tracking-wider mr-2 uppercase">Klant</span>
        </Link>
        <Link to="../new_employee" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
          <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
          <span className="text-xl tracking-wider mr-2 uppercase">Werknemer</span>
        </Link>
      </div>
      <div className="bg-main-1 shadow overflow-scroll container sm:rounded-lg border-main-0 rounded border-2 h-4/5">
      {usersLoading ? <LoadingSpinner/> : 
        <table className="table-auto border-collapse min-w-full p-4 overflow-y-auto">
          <thead className="bg-gray-300">
            <tr className="h-8">
              <th>Naam</th>
              <th>Email</th>
              <th>Rollen</th>
              <th>Actief</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {users!.map(usr => (
            <tr key={JSON.stringify(usr)} className="odd:bg-blue-200 h-8">
              <td className="text-center border-x w-1/6">{usr.name}</td>
              <td className="text-center border-x">{usr.email}</td>
              <td className="text-center border-x w-2/6">{cleanUpArrayNoUppercase(usr.roles)}</td>
              <td className="text-center border-x">{usr.active.toString()}</td>
              <td className="p-2 flex justify-center">
                <button className="bg-yellow-300 p-2 rounded flex flex-row items-center disabled:bg-gray-500" 
                  onClick={() => {
                    setOpen(true)
                    setSelectedUser(usr.id);
                  }}
                  disabled={!usr.active}
                >
                  <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2"/>
                  Deactiveren
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
              Deactiveer gebruiker?
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-red-700">
              Deze actie zal deze gebruiker permanent deactiveren!
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
                  deactivate(selectedUser);
                }}
              >
                <TrashIcon className="fill-current h-7 w-7 mr-2"/>
                Deactiveer gebruiker
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}