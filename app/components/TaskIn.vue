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
let emits = defineEmits(['close'])
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


// type для коментария
type TComment = {
  userId: string | undefined | number,
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
let commentGet = ref<string>();
// добавление коментария в список
let addComment = async() => {
  if(!commentGet.value){
    alert("Вы не написали коментарий");
    return;
  }
  try{
    let commentBody = ref<TComment>({
      userId: userData.userId,
      taskId: findActiveData.value?.id,
      comment: commentGet.value
    });
    await $fetch(url.commentUrl, {
      method:'POST',
      body: commentBody.value
    });
  }catch(error){
    alert("Не удалось прокоментировать");
  }
  commentGet.value = "";
  commentsRefresh();
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
</script>

<template>
    <section class="content">
      <section class="rightData">
        <header>
          <h1> Подробнее о задаче</h1>
        </header>

        <div class="line"></div>

        <h1>Название задачи: {{ findActiveData?.nameTask }}</h1>
        <h2>Статус: {{ userActive ? userActive : "Свободная задача"}}</h2>
        <h2>Описание Задачи: <br /> {{ findActiveData?.descriptionTask }}</h2>

        <div class="line"></div>

        <!-- Поля ввода коментария -->
        <section class="Coommet">
           <input v-model="commentGet" class="CoommetCreate" type="text" placeholder="Напишите коментарий">
           <UIcomponentsButton @click="addComment" value="Отпавить" color="#fff", background="#000"/>
        </section>

        <!-- Список коментариев -->
        <div class="commets" v-for="comment in commentsThisTask" :key="comment.id">
          <h1 style="color: silver;"> {{ userData.userRole }}: {{ userData.userName }}</h1>
         <h1>{{ comment.comment }}</h1>
        </div>

        <div class="line"></div>

        <section class="action">
          <UIcomponentsButton v-if="userData.userRole == 'admin'" value="Удалить Задачу" color="#fff" background="red"/>
          <UIcomponentsButton value="Задача готова" color="#fff" background="#000"/>
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

/* действие */
.action{
  display: flex;
  justify-content: space-around;
  margin-top: 5vh;
}
</style>
