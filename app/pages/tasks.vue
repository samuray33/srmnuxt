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
  userId: string,
  isReady: boolean,
  id: string
}
// получаем список задач
let {data: taskData, error: taskError, pending: taskPending, refresh: taskRefresh} = await useFetch<TTask[]>(url.taskUrl, {
  method: "GET"
});

// если пользователь не админ то только свободные если админ то все задчи (и не завершенные)
let auntifikateTasks = computed(() => {
  if (!taskData.value) 
    return [];

  if(userData.userRole == 'admin'){
    return taskData.value?.filter(task => task.isReady == false);
  }
  else{
    return taskData.value?.filter(task => task.userId == 'Свободная задача' && task.isReady == false);
  }
});

// удаление ($fetch - использовать для пользовательских действий не для робота seo так как useFeatch должен рабоать до компиляции)
let delTask = async(id: string) => {
  try{
    await $fetch(url.taskUrl + '/' + id, {
      method: "DELETE",
    });
  }catch(error){
    alert("Не удалось удалить задачу");
  }
  
  await taskRefresh();
}

//открытие подробнее о задачи в виде компонента ради тренеровки(так делать нельзя знаю знаю) (и лучше этот кусок передать в store)
let Task = ref<boolean>(false);

// что бы пропсом указать какой таск открыт в данный момент
let idTaskActive = ref();
let taskActive = (id: string) => {
  Task.value = true;
  idTaskActive.value = id;
}
</script>

<template>
    <section class="content">
      <section v-if="!Task" class="rightData">
        <header>
          <h1> {{ userData.userRole == 'admin' ? 'Все задачи' : 'Свободные задачи'}} </h1>
        </header>

        <div class="line"></div>

        <div @click="taskActive(task.id)" v-for="task in auntifikateTasks?.slice().reverse()" class="tasks">
          <!-- тут в зависимости от роли будет высвечиватся задачи -->
           <div>
              <h1 class="nameTask">Название: {{ task.nameTask }}</h1>
              <h2>Доступность: {{ task. userId == 'Свободная задача' ? 'Свободная задача' : 'Задача уже назначена'}}</h2>
           </div>
           <div class="rightUi">
              <UIcomponentsProgressBar :value="Number(task.importance)" :size="100" />
              <UIcomponentsButton v-if="userData.userRole == 'admin'" @click.stop="delTask(task.id)" value="Удалить" background="#000" color="#fff" />
           </div>
        </div>
      </section>

      <section v-if="Task" class="rightData">
        <!-- подробнее о задаче -->
        <TaskIn @close="Task = false" :idTaskActive></TaskIn>
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
header{
  text-align: center;
}
.line{
  border-bottom: 0.1vh solid #000;
}

.tasks{
  border: 0.1vh solid #000;
  margin-top: 3vh;
  padding: 1vh;
  border-radius: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tasks:hover{
  cursor: pointer;
}
.rightUi{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 2.5vh;
}
</style>
