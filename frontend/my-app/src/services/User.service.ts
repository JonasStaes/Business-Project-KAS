import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "user"

//I still need to double check how we're uploading files, so leave that out for now
class UserService {
    getAll() {
        return http.get(`${urlBase}/all`)
    }

    create(name: string, email: string, active: boolean) {
        return http.post(`${urlBase}/`, {name, email, active})
    }
}

export default new UserService();