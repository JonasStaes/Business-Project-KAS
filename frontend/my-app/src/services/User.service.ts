import http from "./https-common"

const urlBase: string = "user"
class UserService {
    requestUserFinalization(companyNr: number) {
        let formData = new FormData();
        formData.append("companyNr", companyNr.toString());
        return http.post(`${urlBase}/requestCustomer`, formData);
    }

    finalizeCustomer(
        token: string,
        password: string, 
        township: string, 
        homeNumber: number, 
        streetName: string, 
        postalCode: number, 
        birthplace: string, 
        birthDate: string, 
        phoneNr: number, 
        socialRegistryNr: number) {
        
            let formData = new FormData();
            formData.append("token", token)
            formData.append("password", password);
            formData.append("township", township);
            formData.append("homeNumber", homeNumber.toString());
            formData.append("streetName", streetName);
            formData.append("postalCode", postalCode.toString());
            formData.append("birthPlace", birthplace);
            formData.append("birthDate", birthDate.toString());
            formData.append("phoneNr", phoneNr.toString());
            formData.append("socialRegistryNr", socialRegistryNr.toString());
            return http.put(`${urlBase}/finalizeCustomer`, formData);
    }
}

export default new UserService();