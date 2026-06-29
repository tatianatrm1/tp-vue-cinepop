<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <v-app  class="app-bg">
    <RouterView name="navbar" />

    <v-main>
      <RouterView />
    </v-main>

    <Footer />
  </v-app>
</template>

<style scoped>
.app-bg {
  background-color: #1a1717;
  color: white;
}
</style>