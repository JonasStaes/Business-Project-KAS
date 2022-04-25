import AuthService from "./Auth.service";
import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "compliance"

class ComplianceService {

    getAll() {
        return http.get(`${urlBase}/all`)
    }
}    
export default new ComplianceService();