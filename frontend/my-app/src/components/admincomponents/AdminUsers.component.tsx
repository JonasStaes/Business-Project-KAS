import { PlusCircleIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/User.service";

interface User {
  name: string
  email: string
  active: boolean
}

export default function AdminUsers() {
  const [users, setUsers] = useState<Array<User>>([]);

    const getUsers = useCallback(() => {
      UserService.getAll()
        .then(res => {
          setUsers(res.data.data);
          console.log(res.data);
          console.log(res.data.data);
        })
        .catch(e => {
          console.error(e);
        });
    }, [])

    useEffect(() => {
      getUsers()
    }, [getUsers])

    return(
      <div className="mx-auto max-w-6xl py-4 h-screen">
        <div className="flex items-center justify-between flex-wrap container pb-4">
          <div></div>
          <Link to="../new_user" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
            <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
            <span className="text-xl tracking-wider mr-2 uppercase">Klant</span>
          </Link>
        </div>
        <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg border-main-0 rounded border-2 h-4/5">
          <table className="table-auto border-collapse min-w-full p-4 overflow-y-auto">
            <thead className="bg-gray-300">
              <tr className="h-8">
                <th>Naam</th>
                <th>Email</th>
                <th>Actief</th>
              </tr>
            </thead>
            <tbody>
            {users.map((usr, i) => {
              if(i % 2 === 0) {
                return(
                  <tr key={nanoid()} className="h-8">
                    <td className="text-center border-x">{usr.name}</td>
                    <td className="text-center border-x">{usr.email}</td>
                    <td className="text-center border-x">{usr.active.toString()}</td>
                  </tr>
                );
              } else {
                return(
                  <tr key={nanoid()} className="bg-blue-200 h-8">
                    <td className="text-center border-x">{usr.name}</td>
                    <td className="text-center border-x">{usr.email}</td>
                    <td className="text-center border-x">{usr.active.toString()}</td>
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