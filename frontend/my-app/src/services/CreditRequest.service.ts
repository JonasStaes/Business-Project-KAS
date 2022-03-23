import AuthService from "./Auth.service";
import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "credit_request"

class CreditRequestService {
    getAll() {
        return http.get(`${urlBase}/all/${AuthService.getCurrentUserId()}`)
    }

    create(name: string, totalAmount: number, financedAmount: number, duration: number, accountability: string, files: File[]) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('financedAmount', financedAmount.toString());
        formData.append('totalAmount', totalAmount.toString());
        formData.append('duration', `P${duration}M`);
        formData.append('accountability', accountability);
        formData.append('parentId', AuthService.getCurrentUserId());
        if(files !== undefined) {
            files.forEach(file => {
                formData.append('files', file);
            })   
        }     
        return http.post(`${urlBase}/`, formData)
    }
}

export default new CreditRequestService();