<script setup>
import { computed } from 'vue';

const props = defineProps({value: Number, size: Number});

let colorProgBar = computed(() => {
  if (props.value <= 79) {
    return "black";
  } else {
    return "red";
  }
});
</script>

<template>
  <svg :width="props.size" :height="props.size" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="80"
      fill="transparent"
      stroke="silver"
      stroke-width="20">
    </circle>

    <circle cx="100" cy="100" r="80"
      fill="transparent"
      :stroke="colorProgBar"
      stroke-width="20"
      pathLength="100"
      transform="rotate(-90 100 100)"
      :stroke-dasharray="`${value} 100`">
    </circle>

    <text
      x="100"
      y="100"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="30"
      font-weight="bold"
      fill="black">
      {{ value }}/100
    </text>
  </svg>
</template>