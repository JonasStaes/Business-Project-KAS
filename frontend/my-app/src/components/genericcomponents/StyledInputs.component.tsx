import { ChangeEvent, FC, Fragment, HTMLProps, useEffect, useState } from "react";
import { updateState, updateStateAndErrors } from "../../services/frontend/StateObjectUpdater.service";
import { ValidatedObject } from "../../services/types/GeneralTypes";
import { Listbox, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, DocumentAddIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { cleanUpStringNoUppercase } from "../../services/frontend/TextParser.service";

interface StyledInputProps<T> extends HTMLProps<HTMLInputElement> {
    id: string,
    text: string,
    value: ValidatedObject<T>
    validateChange: Function,
    stateObjectSetter: Function
    stateObject: Object
};

export const StyledLoginInput = <T,>({ className, id, text, value, type, validateChange, stateObjectSetter, stateObject }: StyledInputProps<T>) => {
    return(
        <div className={value.valid ? "border-transparent" : "border-main-declined"}>
            <div className="flex flex-col py-4 space-y-4 items-center border-inherit">
                <label className="uppercase text-2xl text-center" htmlFor={id}>{text}</label>
                <input className={className}
                    id={id}
                    type={type} 
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateStateAndErrors<typeof stateObject, T>(id, validateChange(e), stateObject, stateObjectSetter)}
                />
            </div>
            <div className="text-main-declined">{value.errorValue}</div>
        </div>
    );
}

export const StyledAppInput = <T,>({id, text, value, type, minLength, min, max, pattern, validateChange, stateObjectSetter, stateObject}: StyledInputProps<T>) => {

    return(
        <div className={[value.valid ? "border-main-0" : "border-main-declined", "pt-4"].join(" ")}>
            <div className="relative group border-inherit">
                <input className="border-b-2 border-inherit bg-transparent w-full h-10 px-4 text-lg peer" 
                    id={id}
                    type={type}
                    lang={"be"} 
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateStateAndErrors<typeof stateObject, T>(id, validateChange(e), stateObject, stateObjectSetter)}
                    minLength={minLength}
                    min={min}
                    max={max}
                    pattern={pattern}
                />
                <label className={[
                    "text-xl uppercase",
                    "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                    "group-focus-within:text-xs peer-valid:text-xs peer-invalid:text-xs",
                    "group-focus-within:h-1/2 peer-valid:h-1/2 peer-invalid:h-1/2",
                    "group-focus-within:-translate-y-full peer-valid:-translate-y-full peer-invalid:-translate-y-full",
                    "group-focus-within:pl-0 peer-valid:pl-0 peer-invalid:pl-0"
                    ].join(" ")}
                    htmlFor={id} 
                >
                    {text}
                </label> 
                
            </div>
            <div className="text-main-declined">{value === undefined ? "" : value.errorValue}</div>
        </div>
    );
}

export const StyledUnmaskableInput = <T,>({id, text, value, minLength, min, max, pattern, validateChange, stateObjectSetter, stateObject}: StyledInputProps<T>) => {
    const [mask, setMask] = useState<boolean>(true);
    return(
        <div className={[value.valid ? "border-main-0" : "border-main-declined", "pt-4"].join(" ")}>
            <div className="relative group border-inherit">
                <label className="select-none uppercase transform transition-all absolute top-0 left-0 flex items-center text-xs h-1/2 -translate-y-full pl-0"
                        htmlFor={id} 
                    >
                        {text}
                </label> 
                <input className="appearance-none border-b-2 border-inherit bg-transparent w-full h-10 px-4 text-lg peer" 
                    id={id}
                    type={mask ? "password" : "text"}
                    lang={"be"} 
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateStateAndErrors<typeof stateObject, T>(id, validateChange(e), stateObject, stateObjectSetter)}
                    minLength={minLength}
                    min={min}
                    max={max}
                    pattern={pattern}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <label htmlFor="mask">{mask ? 
                        <EyeIcon className="fill-current h-7 w-7 mr-2"/> 
                        : 
                        <EyeOffIcon className="fill-current h-7 w-7 mr-2"/>
                    }</label>
                    <input type="checkbox" className="hidden" id="mask" onChange={() => setMask(!mask)}/>
                </div>
            </div>
            <div className="text-main-declined">{value === undefined ? "" : value.errorValue}</div>
        </div>
    );
}

interface StyledRadioGroupProps {
    value: string
    stateObjectSetter: Function
    stateObject: Object
    roles: Array<string>
}

