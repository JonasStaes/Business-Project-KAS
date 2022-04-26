import { Transition } from "@headlessui/react";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deactivateError } from "../../redux/features/errors/errorSlice";
import { GlobalState } from "../../redux/store";


const AlertToast: FC = () => {

    const { active, message } = useSelector((state: GlobalState) => state.error);
    const dispatch = useDispatch();

    return(
        <Transition className="absolute inset-x-0 top-4 mx-auto max-w-lg"
            show={active}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
        >
            <div className="shadow rounded-lg bg-main-1">
                <button className="absolute top-0 right-0"
                    onClick={() => dispatch(deactivateError())}
                >
                    <XIcon className="h-6 w-6"/>
                </button>
                <div className="p-2 pb-0">
                    <div className="flex justify-center">
                        <ExclamationCircleIcon className="fill-current h-7 w-7 mr-2 text-main-declined"/>
                        {message}
                    </div>
                </div>
                <Transition.Child
                    enter="transition-width origin-left duration-[4000ms] ease-linear"
                    enterFrom="w-full"
                    enterTo="w-0"
                    afterEnter={() => dispatch(deactivateError())}
                    leave="w-0"
                    
                >
                    <div className="w-full h-2 bg-main-declined rounded-bl-lg"/>
                </Transition.Child>
            </div>
        </Transition>
    );
}

export default AlertToast;