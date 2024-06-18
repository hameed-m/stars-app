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
    .then(() =>
      students.value.map((value, index) => (value["order"] = index + 1))
    );
});
</script>

<template>
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
      >
        <v-card variant="flat">
          <v-card-title
            ><h3>{{ student.order }}</h3></v-card-title
          >
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
.v-app-bar {
  min-width: 50%;
  background-color: #f5f7d9;
}
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
  border-radius: 4px; /* Add some rounded corners */
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
}
.v-col-xxl,
.v-col-xxl-auto,
.v-col-xxl-12,
.v-col-xxl-11,
.v-col-xxl-10,
.v-col-xxl-9,
.v-col-xxl-8,
.v-col-xxl-7,
.v-col-xxl-6,
.v-col-xxl-5,
.v-col-xxl-4,
.v-col-xxl-3,
.v-col-xxl-2,
.v-col-xxl-1,
.v-col-xl,
.v-col-xl-auto,
.v-col-xl-12,
.v-col-xl-11,
.v-col-xl-10,
.v-col-xl-9,
.v-col-xl-8,
.v-col-xl-7,
.v-col-xl-6,
.v-col-xl-5,
.v-col-xl-4,
.v-col-xl-3,
.v-col-xl-2,
.v-col-xl-1,
.v-col-lg,
.v-col-lg-auto,
.v-col-lg-12,
.v-col-lg-11,
.v-col-lg-10,
.v-col-lg-9,
.v-col-lg-8,
.v-col-lg-7,
.v-col-lg-6,
.v-col-lg-5,
.v-col-lg-4,
.v-col-lg-3,
.v-col-lg-2,
.v-col-lg-1,
.v-col-md,
.v-col-md-auto,
.v-col-md-12,
.v-col-md-11,
.v-col-md-10,
.v-col-md-9,
.v-col-md-8,
.v-col-md-7,
.v-col-md-6,
.v-col-md-5,
.v-col-md-4,
.v-col-md-3,
.v-col-md-2,
.v-col-md-1,
.v-col-sm,
.v-col-sm-auto,
.v-col-sm-12,
.v-col-sm-11,
.v-col-sm-10,
.v-col-sm-9,
.v-col-sm-8,
.v-col-sm-7,
.v-col-sm-6,
.v-col-sm-5,
.v-col-sm-4,
.v-col-sm-3,
.v-col-sm-2,
.v-col-sm-1,
.v-col,
.v-col-auto,
.v-col-12,
.v-col-11,
.v-col-10,
.v-col-9,
.v-col-8,
.v-col-7,
.v-col-6,
.v-col-5,
.v-col-4,
.v-col-3,
.v-col-2,
.v-col-1 {
  width: 100%;
  padding: 0px;
}
</style>
