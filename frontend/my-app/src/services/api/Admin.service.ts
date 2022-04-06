import http from "./https-common"

const urlBase: string = "admin"
class AdminService {
    getAllUsers() {
        return http.get(`${urlBase}/allusers`)
    }

    getAllRoles() {
        return http.get(`${urlBase}/allRoles`)
    }

    getCustomerRoles() {
        return http.get(`${urlBase}/customerRoles`);
    }

    getEmployeeRoles() {
        return http.get(`${urlBase}/employeeRoles`);
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

    deactivate(id: string){
        return http.put(`${urlBase}/users/${id}`)
    }
}

export default new AdminService();