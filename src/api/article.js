import api from "./";

export function getArticles(title, page, limit) {
    return api.get('/article', {
        params: {
            title, page, limit
        }
    })
}

export function getArticleById(id) {
    return api.get(`/article/${id}`)
}

export function postArticle(data) {
    return api.post(`/article`, data)
}

export function putArticle(id, data) {
    return api.post(`/article/${id}`, data)
}

export function deleteArticle(id) {
    return api.delete(`/article/${id}`)
}