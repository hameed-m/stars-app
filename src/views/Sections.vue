<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, onRenderTriggered, onUpdated } from "vue";
const route = useRoute();

const section = ref({});
const cards = ref([]);

const students = ref([]);
const height = ref(0);


onMounted(async () => {
  fetch(
    `https://teacherahmad.pythonanywhere.com/api/sections/${
      route.params.id / 12 - 12
    }/`
  )
    .then((res) => res.json())
    .then((json) => (section.value = json))
    .then(() =>
      fetch(
        `https://teacherahmad.pythonanywhere.com/api/students/?section__id=${section.value.id}`
      )
    )
    .then((res) => res.json())
    .then((json) =>
      json.sort((a, b) => (a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0))
    )
    .then((sorted) => (students.value = sorted))
    .then(() =>
      students.value.map((student, index) => (student["order"] = index + 1))
    );

    console.log(cards.value)
    height = await cards.value[0].offsetHeight
  
});
</script>

<template>
  <p>{{ height }}</p>
  <v-app-bar style="left: auto !important" scroll-behavior="collapse">
    <h2 style="text-align: center; width: 100%">{{ section.name }}</h2>
  </v-app-bar>
  <v-container>
    <v-row>
      <v-col
        v-for="student in students"
        :key="student.id"
        cols="12"
        sm="12"
        md="6"
        lg="4"
        class="v-col"
      >
        <v-card ref="cards" :id="student.order" variant="flat">
          <v-card-title
            ><h3>{{ student.order }}</h3></v-card-title
          >
          <v-card-text>
            <v-avatar v-if="student.picture" :src="student.picture" />
            <p v-if="student.order === 2">{{ 5 + 2 }}</p>
            <div class="student-info">
              <span class="student-name">{{ student.name }}</span>
              <br />
              <div class="effort-stars">
                <v-list-item-icon>
                  <v-icon
                    v-for="n in student.stars + 15"
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
.v-app-bar {
  min-width: 50%;
  background-color: #f5f7d9;
}
.v-card-title {
  display: flex;
  align-items: center;
  background-color: white;
  min-width: 60px;
}

.student-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: fit-content;
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
  border-radius: 4px;
  padding: 1rem;
}
.v-row {
  background: linear-gradient(to right, #f7cac9, #f5f7d9);
}
.v-card {
  display: flex;
  flex-direction: row;
  border: solid #ffffff;
  border-radius: 0px;
  border-width: 5px;
  background-color: #f5f7d900;
  height: 13vh;
  height: fit-content;
}
.v-col {
  width: 100%;
  padding: 0;
}
</style>
