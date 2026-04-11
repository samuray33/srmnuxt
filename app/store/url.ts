export const useUrl = defineStore('url', () => {
    let userUrl: string = "http://localhost:4000/users";
    let taskUrl: string = "http://localhost:4000/tasks"

    return {userUrl, taskUrl}
});