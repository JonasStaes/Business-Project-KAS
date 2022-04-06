import axios from 'axios';

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user')!);

    if(user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    } else {
        return '';
    }
}

export default axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": authHeader(),
    }
})