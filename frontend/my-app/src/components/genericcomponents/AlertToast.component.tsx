import { Transition } from "@headlessui/react";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import PropTypes, { InferProps } from "prop-types";
import { FC, useCallback, useEffect, useRef, useState } from "react";

interface AlertToastPropTypes {
    error: typeof PropTypes.string.isRequired
    setError: typeof PropTypes.func.isRequired
}

const AlertToast: FC<InferProps<AlertToastPropTypes>> = ({error, setError}) => {

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if(error !== "") {
            setOpen(true);
        }
    }, [error])

    const closeErrorMessage = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return(
        <Transition className="absolute inset-x-0 top-4 mx-auto max-w-lg"
            show={open}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
            afterLeave={() => setError("")}
        >
            <div className="shadow rounded-lg bg-main-1">
                <button className="absolute top-0 right-0"
                    onClick={closeErrorMessage}
                >
                    <XIcon className="h-6 w-6"/>
                </button>
                <div className="p-2">
                    <div className="flex justify-center">
                        <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2 text-main-declined"/>
                        {error}
                    </div>
                </div>
                <Transition.Child
                    enter="transform transition origin-left duration-[4000ms]"
                    enterFrom="scale-x-100"
                    enterTo="scale-x-0"
                    afterEnter={closeErrorMessage}
                    leave="scale-x-0"
                    
                >
                    <div className="w-full h-2 bg-main-declined"/>
                </Transition.Child>
            </div>
        </Transition>
    );
}

export default AlertToast;