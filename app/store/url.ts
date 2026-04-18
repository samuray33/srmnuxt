export const useUrl = defineStore('url', () => {
    let userUrl: string = "http://localhost:4000/users";
    let taskUrl: string = "http://localhost:4000/tasks"
    let commentUrl: string = "http://localhost:4000/comments"

    return {userUrl, taskUrl, commentUrl}
});