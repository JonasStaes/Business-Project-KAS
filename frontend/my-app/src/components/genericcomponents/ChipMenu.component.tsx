import { ChangeEvent, FC, HTMLProps } from "react";
import SelectChip from "./SelectChip.component";
import { updateState } from "../../services/frontend/StateObjectUpdater.service";
import { handleRolesChange } from "../../services/frontend/Validator.service";

interface StyledInputProps extends HTMLProps<HTMLInputElement> {
    id: string,
    values: Array<string>,
    selectedValues: Array<string>
    stateObjectSetter: Function
    stateObject: Object
};

const ChipMenu: FC<StyledInputProps> = ({id, values, selectedValues, stateObjectSetter, stateObject}) => {

    return(
        <div className="flex flex-row flex-wrap gap-2">
            {values.map((entry: string) => (
              <SelectChip key={entry} role={entry} onCheckChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => updateState(id, handleRolesChange(value, selectedValues), stateObject, stateObjectSetter)}/>
            ))}
        </div>
    );
}

export default ChipMenu;