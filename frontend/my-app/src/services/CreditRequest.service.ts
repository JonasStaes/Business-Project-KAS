import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "credit_request"

//I still need to double check how we're uploading files, so leave that out for now
class CreditRequestService {
    getAll() {
        return http.get(`${urlBase}/all`)
    }

    create(name: string, requestedAmount: number, financedAmount: number, duration: number, accountability: string, files: File[]) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('requestedAmount', requestedAmount.toString());
        formData.append('financedAmount', financedAmount.toString());
        formData.append('duration', `P${duration}M`);
        formData.append('accountability', accountability);
        if(files !== undefined) {
            files.forEach(file => {
                formData.append('files', file);
            })   
        }     
        return http.post(`${urlBase}/`, formData)
    }
}

export default new CreditRequestService();