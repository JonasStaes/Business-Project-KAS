import { FC } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import PropTypes, { InferProps } from "prop-types";
import TextParserService from "../../services/frontend/TextParser.service";

interface SelectChipPropTypes {
    role: typeof PropTypes.string.isRequired
    onCheckChange: typeof PropTypes.func.isRequired
}

const SelectChip: FC<InferProps<SelectChipPropTypes>> = ({role, onCheckChange}) => {
    return(
        <div>
            <input type="checkbox" id={role} value={role} className="peer hidden w-full" onChange={onCheckChange}/>  
            <label htmlFor={role} className={[ 
                "peer-checked:bg-main-0 peer-checked:fill-current peer-checked:text-main-1",
                "bg-gray-400 fill-gray-400 text-black",
                "px-4 py-2 rounded-3xl border-2 border-main-0",
                "flex flex-row items-center capitalize "
                ].join(" ")}
            >
                <CheckCircleIcon className="h-7 w-7 mr-2 fill-inherit"/>
                {TextParserService.cleanUpRole(role)}
            </label>
        </div>
    );
}

export default SelectChip;