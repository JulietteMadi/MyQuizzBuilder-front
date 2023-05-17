<script setup>
import Header from "./components/commons/Header.vue"
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <Header />
  </header>

  <main class="container mt-5 pt-5">
    <RouterView />
  </main>
</template>

<style scoped></style>
