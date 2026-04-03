<script setup>
let props = defineProps({
    value: String,
    color: String,
    background: String
});
</script>

<template>
    <!-- * -->
    <button :style="{ color: props.color, background: props.background}"> {{ props.value }} </button>
</template>

<style scoped>
button{
    padding: 1.5vh 5vh;
    font-size: 2.5vh;
    border: 0.1vh solid #000;
    cursor: pointer;
    border-radius: 1vh;
}

</style>
