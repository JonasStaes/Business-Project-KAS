import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "credit_request"

class CreditRequestService {
    create(name: string, requestedAmount: number, totalAmount: number, duration: number, accountability: string, files: File) {
        return http.post(`${urlBase}/`, {name, requestedAmount, totalAmount, duration, accountability, files})
    }
}