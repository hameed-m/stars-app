<script setup>
import { onMounted } from 'vue';
import { ref, watch } from 'vue'

const props = defineProps()

const students = ref(null)

const newName = ref("")
const newStars = ref(null)

const editedName = ref("")
const editedStars = ref(null)

const isSectionSelected = ref(false)

const sections = ref(["خامس/4", "خامس/5", "خامس/6"])
const sectionsDic = {
    "خامس/4": 1,
    "خامس/5": 2,
    "خامس/6": 3,
}
const section = ref(null)

const dialog = ref([])

onMounted(
    () => {

    }
)

const addStudent = () => {
    const newStudent = {
        name: newName.value,
        stars: newStars.value,
        teacher: 1,
        section: sectionsDic[section.value]
    }
    fetch('https://teacherahmad.pythonanywhere.com/api/students/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudent)
    }).then(() => fetch(`https://teacherahmad.pythonanywhere.com/api/students/?section__id=${sectionsDic[section.value]}`))
        .then(response => response.json())
        .then(json => json.sort((a, b) => a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0))
        .then(sorted => students.value = sorted)
        .then(() => { newName.value = ""; newStars.value = null })
        // .then(() => dialog.value = false)

}

const deleteStudent = (student) => {
    fetch(`https://teacherahmad.pythonanywhere.com/api/students/${student.id}/`, {
        method: "DELETE"
    }).then(() => fetch(`https://teacherahmad.pythonanywhere.com/api/students/?section__id=${sectionsDic[section.value]}`))
        .then(response => response.json())
        .then(json => json.sort((a, b) => a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0))
        .then(sorted => students.value = sorted)
        .then(() => { newName.value = ""; newStars.value = null })
}

const editStudent = (student) => {
    const editedStudent = {
        name: editedName.value,
        stars: editedStars.value,
        teacher: 1,
        section: sectionsDic[section.value]
    }

    fetch(`https://teacherahmad.pythonanywhere.com/api/students/${student.id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedStudent)
    }).then(() => fetch(`https://teacherahmad.pythonanywhere.com/api/students/?section__id=${sectionsDic[section.value]}`))
        .then(response => response.json())
        .then(json => json.sort((a, b) => a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0))
        .then(sorted => students.value = sorted)
        .then(() => { newName.value = ""; newStars.value = null })

}

watch(section, (newValue, oldValue) => {
    fetch(`https://teacherahmad.pythonanywhere.com/api/students/?section__id=${sectionsDic[newValue]}`)
        .then(response => response.json())
        .then(json => json.sort((a, b) => a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0))
        .then(sorted => students.value = sorted)

    isSectionSelected.value = true

})


</script>

<template>
    <v-app-bar color="indigo-darken-4" scroll-behavior="hide">
        <v-app-bar-title>
            <div class="nav"><v-select v-model="section" :items="sections" label="الفصل" class="select"></v-select></div>
        </v-app-bar-title>
    </v-app-bar>

    <v-card class="ma-5 pa-3" variant="elevated" color="blue-darken-4">
        <v-row>
            <v-col v-for="student in students" cols="12" sm="12" md="6" lg="3">
                <v-card variant="tonal" color="white">
                    <v-card-title>
                        <h2>{{ student.name }} ({{ student.stars }})</h2>
                    </v-card-title>
                    <v-card-text><br />
                        <h1>{{ "⭐".repeat(student.stars) }}</h1>
                    </v-card-text>

                    <v-card-actions>
                        <v-dialog width="600" :key="student.id">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" text="تعديل" color="indigo" style="font-size: 18pt;"
                                    variant="elevated" />
                            </template>
                            <v-card color="indigo-darken-4" variant="elevated" max-width="600px" @vnode-mounted="editedName=student.name; editedStars=student.stars;">

                                <v-card-title> <v-text-field label="اسم الطالب" persistent-placeholder
                                        v-model="editedName" :value=editedName /> </v-card-title>
                                <v-card-text> <v-text-field label="عدد النجوم" persistent-placeholder 
                                        v-model="editedStars" :value=editedStars type="number" /> </v-card-text>
                                <v-card-actions>
                                    <v-btn text="تعديل" style="font-size: 18pt;" color="indigo" variant="elevated" block
                                        @click="editStudent(student)" />
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-btn color="red" style="font-size: 18pt;" text="حذف" variant="flat"
                            @click="deleteStudent(student)" />
                    </v-card-actions>
                </v-card>

            </v-col>
            <v-col cols="12" sm="12" md="6" lg="3">
                <v-card class="mx-auto" color="indigo-darken-4" variant="elevated" :disabled=!isSectionSelected>
                    <v-card-title><v-text-field label="اسم الطالب" v-model="newName" /></v-card-title>
                    <v-card-text><v-text-field label="عدد النجوم" type="number" v-model="newStars" /></v-card-text>
                    <v-card-actions>
                        <v-btn text="إضافة" style="font-size: 18pt;" color="indigo" variant="elevated"
                            @click="addStudent" />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<style>
v-btn {
    font-size: x-large;
}

.select {
    width: 10px;
    max-width: 50%;
}

div .nav {
    display: flex;
    justify-content: center;
}
</style>