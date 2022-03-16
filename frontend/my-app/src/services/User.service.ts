import http from "./https-common"

const urlBase: string = "admin"
class UserService {
    getAll() {
        return http.get(`${urlBase}/allcustomers`)
    }

    create(name: string, email: string, active: boolean) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('active', active.toString());  
        return http.post(`${urlBase}/`, formData)
    } 
}

export default new UserService();