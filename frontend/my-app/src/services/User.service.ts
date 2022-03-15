import http from "./https-common"

//make sure this is the same as the request mapping in the backend controller.
const urlBase: string = "user"

//I still need to double check how we're uploading files, so leave that out for now
class UserService {
    getAll() {
        return http.get(`${urlBase}/all`)
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