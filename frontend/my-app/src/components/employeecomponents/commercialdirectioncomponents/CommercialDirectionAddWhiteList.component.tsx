import { ArrowCircleLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateWhiteListEntryMutation} from "../../../redux/features/api/commercialdirection";
import { EmployeeCreateDto, ListEntryDto } from "../../../redux/features/api/types";
import { useRequestEmployeeFinalizationQuery } from "../../../redux/features/api/user";
import { validateStateObject } from "../../../services/frontend/StateObjectUpdater.service";
import { handleEmailChange, handleNameChange } from "../../../services/frontend/Validator.service";
import ChipMenu from "../../genericcomponents/ChipMenu.component";
import { LoadingSpinner } from "../../genericcomponents/LoadingSpinner";
import { StyledAppInput } from "../../genericcomponents/StyledInputs.component";

export default function AddToWhiteList() {
  const navigate = useNavigate(); 
  const [skip, setSkip] = useState<boolean>(true);
  const [createWhiteListEntry] = useCreateWhiteListEntryMutation();


  const [EntryInfo, setEntryInfo] = useState<ListEntryDto>({
    nacebel: { value: "", valid: true, errorValue: ""}
  })

  const submitWhiteListEntry = (e: FormEvent) => {
    e.preventDefault()
    createWhiteListEntry({ 
      listEntryDto: EntryInfo,
      callback: () => {
        setSkip(false);
        navigate("../whitelist"); 
      }
    })
  }

  return(
    <div className="container w-full py-8">
      <form className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6 w-3/5 h-1/3 mx-auto"
        onSubmit={submitWhiteListEntry}
      >
        <div className="container flex flex-row gap-8">
          <div className="container space-y-4">
            <StyledAppInput id={"nacebel"} text={"nacebel code"} 
              type="text"
              inputValue={EntryInfo.nacebel} 
              validateChange={handleNameChange} 
              stateObjectSetter={setEntryInfo} 
              stateObject={EntryInfo}
              minLength={3}  
            />
            </div>
        </div>
        <div className="w-full flex justify-between">
          <Link to="../whitelist" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
            <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
            Terug
          </Link>
          <div>
            <input className="hidden peer" id="submit" 
              type="submit"
              disabled={!validateStateObject(EntryInfo)}
            />
            <label className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center peer-disabled:bg-main-input"
              htmlFor="submit"
            >
              <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
              Volgende
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}