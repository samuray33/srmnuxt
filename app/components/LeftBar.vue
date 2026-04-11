<script setup lang="ts">
// state
import { useUserData } from '~/store/userData';
let userData = useUserData();

// router
let router = useRouter();

// личный кабинет
let personAcc = () => {
    if(userData.userRole == 'admin'){
        router.push('/adminPanel');
    }
    else{
        router.push('/');
    }
}

// выход
let exit = () => {
    router.push('/entrance');
}
</script>

<template>
   <slot>
    <section class="leftBar">
        <h1 @click="personAcc">Личный кабинет</h1>
        <h1 @click="router.push('/tasks')">{{ userData.userRole == 'admin' ? 'Все задачи' : 'Свободные задачи' }} </h1>
        <h1 @click="router.push('/createPages')" v-if="userData.userRole == 'admin'">Создать задачу</h1>
        <h1 @click="exit">Выйте из аккаунта</h1>
    </section>
   </slot>
</template>

<style scoped>
section{
    font-size: 2vh;
    width: 45vh;
    height: 85vh;
    padding: 3vh 2vh;
    color: #fff;
    background-color: rgb(39, 39, 39);
}
h1{
    margin-bottom: 2vh;
    border: 0.1vh solid #fff;
    padding: 1vh 2vh;
    border-radius: 1vh;
    cursor: pointer;
    transition: 0.5s all;
}
h1:hover{
    transition: 0.5s all;
    background-color: #fff;
    color: #000;
}

</style>
