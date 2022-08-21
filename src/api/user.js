import api from "./";

export function getProfile(id) {
    return api.get(`user/${id}`);
}

export function putProfile({ id, data }) {
    return api.put(`user/${id}`, data)
}

export function register(payload) {
    return api.post("auth/register", payload);
}
