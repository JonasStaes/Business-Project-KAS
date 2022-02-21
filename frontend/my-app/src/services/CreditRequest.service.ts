import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "credit_request"

//I still need to double check how we're uploading files, so leave that out for now
class CreditRequestService {
    create(name: string, requestedAmount: number, financedAmount: number, duration: number, accountability: string, files: File[]) {
        return http.post(`${urlBase}/`, {name, requestedAmount, financedAmount, duration, accountability, files})
    }
}