export const StyledRadioGroup = ({value, roles, stateObject, stateObjectSetter}: StyledRadioGroupProps) => {
    return(
        <RadioGroup value={value} 
            onChange={(role: string) => updateState<typeof stateObject, typeof role>("role", role, stateObject, stateObjectSetter)}
        >
            <RadioGroup.Label className="text-2xl">
                Selecteer Klant rol
            </RadioGroup.Label>
            <div className="flex flex-row gap-x-8 py-2">
            {roles.map((r: string) => (
                <RadioGroup.Option value={r} key={r}>
                    {({active, checked}) => (
                        <div className={[
                            (checked ? "bg-main-0 peer-checked:fill-current peer-checked:text-main-1" : "fill-transparent text-black "),
                            "px-4 py-2 rounded-3xl border-2 border-main-0 flex flex-row items-center capitalize"
                        ].join(" ")}>
                            <CheckCircleIcon className="h-7 w-7 mr-2 fill-inherit outline outline-1 rounded-full"/>
                            {cleanUpStringNoUppercase(r)}
                        </div>
                    )}    
                </RadioGroup.Option>
            ))}
            </div>
        </RadioGroup>
    );
}

interface StyledSliderProps extends HTMLProps<HTMLInputElement> {
    id: string,
    min: number,
    max: number,
    currentValue: number,
    stateObjectSetter: Function
    stateObject: Object
}

export const StyledSlider: FC<StyledSliderProps> = ({ id, min, max, currentValue, stateObject, stateObjectSetter}) => {
    useEffect(() => {
        if(currentValue > max) {
            updateState<typeof stateObject, number>(id, max, stateObject, stateObjectSetter)
        }
    }, [max, currentValue, id, stateObject, stateObjectSetter])
    return(
        <div className="pl-2 flex flex-col space-y-2">
            <label className="text-2xl uppercase" htmlFor={id}>Looptijd: </label>
            <input className="form-range"
                id={id}
                type="range" 
                min={min}
                max={max}
                value={currentValue > max ? max : currentValue}
                onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => updateState<typeof stateObject, number>(id, parseInt(value), stateObject, stateObjectSetter)}
            />
            <div className="mx-auto">{currentValue} jaren</div>
        </div>
    );
}

interface StyledSelectProps<T> {
    id: string,
    values: Array<T>,
    keyExtractor: (item: T) => string,
    selectedValue: T,
    valueCleaner?: Function,
    stateObjectSetter: Function
    stateObject: Object
}

export const StyledSelect = <T extends Object>({ id, values, keyExtractor, selectedValue, valueCleaner, stateObject, stateObjectSetter }: StyledSelectProps<T>) => {
    return(
        <Listbox as="div" className="shadow p-2 rounded border border-gray-300 text-black"
            value={selectedValue} 
            onChange={(value: T) => updateState<typeof stateObject, T>(id, value, stateObject, stateObjectSetter)}
        >
            <Listbox.Button className="w-full text-left">{valueCleaner === undefined ? selectedValue : valueCleaner(selectedValue)}</Listbox.Button>
            <Listbox.Options className="absolute z-10 bg-main-1 rounded divide-y-2 mt-4 shadow border border-gray-300">
            {values.map(value => (
                <Listbox.Option
                    as={Fragment}
                    key={keyExtractor(value)}
                    value={value}
                >
                    {({selected}) => (
                        <li className={[
                            "p-2 hover:bg-gray-300 hover:opacity-80",
                            (selected ? "bg-main-0 text-white" : "bg-transparent text-black")
                        ].join(" ")}>
                            {valueCleaner!(value)}
                        </li>
                    )}
                </Listbox.Option>
            ))}
            </Listbox.Options>
        </Listbox>
    )
}

interface StyledFileInputProps {
    id: string,
    currentFiles: Array<File>,
    stateObjectSetter: Function
    stateObject: Object
}

export const StyledFileInput: FC<StyledFileInputProps> = ({ id, currentFiles, stateObject, stateObjectSetter }) => {
    return(
        <label className="uppercase text-lg flex justify-center text-main-1 bg-main-0 shadow rounded w-40 py-2" 
            htmlFor={id}
        >
            Upload File
            <DocumentAddIcon className="fill-current h-7 w-7 ml-2"/>
            <input className="hidden"
                id={id}
                multiple
                accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type={"file"}
                onChange={({ target: { files } }: ChangeEvent<HTMLInputElement>) => updateState<typeof stateObject, Array<File>>(id, [...currentFiles, ...files!], stateObject, stateObjectSetter)}
            />
        </label>
    );
}

export const StyledTextArea = <T,>({ id, text, value, validateChange, stateObjectSetter, stateObject }: StyledInputProps<T>) => {
    return(
        <div className={[(value.valid ? "border-main-0" : "border-main-declined"), "w-full p-4"].join(" ")}>
            <div className="flex flex-col items-center border-inherit">
                <label htmlFor={id} className="uppercase text-lg self-start">{text}</label>
                <textarea className="resize-none bg-main-input border-2 border-inherit rounded h-40 w-full" 
                    name="note" 
                    id={id} 
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateStateAndErrors<typeof stateObject, T>(id, validateChange(e), stateObject, stateObjectSetter)}
                    required
                />
            </div>
            <div className="text-main-declined">{value.errorValue}</div>
        </div>
    );
}