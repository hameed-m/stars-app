<script setup>
import { ref, onMounted, watch } from "vue";

const firstElement = ref(null);
const secondElement = ref(null);
const firstElementHeight = ref(0);

const updateHeight = () => {
  if (firstElement.value) {
    firstElementHeight.value = firstElement.value.offsetHeight;
    secondElement.value.style.height = `${firstElementHeight.value}px`;
  }
};

onMounted(() => {
  updateHeight();
});

watch(firstElement, (newvalue) => {
    console.log("Element 1 is changing")
  if (secondElement.value) {
    secondElement.value.style.height = `${newvalue.value.offsetHeight}px`;
  }
}, {deep:true});

const increaseHeight = () => {
  if (firstElement.value) {
    firstElement.value.style.height = `${
      firstElement.value.offsetHeight + 50
    }px`;
    updateHeight();
  }
};
</script>

<template>
  <v-card
    style="background-color: lightblue; padding: 20px; margin-bottom: 10px"
  >
    <v-card-content
      ><div ref="firstElement" style="max-width: 100%">
        {{ "⭐".repeat(100) }}
      </div></v-card-content
    >
    <v-card-action-buttons>
      <button @click="increaseHeight">Increase Height</button>
    </v-card-action-buttons>
  </v-card>
  <v-card
    style="background-color: lightblue; padding: 20px; margin-bottom: 10px"
  >
    <v-card-content
      ><div
        ref="secondElement"
        :style="{
          height: `${firstElementHeight}px`,
          backgroundColor: 'lightcoral',
          padding: '20px',
        }"
      ></div
    ></v-card-content>
    <v-card-action-buttons>
      <button @click="increaseHeight">Increase Height</button>
    </v-card-action-buttons>
  </v-card>
</template>
