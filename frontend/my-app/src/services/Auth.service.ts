import http from "./https-common"

const urlBase: string = "signin"

class AuthService {
    customerLogin(companyNr: string, password: string) {
        let formData = new FormData();
        formData.append('companyNr', companyNr)
        formData.append('password', password)
        return http.post(`${urlBase}/customer`, formData)
            .then(res => {
                if(res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    window.location.reload()
                }
            })
    };

    adminLogin(email: string, password: string) {
        let formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)
        return http.post(`${urlBase}/employee`, formData)
            .then(res => {
                if(res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    window.location.reload()
                }
            })
    }

    logout() {
        localStorage.removeItem("user");
        window.location.reload();
    };

    getCurrentUser() {
        if(localStorage.getItem('user') !== null) {
            return JSON.parse(localStorage.getItem('user')!);
        } else {
            return null;
        }
    }; 

    getCurrentUserId() {
        return this.getCurrentUser().id;
    }

    getRoles() {
        return this.getCurrentUser().roles.map((role: string) => role.toUpperCase());
    }

    isCustomer() {
        return this.getRoles().includes(("KLANT"))
    }

    isAdmin() {
        return this.getRoles().includes(("ADMINISTRATOR"))
    }
}

export default new AuthService();