<script setup lang="ts">
// проверка возможности слотов
// router
let router = useRouter();

// выход
let exit = () => {
    router.push('/entrance');
}
</script>

<template>
   <slot>
    <section class="leftBar">
        <h1>Личный кабинет</h1>
        <h1>Свободные задачи</h1>
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
