import React, { useState } from "react";

export default function NewCreditRequest() {
  const [sliderValue, setSliderValue] = useState(12);

    function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
      setSliderValue(parseInt(e.target.value))
    }

    return(
        <div className="mx-auto max-w-7xl py-8">
            <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg p-4 flex justify-between">
                <div>
                  <div className="pb-4">
                      <div className="w-60 relative group">
                          <input type={"text"} id="name" required className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"/>
                          <label htmlFor="name" className="text-2xl uppercase transform transition-all absolute top-0 left-0 h-full flex items-center pl-2  group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
                              NAAM
                          </label>
                      </div>
                  </div>
                  <div className="pb-4">
                      <div className="w-60 relative group">
                          <input type={"number"} id="requested_amount" required className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"/>
                          <label htmlFor="requested_amount" className="text-2xl uppercase transform transition-all absolute top-0 left-0 h-full flex items-center pl-2  group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
                              TE FINANCIEEREN
                          </label>
                      </div>
                  </div>
                  <div className="pb-4">
                      <div className="w-60 relative group">
                          <input type={"number"} id="financed_amount" required className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"/>
                          <label htmlFor="financed_amount" className="text-2xl uppercase transform transition-all absolute top-0 left-0 h-full flex items-center pl-2  group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
                              ZELF GEFINANCIERD
                          </label>
                      </div>
                  </div>
                  <div className="container pl-2 flex flex-col w-60 py-4 space-y-2">
                    <label className="text-3xl uppercase">Totaal:</label>
                    <input type="text" disabled className="bg-main-input rounded border-0"/>
                  </div>
                  <div className="container pl-2 flex flex-col w-60 py-4 space-y-2">
                    <label className="text-3xl uppercase">Looptijd: </label>
                    <input className="form-range w-60"
                      type="range" 
                      min="2" 
                      max="24" 
                      value={sliderValue}
                      onChange={handleSliderChange}
                    />
                    <div className="mx-auto">{sliderValue} maanden</div>
                  </div>
                </div>
                <div>
                  <textarea></textarea>
                </div>
            </div>
        </div>
    );
}


  