<script setup lang="ts">
import { useUrl } from '~/store/url';

// роутер
let router = useRouter();

// state 
let url = useUrl();

// тут мы явно указываем ему какой лейаут выбрать для этой страницы
definePageMeta({
    layout: "entrance-layout"
});

// Тип для user
type TUser = {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: "admin" | "user"
}
// переменные из v-model
let user: TUser = reactive({
    name: "",
    surname: "",
    email: "",
    password: "",
    role:"user"
})


// useFeatch - добавление пользователя в бд
let {data, refresh: addUserRefresh, error: addUserError} = await useFetch(url.userUrl, {
    immediate: false,
    method: "post",
    body: user
});
let addUser =  async () => {
    if(addUserError.value){
        alert(addUserError.value.message);
        return;
    }
    else if(user.name.length <= 0 || user.surname.length <= 0 || user.email.length <= 0 || user.password.length <= 0){
        alert("не все поля заполнены");
        return;
    }
    await addUserRefresh();
    await router.push("/entrance");
}

</script>

<template>
    <section class="content">
        <div class="form">
            <h1>Регистрация</h1>

            <h2>Имя</h2>
            <input v-model="user.name" type="text">

            <h2>Фамилия</h2>
            <input v-model="user.surname" type="text">

            <h2>Логин</h2>
            <input v-model="user.email" type="email">

            <h2>Пароль</h2>
            <input v-model="user.password" type="password">

            <section class="btms">
                <UIcomponentsButton @click="router.push('/entrance')" value="Вход" color="#000" background="white"/>
                <UIcomponentsButton @click="addUser" value="Регистрация" color="#fff" background="rgb(39, 39, 39)"/>
            </section>
        </div>
    </section>
    
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
    margin-top: 13vh;
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
