<script setup lang="ts">
// store
import { useUrl } from '~/store/url';
import { useUserData } from '~/store/userData';
let userData = useUserData();
let url = useUrl();

// type для Tasks
type TTask = {
  nameTask: string,
  descriptionTask: string,
  importance: number,
  userId: string
}
// получаем список задач
let {data: taskData, error: taskError, pending: taskPending, refresh: taskRefresh} = await useFetch<TTask[]>(url.taskUrl, {
  method: "GET"
});
// находим задачи именно этого пользователя 
let personTasks = taskData.value?.filter(task => task.userId == userData.userId?.toString());

</script>

<template>
    <section class="content">
      <section class="rightData">
        <div class="user">
          <h1> Пользователь: {{ userData.userName }} {{ userData.userSurname }}</h1>
        </div>

        <div class="line"></div>

        <div class="headerPersonTasks">
          <h1>Активные задачи</h1>

          <!-- задачи именно этого пользователя -->
           <div v-for="task in personTasks" class="personTasks">
              <h1>Название: {{ task.nameTask }}</h1>
              <h2>Срочность: {{ task.importance }}/100</h2>
           </div>
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
.user, .headerPersonTasks > h1{
  text-align: center;
}
.line{
  border-bottom: 0.1vh solid #000;
}

.personTasks{
  border: 0.1vh solid #000;
  margin: 1vh;
  padding: 1vh;
  border-radius: 1vh ;
  transition: 0.3s all;
}
.personTasks:hover{
  background-color: rgb(39, 39, 39);
  color: #fff;
  transition: 0.3s all;
  cursor: pointer;
}
</style>
