import { PlusCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function CustomerCreditRequests() {

    return(
      <div className="mx-auto max-w-6xl py-4">
        <div className="flex items-center justify-between flex-wrap container pb-4">
          <div></div>
          <Link to="../new_credit_request" className="flex items-center flex-shrink-0 text-white bg-main-0 sm:rounded-lg p-2">
            <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
            <span className="text-xl tracking-wider mr-2 uppercase">Aanvraag</span>
          </Link>
        </div>
        <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg p-4">
          Placeholder for credit request overview
        </div>
      </div>
        
    );
}