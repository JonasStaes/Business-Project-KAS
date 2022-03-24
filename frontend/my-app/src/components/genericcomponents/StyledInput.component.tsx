import { ChangeEventHandler } from "react";
import PropTypes, { InferProps } from "prop-types";

export default function StyledInput({id, inputType, validateChange, text} : InferProps<typeof StyledInput.propTypes>) {
    return(
        <div className="pb-4">
            <div className="relative group">
                <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer" 
                    id={id}
                    type={inputType} 
                    required
                    onChange={validateChange}
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

StyledInput.propTypes = {
    id: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    validateChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}