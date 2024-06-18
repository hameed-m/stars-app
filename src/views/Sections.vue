<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
const route = useRoute();

const section = ref({});

const students = ref([]);

onMounted(() => {
  fetch(
    `https://teacherahmad.pythonanywhere.com/api/sections/${
      route.params.id / 12 - 12
    }/`
  )
    .then((res) => res.json())
    .then((json) => (section.value = json))
    .then((data) =>
      fetch(
        `https://teacherahmad.pythonanywhere.com/api/students/?section__id=${section.value.id}`
      )
    )
    .then((res) => res.json())
    .then((json) =>
      json.sort((a, b) => (a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0))
    )
    .then((sorted) => (students.value = sorted))
    .then(()=> students.value.map((value, index)=>value['order']=index+1));
});
</script>

<template>
  <v-app-bar
    style="left: auto; min-width: 50%"
    color="green"
    scroll-behavior="collapse"
  >
    <h3 style="text-align: center; width: 100%">{{ section.name }}</h3>
  </v-app-bar>
  <v-container>
    <v-row>
      <v-col
        v-for="(student) in students"
        :key="student.id"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-card>
          <v-card-title><h3>{{student.order}}</h3></v-card-title>
          <v-card-text>
            <v-avatar v-if="student.picture" :src="student.picture" />
            <div class="student-info">
              <span class="student-name">{{ student.name }}</span>
              <br />
              <div class="effort-stars">
                <v-list-item-icon>
                  <v-icon
                    v-for="n in student.stars"
                    :key="n"
                    color="amber darken-1"
                  >
                    mdi-star
                  </v-icon>
                </v-list-item-icon>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
    display: flex;
    align-items: center;
}

.student-info {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.student-name {
  font-size: 25px;
  font-weight: bold;
  margin-right: 10px;
}

.effort-stars {
  display: flex;
}

.effort-stars .v-icon {
  margin-right: 5px;
  font-size: 25px;
}
.v-card-text {
  background: linear-gradient(to right, #f7cac9, #f5f7d9);
  border-radius: 4px; /* Add some rounded corners */
  padding: 1rem;

}
.v-card {
  display: flex;
  flex-direction: row;
  border: 2px solid #ffeb3b; /* Example yellow border */
}
</style>
