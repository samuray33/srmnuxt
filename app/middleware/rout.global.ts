// store
import { useUserData } from "~/store/userData";

export default defineNuxtRouteMiddleware ((to, from) => {
    const userData = useUserData();

    // разрешаем страницу входа
    if (to.path === '/entrance') {
        return;
    }

    // если не авторизован — редирект
    else if (!userData.userName) {
        return navigateTo('/entrance');
    }

    // если не админ — не пускаем в админку(проверяем сразу два to на две страницы)
    else if ((to.path === '/adminPanel' || to.path === '/isReadyTasks') && userData.userRole !== 'admin') {
        return navigateTo('/entrance');
    }
    // если проверка одного to
    // else if (to.path === '/adminPanel' && userData.userRole !== 'admin') {
    //     return navigateTo('/entrance'); 
    // }
}); 