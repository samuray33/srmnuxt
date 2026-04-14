<script setup lang="ts">
// props
let props = defineProps({
  
});
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

</script>

<template>
    <section class="content">
      <section class="rightData">
        <header>
          <h1> Подробнее о задаче</h1>
        </header>

        <div class="line"></div>

        <UIcomponentsButton class="close" @click="emits('close');" value="Закрыть" color="#fff" background="#000" />
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
}

.close{
  margin: 10vh 0vh 0vh 70vh;
}
</style>
