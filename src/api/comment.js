import api from "./";

export function getCommentByArticle(articleId) {
    return api.get(`comment/${articleId}`);
}

export function putComment(commentId, content) {
    return api.put(`comment/${commentId}`, { content: content })
}

export function postComment(articleId, content) {
    return api.post(`comment`, { article: articleId, content: content })
}

export function deleteComment(articleId) {
    return api.delete(`comment/${articleId}`)
}