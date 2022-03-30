import { FC, HTMLProps } from "react";
import PropTypes, { InferProps } from "prop-types";

interface StyledInputPropTypes extends HTMLProps<HTMLInputElement> {
    validateChange: typeof PropTypes.func.isRequired,
}

export const StyledInput: FC<InferProps<StyledInputPropTypes>>  = ({id, type, validateChange, children}) => {
    return(
        <div className="pb-4">
            <div className="relative group">
                {children}
                <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer" 
                    id={id}
                    type={type} 
                    required
                    onChange={validateChange}
                />
            </div>
        </div>
    );
}

interface StyledInputWithLabelPropTypes extends StyledInputPropTypes {
    text: typeof PropTypes.string.isRequired
}

export const StyledInputWithLabel: FC<InferProps<StyledInputWithLabelPropTypes>>  = ({id, type, validateChange, text, value}) => {
    return(
        <div className="pb-4">
            <div className="relative group">
                <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-lg peer" 
                    id={id}
                    type={type} 
                    required
                    onChange={validateChange}
                    value={value}
                />
                <label className={[
                    "text-2xl uppercase",
                    "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                    "group-focus-within:text-xs peer-valid:text-xs",
                    "group-focus-within:h-1/2 peer-valid:h-1/2",
                    "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                    "group-focus-within:pl-0 peer-valid:pl-0"
                    ].join(" ")}
                    htmlFor={id} 
                >
                    {text}
                </label> 
            </div>
        </div>
    );
}