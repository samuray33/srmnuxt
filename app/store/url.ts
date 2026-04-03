export const useUrl = defineStore('url', () => {
    let userUrl: string = "http://localhost:4000/users";

    return {userUrl}
});