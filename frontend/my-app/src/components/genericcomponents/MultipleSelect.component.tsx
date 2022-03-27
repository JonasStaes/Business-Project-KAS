import { Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { nanoid } from "nanoid";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function MultipleSelect({inputValues, selectedValues, setSelectedValues}: InferProps<typeof MultipleSelect.propTypes>) {

    function isSelected(value: string) {
      return selectedValues.find((el) => el === value) ? true : false;
    }

    function handleSelect(value: any) {
      if (!isSelected(value)) {
        const selectedPersonsUpdated = [
          ...selectedValues,
          inputValues.find((el) => el === value)
        ];
        setSelectedValues(selectedPersonsUpdated);
      } else {
        handleDeselect(value);
      }
    }

    function handleDeselect(value: string) {
      const selectedPersonsUpdated = selectedValues.filter((el) => el !== value);
      setSelectedValues(selectedPersonsUpdated);
    }

    const cleanUpValue = (value: string) => {
      return value.toLowerCase().replaceAll(/_/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase() })
    }

    const cleanUpValues = (values: Array<string>) => {
      return values.map(value => cleanUpValue(value)).join(", ");
    }

    return(
      <Listbox className="shadow p-2 rounded border border-gray-300"
        as="div" 
        value={selectedValues} 
        onChange={(value) => handleSelect(value)}
      >
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="w-full text-left truncate">
              {selectedValues.length < 1 ? "Selecteer rol" : "Geselecteerde rollen: " + cleanUpValues(selectedValues)}
            </Listbox.Button>
            {open && (
                <Listbox.Options className="absolute z-10 bg-main-1 w-full rounded overflow-y-scroll h-40 divide-y-2 mt-4 shadow border border-gray-300"
                  static
                >
                  {inputValues.map((value) => {
                    const selected = isSelected(value);
                    return(
                      <Listbox.Option 
                        as={Fragment} 
                        key={value} 
                        value={value}
                      >
                          <li className={[
                            "py-2 px-2 hover:bg-gray-300 hover:opacity-80 flex",
                            (selected ? "bg-main-0 text-white" : "bg-transparent text-black"),
                          ].join(" ")}>
                            <span className={[
                                (selected ? "font-semibold" : "font-normal"),
                                "truncate flex"
                              ].join(" ")}
                            >
                              {selected && (
                                <CheckCircleIcon className="fill-current h-7 w-7 mr-4"/>
                              )}  
                              {cleanUpValue(value)}
                            </span>
                          </li>
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
            )}
          </div>
        )}
    </Listbox>
    );
}

MultipleSelect.propTypes = {
  inputValues: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  setSelectedValues: PropTypes.func.isRequired
}