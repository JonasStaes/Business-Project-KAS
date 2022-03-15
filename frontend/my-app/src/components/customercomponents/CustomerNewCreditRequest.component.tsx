import { ArrowCircleLeftIcon, DocumentAddIcon, PlusCircleIcon } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreditRequestService from "../../services/CreditRequest.service";

export default function NewCreditRequest() {
  const navigate = useNavigate(); 
  const [requestedAmount, setRequestedAmount] = useState(0);
  const [formFilled, setFormFilled] = useState(false);

  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [financedAmount, setFinancedAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(12);
  const [accountability, setAccountability] = useState("");
  const [files, setFiles] = useState<Array<File>>([]);
  

    function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setName(e.target.value);
      } else {
        setName("");
      }
    }

    function handleTotalAmountInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setTotalAmount(parseFloat(e.target.value));
      } else {
        setTotalAmount(0);
      }
    }

    function handleFinancedAmountInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setFinancedAmount(parseFloat(e.target.value));
      } else {
        setFinancedAmount(0);
      }
    }

    function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
      setSliderValue(parseInt(e.target.value));
    }

    function handleAccountabilityInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if(e.target.validity.valid && e.target.value.trim().length !== 0) {
        setAccountability(e.target.value);
      } else {
        setAccountability("");
      }
    }

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target!.files!) {
        for (let i = 0; i < e.target!.files!.length; i++) {
          setFiles(files => [...files, e.target!.files![i]]);
        }
        
      }
    }

    const calculateTotalValue = useCallback(() => {
      setRequestedAmount(totalAmount - financedAmount);
    }, [totalAmount, financedAmount])

    const checkIfFormFilled = useCallback(() => {
      setFormFilled(name !== "" && totalAmount > 0 && financedAmount > 0 && accountability !== "");
    }, [name, totalAmount, financedAmount, accountability])

    useEffect(() => {
      calculateTotalValue();
      checkIfFormFilled();
    }, [calculateTotalValue, checkIfFormFilled])

    function submitCreditRequest() {
      if(name !== "" && totalAmount > 0 && financedAmount > 0 && accountability !== "") {
        CreditRequestService.create(name, totalAmount, financedAmount, sliderValue, accountability, files)
          .then(res => {
            console.info(res);
            navigate("../credit_requests");
          })
          .catch(e => {
            console.error(e);
          })
      }
    }

    return(
        <div className="mx-auto max-w-7xl py-8 min-h-full">
            <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6">
                <div className="flex justify-between gap-8">
                  <div className="w-72">
                    <div className="pb-4">
                        <div className="relative group">
                            <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer focus:ring-0" 
                              id="name_input"
                              type={"text"} 
                              required
                              onChange={handleNameInputChange}
                            />
                            <label className={[
                              "text-2xl uppercase",
                              "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                              "group-focus-within:text-xs peer-valid:text-xs",
                              "group-focus-within:h-1/2 peer-valid:h-1/2",
                              "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                              "group-focus-within:pl-0 peer-valid:pl-0"
                              ].join(" ")}
                              htmlFor="name_input" 
                            >
                                Projectnaam
                            </label>
                        </div>
                    </div>
                    <div className="pb-4">
                        <div className="relative group">
                            <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer focus:ring-0"
                              id="total_amount_input" 
                              type={"number"} 
                              required
                              onChange={handleTotalAmountInputChange}
                            />
                            <label className={[
                              "text-2xl uppercase",
                              "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                              "group-focus-within:text-xs peer-valid:text-xs",
                              "group-focus-within:h-1/2 peer-valid:h-1/2",
                              "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                              "group-focus-within:pl-0 peer-valid:pl-0"
                              ].join(" ")}
                              htmlFor="total_amount_input"
                            >
                                Totaal bedrag
                            </label>
                        </div>
                    </div>
                    <div className="pb-4">
                        <div className=" relative group">
                            <input className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer focus:ring-0"
                              id="financed_amount_input" 
                              type={"number"} 
                              required
                              onChange={handleFinancedAmountInputChange}
                            />
                            <label className={[
                              "text-2xl uppercase",
                              "transform transition-all absolute top-0 left-0 h-full flex items-center pl-2",
                              "group-focus-within:text-xs peer-valid:text-xs",
                              "group-focus-within:h-1/2 peer-valid:h-1/2",
                              "group-focus-within:-translate-y-full peer-valid:-translate-y-full",
                              "group-focus-within:pl-0 peer-valid:pl-0"
                              ].join(" ")}
                              htmlFor="financed_amount_input" 
                            >
                                Zelf gefinancierd
                            </label>
                        </div>
                    </div>
                    <div className="container pl-2 flex flex-col py-4 space-y-2">
                      <label className="text-2xl uppercase" htmlFor="total_value">Gevraagd bedrag:</label>
                      <input className="bg-main-input rounded border-0"
                        id="total_value"
                        type="text" 
                        disabled
                        value={requestedAmount}
                      />
                    </div>
                    <div className="container pl-2 flex flex-col py-4 space-y-2">
                      <label className="text-2xl uppercase" htmlFor="period_input">Looptijd: </label>
                      <input className="form-range"
                        id="period_input"
                        type="range" 
                        min="2" 
                        max="24" 
                        value={sliderValue}
                        onChange={handleSliderChange}
                      />
                      <div className="mx-auto">{sliderValue} maanden</div>
                    </div>
                  </div>
                  <div className="grow flex flex-row-reverse gap-x-2">
                    <div className="w-3/5 flex flex-col">
                      <label className="text-2xl uppercase"
                        htmlFor="accountability_input">
                        Verantwoording aanvraag
                      </label>
                      <textarea className="resize-none bg-main-input border-2 border-main-0 rounded grow"
                        id="accountability_input"
                        onChange={handleAccountabilityInputChange}
                      />
                    </div>
                    <div className="flex flex-col-reverse">
                      <label className="uppercase text-lg flex justify-center text-main-1 bg-main-0 shadow rounded w-40 py-2" 
                      htmlFor="file_input">
                        Upload File
                        <DocumentAddIcon className="fill-current h-7 w-7 ml-2"/>
                        <input  className="hidden"
                        id="file_input"
                        multiple
                        accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        type={"file"}
                        onChange={handleFileInputChange}
                        />
                      </label>
                    </div>
                  </div>
              </div>
              <div className="w-full flex justify-between">
                <Link to="../credit_requests" className="bg-main-0 shadow text-main-1 rounded w-40 py-2 uppercase text-lg flex justify-center">
                  <ArrowCircleLeftIcon className="fill-current h-7 w-7 mr-2"/>
                  Terug
                </Link>
                <button className="bg-main-accepted text-main-1 shadow rounded w-40 py-2 uppercase text-lg flex justify-center disabled:bg-main-input"
                  disabled={!formFilled}
                  onClick={submitCreditRequest}
                >
                  <PlusCircleIcon className="fill-current h-7 w-7 mr-2"/>
                  Volgende
                </button>
              </div>
            </div>
        </div>
    );
}


  