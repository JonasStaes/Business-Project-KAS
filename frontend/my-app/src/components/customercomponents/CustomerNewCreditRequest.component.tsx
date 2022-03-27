import { Listbox } from "@headlessui/react";
import { ArrowCircleLeftIcon, DocumentAddIcon, PlusCircleIcon } from "@heroicons/react/solid";
import React, { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreditRequestService from "../../services/CreditRequest.service";
import { StyledInputWithLabel } from "../genericcomponents/StyledInput.component";

interface investmentType {
  name: string,
  min: number,
  max: number
}

const investmentTypes = [
  { name: "Rollend materieel", min: 1, max: 5},
  { name: "Onroerende goederen", min: 1, max: 25},
  { name: "Professionele uitrusting", min: 1, max: 15}
]

export default function NewCreditRequest() {
  const navigate = useNavigate(); 
  const [requestedAmount, setRequestedAmount] = useState(0);
  const [formFilled, setFormFilled] = useState(false);

  const [name, setName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [financedAmount, setFinancedAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [files, setFiles] = useState<Array<File>>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<investmentType>(investmentTypes[0]);
  

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

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.validity.valid && e.target!.files!) {
        for (let i = 0; i < e.target!.files!.length; i++) {
          setFiles(files => [...files, e.target!.files![i]]);
        }
        
      }
    }

    const handleSelectedInvestmentChange = (value: investmentType) => {
      if(sliderValue > value.max) {
        setSliderValue(value.max)
      }

      setSelectedInvestment(value);
    }

    const calculateTotalValue = useCallback(() => {
      setRequestedAmount(totalAmount - financedAmount);
    }, [totalAmount, financedAmount])

    const checkIfFormFilled = useCallback(() => {
      setFormFilled(name !== "" && totalAmount > 0 && financedAmount > 0);
    }, [name, totalAmount, financedAmount])

    useEffect(() => {
      calculateTotalValue();
      checkIfFormFilled();
    }, [calculateTotalValue, checkIfFormFilled])

    function submitCreditRequest() {
      if(name !== "" && totalAmount > 0 && financedAmount > 0) {
        CreditRequestService.create(name, totalAmount, financedAmount, sliderValue, selectedInvestment.name, files)
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
        <div className="mx-auto max-w-3xl py-8 min-h-full">
            <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg px-8 py-10 space-y-6">
                <div className="flex justify-between gap-8">
                  <div className="w-72 p-2">
                   <StyledInputWithLabel id="name" type="text" text="Projectnaam" validateChange={handleNameInputChange}/>
                   <StyledInputWithLabel id="totalAmount" type="number" text="Totaal bedrag" validateChange={handleTotalAmountInputChange}/>
                   <StyledInputWithLabel id="financedAmount" type="number" text="Zelf gefinancierd" validateChange={handleFinancedAmountInputChange}/>
                    <div className="container pl-2 flex flex-col space-y-2">
                      <label className="text-2xl uppercase" htmlFor="total_value">Gevraagd bedrag:</label>
                      <input className="bg-main-input rounded border-0 p-2"
                        id="total_value"
                        type="text" 
                        disabled
                        value={requestedAmount}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-x-2 justify-between w-72 p-2">
                    <Listbox as="div" value={selectedInvestment} onChange={handleSelectedInvestmentChange} className="shadow p-2 rounded border border-gray-300 text-black">
                      <Listbox.Button className="w-full text-left">{selectedInvestment.name}</Listbox.Button>
                      <Listbox.Options className="absolute z-10 bg-main-1 rounded divide-y-2 mt-4 shadow border border-gray-300">
                        {investmentTypes.map(investmentType => (
                          <Listbox.Option
                            as={Fragment}
                            key={investmentType.name}
                            value={investmentType}
                          >
                            {({selected}) => (
                              <li className={[
                                "p-2 hover:bg-gray-300 hover:opacity-80",
                                (selected ? "bg-main-0 text-white" : "bg-transparent text-black")
                              ].join(" ")}>
                                {investmentType.name}
                              </li>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                    <div className="pl-2 flex flex-col space-y-2">
                      <label className="text-2xl uppercase" htmlFor="period_input">Looptijd: </label>
                      <input className="form-range"
                        id="period_input"
                        type="range" 
                        min={selectedInvestment.min}
                        max={selectedInvestment.max}
                        value={sliderValue}
                        onChange={handleSliderChange}
                      />
                      <div className="mx-auto">{sliderValue} jaren</div>
                    </div>
                    <div className="self-end">
                      <label className="uppercase text-lg flex justify-center text-main-1 bg-main-0 shadow rounded w-40 py-2" 
                          htmlFor="file_input"
                        >
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
              <div className="w-full flex justify-between pr-2 pl-4">
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


  