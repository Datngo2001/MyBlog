import api from "./";

export function getFavoritedByArticle(articleId) {
    return api.get(`favorite/of-article/${articleId}`);
}

export function getFavoritedArticle(userId) {
    return api.get(`favorite/favorite-article/${userId}`)
}

export function postFavorited(articleId) {
    return api.post(`favorite/`, { article: articleId })
}

export function deleteFavorited(articleId) {
    return api.delete(`favorite/${articleId}`)
}