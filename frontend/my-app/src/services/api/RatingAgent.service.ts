
import http from "./https-common"

const urlBase: string = "rating_agent"

class RatingAgentService {
    getAll() {
        return http.get(`${urlBase}/all`);
    }

    getOne(id: string) {
        return http.get(`${urlBase}/${id}`);
    }

    setApprovalStatus(id: string, approval: boolean, approvalNote: string) {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("approval", approval.toString());
        formData.append("approvalNote", approvalNote);
        return http.put(`${urlBase}/confirm_status`, formData);
    }
}

export default new RatingAgentService();