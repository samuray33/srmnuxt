<script setup lang="ts">
// store
import { useUrl } from '~/store/url';
import { useUserData } from '~/store/userData';
let userData = useUserData();
let url = useUrl();

// router
let router = useRouter();

// тут мы явно указываем ему какой лейаут выбрать для этой страницы
definePageMeta({
    layout: "entrance-layout"
});

// type for dataForm
type TDataForm = {
    email: string,
    password: string
}
// получение данных из form
let dataForm: TDataForm = reactive({
    email: "",
    password: ""
});


// type for useFeatch
type TUser = {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: "admin" | "user"
    id: number;
}
// получение данных
let {data, error: userError, refresh: userRefresh, pending: userPending} = await useFetch<TUser[]>(url.userUrl, {
    method: "GET",
    immediate: false
});
//проверка есть ли такой пользователь 
const getUsers = async() => {
    await userRefresh();

    if(userError.value){
        alert("ошибка сервера");
        return;
    }
    if(!data.value){
        alert("Ошибка с получением данных");
        return;
    }
    // поиск пользователя по критериям
    const getUser = data.value.find(user => user.password == dataForm.password && user.email == dataForm.email);

    // если пользователь найден то переход если нет то return
    if(!getUser){
        alert("Нету такого пользователя");
        dataForm.email = "";
        dataForm.password = "";
        return;
    }else{
        // Добавление данных пользователя в pinia
        userData.userName = getUser.name;
        userData.userSurname = getUser.surname;
        userData.userEmail = getUser.email;
        userData.userPassword = getUser.password;
        userData.userRole = getUser.role;
        userData.userId = getUser.id;

        // переход на главную страницу или на старницу админа если это админ
        if(getUser.role === "admin"){
            router.push('/adminPanel');
            return;
        }
        else{
            router.push('/');
            return;
        }
    }
}
</script>

<template>
    <section class="content">
        <div style="margin-top: 35vh; font-size: 3vh;" v-if="userPending" class="pending">
            <h1 style="text-align: center">Загрузка.....</h1>
        </div>
        <div v-else class="form">
            <h1>Вход</h1>

            <h2>Логин</h2>
            <input v-model="dataForm.email" type="email">

            <h2>Пароль</h2>
            <input v-model="dataForm.password" type="password">

            <section class="btms">
                <UIcomponentsButton @click="getUsers" value="Вход" color="#000" background="white"/>
                <UIcomponentsButton @click="router.push('/registration')" value="Регистрация" color="#fff" background="rgb(39, 39, 39)"/>
            </section>
        </div>
    </section>


    
    <!-- тут будет "привет" так как если нечего не передать в слот то он будет смотреть и искать дефолтное значение -->
    <!-- <TestSlot></TestSlot> -->
    <!-- тут будет "ваше лютая тема" так как мы задаем значение и дефолтное значение игнарируется -->
    <!-- <TestSlot>ваше лютая тема</TestSlot> -->
    
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.content{
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.form{
    padding: 4vh 4vh 6vh 4vh;
    border-radius: 2vh;
    margin-top: 20vh;
    flex-direction: column;
    box-shadow: 0vh 0vh 1.5vh rgb(131, 131, 131);
    width: 60vh;
}
input{
    width: 57.5vh;
    height: 4vh;
    border-radius: 1vh;
    outline: none;
    border: 0.1vh solid rgb(39, 39, 39);
    padding: 1vh 1vh;
}
h1{
    font-size: 5vh;
    margin-bottom: 3vh;
    text-align: center;
}
h2, input{
    font-size: 3vh;
    margin-bottom: 2vh;
}

.btms{
    margin-top: 2vh;
    display: flex;
    justify-content: space-around;
}
</style>
