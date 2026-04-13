<script setup lang="ts">
// store
import { useUrl } from '~/store/url';
let url = useUrl();

// router
let router = useRouter();

// получение наших пользователей
type TUser = {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: "admin" | "user",
    id: string
}
let {data: usersData, error: usersError, refresh: usersRefresh, pending: usersPending} = await useFetch<TUser[]>(url.userUrl, {
    method: "GET"
});
// убераем из массива админа
let filtUsers = ref<TUser[]>()
if(usersData.value){
    filtUsers.value = usersData.value.filter(user => user.role != 'admin');
}

// получаем данные из формы для дальнейшего добавление поста
// type для task
type TTask = {
  nameTask: string,
  descriptionTask: string,
  importance: number,
  userId: string,
  isReady: boolean,
}
let task = reactive<TTask>({
  nameTask: "",
  descriptionTask: "",
  importance: 0,
  userId: "",
  isReady: false,
});

// добавление задачи
let addTask = async() => {
  try{
    if(!task.nameTask || !task.descriptionTask || !task.importance || !task.userId){
      alert("не все поля еще заполнены");
      return;
    }
    await fetch(url.taskUrl, {
      method: "POST",
      body: JSON.stringify(task),
    });
  }catch(error){
    alert("Не удолось добавить пост");
  }
  await router.push('/tasks');
}
</script>

<template>
    <section class="content">
      <section class="rightData">
        <header>
          <h1>Создание задачи</h1>
        </header>

        <div class="line"></div>

        <section class="create">
            <h1>Название задачи</h1>
            <input v-model="task.nameTask" type="text">

            <h1>Описание задачи</h1>
            <textarea class="descriptionTask" v-model="task.descriptionTask"></textarea>

            <h1>Срочность задачи</h1>
            <input class="importance" v-model="task.importance" type="range"><br/>
            
            <h1>Назначить</h1>
            <select v-model="task.userId">
                <option>Свободная задача</option>
                <!-- тут список наших пользователй -->
                <option v-for="user in filtUsers" :value="user.id">{{ user.name }}</option>
            </select><br/>
            
            <UIcomponentsButton @click="addTask" class="Btn" value="Готово" background="rgb(39, 39, 39)" color="#fff" />
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
.create{
  margin-top: 3vh;
}

input, textarea, select{
  width: 150vh;
  height: 6vh;
  font-size: 3vh;
  padding: 0vh 1vh;
  outline: none;
  border-radius: 1vh;
  border: 0.1vh solid #000;
}
.descriptionTask{
  padding: 1vh;
  height: 50vh;
  resize:none;
}
.importance{
  width: 100vh;
  padding: 0vh;
  font-size: 2vh;
  height: 2vh;
}

.Btn{
  margin: 5vh 0vh 0vh 70vh
}
</style>
