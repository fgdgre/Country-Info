<script setup lang="ts">
import type { Country } from '@/types'
import RandomCountriesItem from './RandomCountriesItem.vue'

defineProps<{
  randomCountries: Country[]
}>()
</script>

<template>
  <div>
    <h1 class="text-[20px] text-center mb-[25px]">Random countries widjet</h1>
    <ul class="border border-black mb-[20px]">
      <li v-for="country in randomCountries" :key="country.countryCode">
        <random-countries-item :country />
      </li>
    </ul>
  </div>
</template>
