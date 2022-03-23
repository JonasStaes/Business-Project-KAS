import http from "./https-common"

const urlBase: string = "admin"
class UserService {
    getAll() {
        return http.get(`${urlBase}/allcustomers`)
    }

    create(name: string, email: string, companyNr: number, active: boolean) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('companyNr', companyNr.toString())
        formData.append('active', active.toString());  
        return http.post(`${urlBase}/`, formData)
    }

    deactivate(id: string){
        return http.put(`${urlBase}/allcustomers/${id}`)
    }
}

export default new UserService();