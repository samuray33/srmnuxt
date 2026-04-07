<script setup lang="ts">
// store
import { useUserData } from '~/store/userData';
let userData = useUserData();


</script>

<template>
    <section class="content">
      <!-- leftBar -->
      <aside>
        <LeftBar />
      </aside>

      <section class="rightData">
        <div class="user">
          <h1> Пользователь: {{ userData.userName }} {{ userData.userSurname }}</h1>
        </div>

        <div class="line"></div>

        <div class="personTasks">
          <h1>Активные задачи</h1>
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

aside{
  position: fixed;
  top: 10vh;
  left: -1vh;
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
</style>
