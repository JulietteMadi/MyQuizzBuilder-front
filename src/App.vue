<script setup>
import Header from "./components/commons/Header.vue"
import { RouterView } from 'vue-router'
import Toast from '../src/components/commons/Toast.vue'
</script>

<template>
  <header>
    <Header />
  </header>

  <main class="container mt-5 pt-5">
    <RouterView />
  </main>
  <Toast id="toast-app" />
</template>

<style scoped></style>
