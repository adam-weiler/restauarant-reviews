import http from "../http-common.js";   // All URLs start with the base "http://localhost:5000/api/v1/restaurants".

class RestaurantDataService {   // Functions that are going to make API calls and return the information.
    getAll(page = 0) {  // Default page of 0.
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) {   // query is userInput. by is either "name", "zipcode", or "cuisine".
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review", data);
    }

    updateReview(data) {
        return http.put("/review", data);
    }

    deleteReview(id) {
        return http.delete(`/review?id=${id}`);
    }

    getCuisines(id) {
        return http.get(`/cuisines`);
    }

}

export default new RestaurantDataService();