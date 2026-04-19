<script setup lang="ts">
// store
import { useUrl } from '~/store/url';
import { useUserData } from '~/store/userData';
let url = useUrl();
let userData = useUserData();

// props
let props = defineProps<{
  idTaskActive: string,
}>();

// emits
let emits = defineEmits(['close', 'refreshTask']);
// type для Tasks
type TTask = {
  nameTask: string,
  descriptionTask: string,
  importance: number,
  userId: string,
  isReady: boolean,
  id: string
}

// получаем данные 
let {data: taskData, error: taskError, refresh:taskRefresh, pending: taskPending} = await useFetch<TTask[]>(url.taskUrl, {
  method: "GET",
});
// находим выбранную задачу 
let findActiveData = computed(() => {
  if(!taskData.value){
    return;
  }
  return taskData.value?.find(task => task.id == props.idTaskActive)
});


// 1. Указываем, что ждем массив любых объектов (<any[]>)
let {  data: allUsers } = await useFetch<any[]>(url.userUrl, { method: "GET" });

// 2. Функция поиска
function getUserName(id: string) {
  // Проверка: если массив пуст или не загрузился
  if (!allUsers.value || !Array.isArray(allUsers.value)) return id; 
  
  // Теперь TS знает, что это массив, и .find() доступен
  let user = allUsers.value.find((u) => u.id == id);
  
  return user ? user.name : id; 
}

// type для коментария
type TComment = {
  userId: string | undefined | number | any,
  taskId: string | undefined,
  comment: string,
  id?: string;
}
// получение списка коментариев (чтение)
let {data: commentData, pending: commentsPending, refresh: commentsRefresh, error: commentsError} = await useFetch<TComment[]>(url.commentUrl, {
  method:"GET"
});
let commentsThisTask = computed(() => {
  if(!commentData.value){
    return
  }
  let reverseComment = commentData.value.reverse();
  return reverseComment.filter(comment => comment.taskId == findActiveData.value?.id);
});

// переменные для добавление
let commentGet = ref<string>('');
// добавление коментария в список
let addComment = async () => {
  if (!commentGet.value.trim()) {
    alert("Вы не написали комментарий");
    return;
  }
  try {
    const body = {
      userId: userData.userId,
      taskId: findActiveData.value?.id,
      comment: commentGet.value
    };

    await $fetch(url.commentUrl, {
      method: 'POST',
      body: body
    });

    commentGet.value = "";
    commentsRefresh();
  } catch (error) {
    console.error(error);
    alert("Не удалось прокомментировать");
  }
}

// получение имени пользователя который сейчас ведет это дело
let userActive = ref<string>('')  
let userTask = async() => {
  let user:any = await $fetch(url.userUrl, {
    method:'GET'
  });
  for(let i = 0; i < user.length; i++){
    if(user[i].id == findActiveData.value?.userId){
      userActive.value = user[i].name;
    }
  }
}
userTask();

// Значенеи и свойства для кнопки взять задача выполнить задача востановить задачу
let valueTask = computed(() => {
  if(findActiveData.value?.userId == "Свободная задача"){
    return "Взять задачу";
  }
  if(findActiveData.value?.isReady == true){
    return "Востановить задачу";
  }
  if(findActiveData.value?.isReady == false){
    return "Задача выполнена"
  }
});

// востановить задачу или же выполнить задачу
const newStatus = !findActiveData.value?.isReady;  // Если сейчас false (не готова), ставим true (готова). И наоборот.
let isReadyTask = async() => {
  try{
    await $fetch(url.taskUrl + '/' + props.idTaskActive, {
      method: 'PATCH',
      body: {isReady: newStatus}
    });
    emits('refreshTask');
    emits('close');
  }catch(error){
    alert("Не удалось изменить статус задачи");
  }
}

// удаление задачи
let delTask = async() => {
  try{
    await $fetch(url.taskUrl + '/' + props.idTaskActive, {
      method: 'DELETE'
    });
    emits('refreshTask');
    emits('close');
  }catch(error){
    alert("не удалось удалить задачу");
  }
}
</script>

<template>
    <section class="content">
      <section class="rightData">
        <header>
          <h1> Подробнее о задаче</h1>
        </header>

        <div class="line"></div>

        <h1 style="white-space: normal; word-wrap: break-word;">Название задачи: {{ findActiveData?.nameTask }}</h1>
        <h2>Статус: {{ userActive ? userActive : "Свободная задача"}}</h2>
        <h2 style="white-space: normal; word-wrap: break-word;">Описание Задачи: <br /> {{ findActiveData?.descriptionTask }}</h2>

        <div class="line"></div>

        <!-- Поля ввода коментария -->
        <section class="Coommet">
           <input v-model="commentGet" class="CoommetCreate" type="text" placeholder="Напишите коментарий">
           <UIcomponentsButton @click="addComment" value="Отпавить" color="#fff", background="#000"/>
        </section>

        <!-- Список коментариев -->
        <div class="commets" v-for="comment in commentsThisTask" :key="comment.id">
          <!-- * -->
          <h1 style="color: silver;"> {{ getUserName(comment.userId) }} </h1> 
         <h1>{{ comment.comment }}</h1>
        </div>

        <div class="line"></div>

        <section class="action">
          <UIcomponentsButton @click="delTask" v-if="userData.userRole == 'admin'" value="Удалить Задачу" color="#fff" background="red"/>
          <UIcomponentsButton @click="isReadyTask" :value="findActiveData?.isReady == true ? 'Востановить задачу' : 'Задача готова' " color="#fff" background="#000"/>
          <UIcomponentsButton @click="emits('close')" value="Закрыть" color="#000" background="#fff" />
        </section>

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

header{
  text-align: center;
}
.line{
  border-bottom: 0.1vh solid #000;
  margin: 3vh;
}

/* создание комментария */
.Coommet{
  display: flex;
  justify-content: space-around;
  margin-bottom: 5vh;
}
.CoommetCreate{
  padding: 1vh 2vh;
  font-size: 3vh;
  height: 5vh;
  width: 80%;
  border-radius: 5vh;
  outline: none;
  border: 0.1vh solid #000;
}

/* коменты */
.commets{
  margin-top: 1vh;
  border: 0.1vh solid #000;
  padding: 2vh;
  border-radius: 1vh;
  background-color: #000;
  color: #fff;
}
.commets h1{
  white-space: normal;
  word-wrap: break-word;
}

/* действие */
.action{
  display: flex;
  justify-content: space-around;
  margin: 5vh 5vh;
}
</style>
