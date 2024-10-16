<script setup lang="ts">
import type { Country } from '@/types'

defineProps<{
  countries: Country[]
}>()
</script>

<template>
  <ul class="flex flex-col justify-center gap-y-[5px]">
    <li v-for="country in countries" :key="country.countryCode">
      <router-link
        class="flex border rounded-mb px-3 py-1 hover:bg-gray-100 justify-center"
        :to="`/country/${country.name}/${country.countryCode}`"
        @click="$emit('select-country', country)"
      >
        {{ country.name }}
      </router-link>
    </li>
  </ul>
</template>
