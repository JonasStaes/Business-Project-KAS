import { PlusCircleIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminService from "../../../services/Admin.service";
import UserService from "../../../services/User.service";


interface User {
  id: string
  name: string
  email: string
  roles: Array<string>
  active: boolean
}

export default function AdminUsers() {
  const [users, setUsers] = useState<Array<User>>([]);

    const getUsers = useCallback(() => {
      AdminService.getAllUsers()
        .then(res => {
          setUsers(res.data.data);
          console.log(res.data);
          console.log(res.data.data);
        })
        .catch(e => {
          console.error(e);
        });
    }, [])

    const cleanUpRoles = (roles: Array<string>) => {
      return roles.map(role => cleanUpRole(role)).join(", ");
    }

    const cleanUpRole = (role: string) => {
      return role.replaceAll(/_/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase() })
    }

    useEffect(() => {
      getUsers()
      AdminService.getAllRoles().then(res => console.log(res.data))
    }, [getUsers])

    function deactivateUser(id: string, active: boolean){

      if (active === false){
        alert("Deze klant is al inactief!")
      }
      else{
        let text = "Bent u zeker dat u deze klant wil deactiveren?";
        if(window.confirm(text) === true){
          console.log("here")
          AdminService.deactivate(id)
          .then(res => {
            console.info(res)
            window.location.reload();       
          })  
        }           
      }
    }


    return(
      <div className="mx-auto max-w-6xl py-4 h-screen">
        <div className="flex items-center justify-end gap-4 flex-wrap container pb-4">
          <div></div>
          <Link to="../new_customer" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
            <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
            <span className="text-xl tracking-wider mr-2 uppercase">Klant</span>
          </Link>
          <Link to="../new_employee" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
            <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
            <span className="text-xl tracking-wider mr-2 uppercase">Werknemer</span>
          </Link>
        </div>
        <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg border-main-0 rounded border-2 h-4/5">
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
            {users.map(usr => (
                <tr key={JSON.stringify(usr)} className="odd:bg-blue-200 h-8">
                  <td className="text-center border-x">{usr.name}</td>
                  <td className="text-center border-x">{usr.email}</td>
                  <td className="text-center border-x truncate">{cleanUpRoles(usr.roles)}</td>
                  <td className="text-center border-x">{usr.active.toString()}</td>
                  <td> <input type="button" className="button" value="Deactiveren" onClick={() => deactivateUser(usr.id, usr.active)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
    );
}