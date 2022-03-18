import http from "./https-common"

const urlBase: string = "change_password"

class PasswordService {
    passwordChangeRequest(name: string, email: string) {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email); 
        return http.post(`${urlBase}/request`, formData)
    }

    changePassword(token: string, password: string) {
        let formData = new FormData();
        formData.append('token', token);
        formData.append('password', password); 
        return http.put(`${urlBase}/`, formData)
    }
}

export default new PasswordService();