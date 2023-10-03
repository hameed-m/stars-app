<script setup>
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    const route = useRoute()

    const section = ref({})

    const students = ref([])

    onMounted(() => {
        fetch(`https://teacherahmad.pythonanywhere.com/api/sections/${route.params.id / 12 - 12}/`)
            .then(res => res.json())
            .then(json => section.value = json)
            .then(data => fetch(`https://teacherahmad.pythonanywhere.com/api/students/?section__id=${section.value.id}`))
            .then(res => res.json())
            .then(json => json.sort((a, b) => a.stars>b.stars?-1:a.stars<b.stars?1:0))
            .then(sorted => students.value = sorted)

        
    })

</script>

<template>
    <v-app-bar color="indigo-darken-4" scroll-behavior="hide">
        <v-app-bar-title>
            <h3 style="text-align: center;">{{ section.name }}</h3>
        </v-app-bar-title>
    </v-app-bar>
    <v-card
        class="ma-5 pa-3"
        variant="elevated"
        color="blue-darken-4"
    >
        <v-row>
            <v-col
                v-for="student in students" :key="student.id"
                cols="12"
                sm="12"
                md="6"
                lg="3"
            >
                <v-card                 
                    variant="tonal"
                    color="white"
                >
                    <v-card-title><h2>{{ student.name }} ({{ student.stars }})</h2></v-card-title>
                    <v-card-text><br/><h1>{{ "⭐".repeat(student.stars) }}</h1></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>