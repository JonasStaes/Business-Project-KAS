import http from "./https-common"

const urlBase: string = "admin"
class UserService {
    getAll() {
        return http.get(`${urlBase}/allcustomers`)
    }

    create(name: string, email: string, active: boolean) {
        return http.post(`${urlBase}/`, {name, email, active})
    } 
}

export default new UserService();