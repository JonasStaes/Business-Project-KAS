import { PlusCircleIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/User.service";

interface User {
  name: string
  email: string
  companyNr: number
  active: boolean
  id: string
}

export default function AdminUsers() {

  const [timeOutID, setTimeOutID] = useState<number>(0);
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate(); 
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

    const closeErrorMessage = () => {
      setErrorMessageOpen(false)
      window.clearTimeout(timeOutID);
      setTimeOutID(0);
    }

    useEffect(() => {
      getUsers()
    }, [getUsers])

    function deactivateUser(id: string, active: boolean){
      if (active == true){
        alert("Deze klant is al inactief!")
      }
      else{
        UserService.deactivate(id)
        .then(res => {
          console.info(res);
          navigate("../users");         
        })
        .catch(e => {
          setErrorMessage(e.response.data.message);
          setErrorMessageOpen(true);
          setTimeOutID(window.setTimeout(closeErrorMessage, 4000));
        })
        
      }
    }

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
                <th>Ondernemingsnummer</th>
                <th>Actief</th>
                <th>Id</th>
                <th></th>

                
              </tr>
            </thead>
            <tbody>
            {users.map((usr, i) => {
              if(i % 2 === 0) {
                return(
                  <tr key={nanoid()} className="h-8">
                    <td className="text-center border-x">{usr.name}</td>
                    <td className="text-center border-x">{usr.email}</td>
                    <td className="text-center border-x">{usr.companyNr}</td>
                    <td className="text-center border-x">{usr.active.toString()}</td>
                    <td className="text-center border-x">{usr.id}</td>
                    <td> <input type="submit" className="button" value="Deactiveren" onClick={() => deactivateUser(usr.id, usr.active)} /></td>
                  </tr>
                );
              } else {
                return(
                  <tr key={nanoid()} className="bg-blue-200 h-8">
                    <td className="text-center border-x">{usr.name}</td>
                    <td className="text-center border-x">{usr.email}</td>
                    <td className="text-center border-x">{usr.companyNr}</td>
                    <td className="text-center border-x">{usr.active.toString()}</td>
                    <td className="text-center border-x">{usr.id}</td>
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