<script setup>
    import { ref, onMounted } from 'vue'

    const editedName = ref("")
    const editedStars = ref(null)

    const student = defineProps(['student'])

    onMounted(
        () => {
            console.log(student.value)

        }
    )
    
</script>


<template>
    
</template>
