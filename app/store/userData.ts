import { ref } from "vue"
export const useUserData = defineStore('userData', () => {
    let userName = ref<string>("");
    let userSurname = ref<string>("");
    let userEmail = ref<string>("");
    let userPassword  = ref<string>("");
    let userRole = ref<string>("");

    return {userName, userSurname, userEmail, userPassword, userRole}
})