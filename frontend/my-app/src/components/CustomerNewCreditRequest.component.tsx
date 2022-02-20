export default function NewCreditRequest() {
    return(
        <div className="mx-auto max-w-7xl py-8">
            <div className="bg-main-1 shadow overflow-hidden container sm:rounded-lg p-4">
                <div className="pb-4">
                    <div className="w-60 relative group">
                        <input type={"text"} id="naam" required className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"/>
                        <label htmlFor="naam" className="text-2xl uppercase transform transition-all absolute top-0 left-0 h-full flex items-center pl-2  group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
                            NAAM
                        </label>
                    </div>
                </div>
                <div className="pb-4">
                    <div className="w-60 relative group">
                        <input type={"text"} id="naam" required className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"/>
                        <label htmlFor="naam" className="text-2xl uppercase transform transition-all absolute top-0 left-0 h-full flex items-center pl-2  group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
                            TE FINANCIEEREN
                        </label>
                    </div>
                </div>
                <div className="pb-4">
                    <div className="w-60 relative group">
                        <input type={"text"} id="naam" required className="border-x-0 border-t-0 border-b-2 border-main-0 bg-transparent w-full h-10 px-4 text-xl peer"/>
                        <label htmlFor="naam" className="text-2xl uppercase transform transition-all absolute top-0 left-0 h-full flex items-center pl-2  group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
                            ZELF GEFINANCIERD
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}