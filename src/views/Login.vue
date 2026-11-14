<template>
    <h1>Login</h1>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import { login } from '../api/user';

onMounted(() => {
    login({username:'admin', password:'admin123'})
})
</script>

<style scoped>
</style>