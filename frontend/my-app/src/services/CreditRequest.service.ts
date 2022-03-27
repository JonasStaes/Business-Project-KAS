import AuthService from "./Auth.service";
import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "credit_request"

class CreditRequestService {
    getAll() {
        return http.get(`${urlBase}/all/${AuthService.getCurrentUserId()}`)
    }

    create(name: string, totalAmount: number, financedAmount: number, duration: number, investmentType: string, files: File[]) {
        console.log(investmentType)
        let formData = new FormData();
        formData.append('name', name);
        formData.append('financedAmount', financedAmount.toString());
        formData.append('totalAmount', totalAmount.toString());
        formData.append('duration', `P${duration}Y`);
        formData.append('parentId', AuthService.getCurrentUserId());
        formData.append("investmentType", investmentType);
        if(files !== undefined) {
            files.forEach(file => {
                formData.append('files', file);
            })   
        }     
        return http.post(`${urlBase}/`, formData)
    }
}

export default new CreditRequestService();