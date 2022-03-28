
import http from "./https-common"

const urlBase: string = "rating_agent"

class RatingAgentService {
    getAll() {
        return http.get(`${urlBase}/all`)
    }
}

export default new RatingAgentService();