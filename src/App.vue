<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CountriesPage from './views/CountriesPage.vue'
</script>

<template>
  <nav v-if="$route.path != '/'" class="text-[20px] p-5">
    <RouterLink to="/">Home</RouterLink>
  </nav>

  <CountriesPage v-show="$route.fullPath === '/'" />

  <div v-if="$route.fullPath.includes('/country')">
    <RouterView />
  </div>
</template>

<style></style>
