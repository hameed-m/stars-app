<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app> 

</template>

<script setup>
  import {ref} from "vue"

  fetch("https://teacherahmad.pythonanywhere.com/api/students/")
  .then((res) => res.json())
</script>
