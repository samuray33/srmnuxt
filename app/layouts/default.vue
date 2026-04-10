<script setup lang="ts">
// store
import { useUserData } from '~/store/userData';
let userData = useUserData()

// router
let router = useRouter();

</script>

<template>
  <div class="meny">
    <h1>Роль: {{ userData.userRole }}</h1>
    <h1 class="name">TT - Task Tracker</h1>
    <h1 @click="router.push('/')">личный кабинет</h1>
  </div>
  
  <!-- leftBar -->
  <aside>
    <LeftBar />
  </aside>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
aside{
  position: fixed;
  top: 10vh;
  left: -1vh;
}

div{
  background-color: rgb(39, 39, 39);
  color: #fff;
  text-align: center;
  position: fixed;
  width: 100%;
  top: -1vh;
  left: -1vh;
  padding: 3vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

h1{
  font-size: 3vh;
  border: 0.1vh solid #fff;
  padding: 1vh;
  border-radius: 1vh;
  cursor: pointer;
  background-color: #fff;
  color: #000;
}

.name{
  font-size: 5vh;
  color: #fff;
  background-color: rgb(39, 39, 39);
  border: none;
  cursor: default;
}
</style>
