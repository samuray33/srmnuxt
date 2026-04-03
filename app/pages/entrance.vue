<script setup lang="ts">
// тут мы явно указываем ему какой лейаут выбрать для этой страницы
definePageMeta({
    layout: "entrance-layout"
});

</script>

<template>
    <section class="content">
        <div class="form">
            <h1>Вход</h1>

            <h2>Логин</h2>
            <input type="email">

            <h2>Пароль</h2>
            <input type="password">

            <section class="btms">
                <UIcomponentsButton value="Вход" color="#000" background="white"/>
                <UIcomponentsButton value="Регистрация" color="#fff" background="rgb(39, 39, 39)"/>
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
    margin-top: 20vh;
    flex-direction: column;
    /* border: 0.1vh solid rgb(39, 39, 39); */
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
