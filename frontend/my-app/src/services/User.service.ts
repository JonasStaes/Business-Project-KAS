import http from "./https-common"

const urlBase: string = "admin"
class UserService {
    getAllUsers() {
        return http.get(`${urlBase}/allusers`)
    }

    getAllRoles() {
        return http.get(`${urlBase}/allroles`);
    }

    createCustomer(name: string, email: string, companyNr: number) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('companyNr', companyNr.toString())
        return http.post(`${urlBase}/newCustomer`, formData)
    } 

    createEmployee(name: string, email: string, roles: Array<string>) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email); 
        if(roles !== undefined) {
            roles.forEach(role => {
                formData.append('roles', role);
            })   
        } 
        return http.post(`${urlBase}/newEmployee`, formData)
    }
}

export default new UserService();