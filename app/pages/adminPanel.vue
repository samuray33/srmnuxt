<script setup lang="ts">
// store
import { useUserData } from '~/store/userData';
let userData = useUserData();

// получение наших пользователей
type TUser = {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: "admin" | "user",
    id: number
}
let {data: usersData, error: usersError, refresh: usersRefresh, pending: usersPending} = await useFetch<TUser[]>('http://localhost:4000/users', {
    method: "GET"
});
console.log(usersData.value);
</script>

<template>
    <section class="content">
      <section class="rightData">
        <div class="user">
          <h1> Пользователь: {{ userData.userName }} {{ userData.userSurname }}</h1>
        </div>

        <div class="line"></div>

        <div class="personTasks">
          <h1>Пользователи</h1>
        </div>

        <div class="users">
            <h1 v-for="user in usersData">{{ user.name }}, {{ user.surname }} | email: {{ user.email }}</h1>
        </div>
      </section>
    </section>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.content{
	margin: 0 auto;
}

.rightData{
  margin-top: 15vh;
  margin-left: 50vh;
  font-size: 2vh;
}
.user, .personTasks > h1{
  text-align: center;
}
.line{
  border-bottom: 0.1vh solid #000;
}

.users{
    margin-top: 3vh;
}
.users > h1{
    font-size: 4vh;
    border: 0.1vh solid #000;
    margin-top: 1vh;
    padding: 2vh 2vh;
    border-radius: 1vh;
    transition: 0.3s all;
}
.users > h1:hover{
    background-color: rgb(39, 39, 39);
    color: #fff;
    transition: 0.3s all;
    cursor: pointer;
}
</style>
