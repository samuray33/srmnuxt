<script setup lang="ts">
// store
import { useUrl } from '~/store/url';
import { useUserData } from '~/store/userData';
let userData = useUserData();
let url = useUrl();

// router
let router = useRouter();

// type для Tasks
type TTask = {
  nameTask: string,
  descriptionTask: string,
  importance: number,
  userId: string,
  isReady: boolean,
  id: string
}
// получаем список задач
let {data: taskData, error: taskError, pending: taskPending, refresh: taskRefresh} = await useFetch<TTask[]>(url.taskUrl, {
  method: "GET"
});
// находим задачи именно этого пользователя 
let personTasks = computed(() => {
  return taskData.value?.filter(task => task.userId == userData.userId?.toString() && task.isReady == false)
});

//открытие подробнее о задачи в виде компонента ради тренеровки(так делать нельзя знаю знаю) (и лучше этот кусок передать в store)
let Task = ref<boolean>(false);

// что бы пропсом указать какой таск открыт в данный момент
let idTaskActive = ref();
let taskActive = (id: string) => {
  Task.value = true;
  idTaskActive.value = id;
}
// обнова списка полсе закрытие компонента
let refreshTask = () => {
  taskRefresh();
}
</script>

<template>
    <section class="content">
      <section v-if="!Task" class="rightData">
        <div class="user">
          <h1> Пользователь: {{ userData.userName }} {{ userData.userSurname }}</h1>
        </div>

        <div class="line"></div>

        <div class="headerPersonTasks">
          <h1>Активные задачи</h1>

          <!-- задачи именно этого пользователя -->
           <div @click="taskActive(task.id)" v-for="task in personTasks" class="personTasks">
              <h1 style="white-space: normal; word-wrap: break-word;">Название: {{ task.nameTask }}</h1>
              <h2>Срочность: {{ task.importance }}/100</h2>
           </div>
        </div>
      </section>

      <section v-if="Task" class="rightData">
        <!-- подробнее о задаче -->
        <TaskIn @close="Task = false" :idTaskActive @refreshTask="refreshTask"></TaskIn>
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
