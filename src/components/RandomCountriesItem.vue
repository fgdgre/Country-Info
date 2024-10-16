<script setup lang="ts">
import { ref } from 'vue'

import { API_URL } from '@/constants'
import type { Country } from '@/types'

import RandomCountriesSceleton from './RandomCountriesSkeleton.vue'

const props = defineProps<{
  country: Country
}>()

const nextCountryHolidaysName = ref('')
const nextCountryHolidaysDate = ref('')

const isLoading = ref(false)
const error = ref<any>(null)

const fetchNextCountryHolidays = async () => {
  try {
    isLoading.value = true

    const result = await fetch(
      API_URL + `/NextPublicHolidays/${props.country.countryCode}`,
    )

    const data = await result.json()
    if (data && data.length) {
      nextCountryHolidaysName.value = data[0].name
      nextCountryHolidaysDate.value = data[0].date
    }
  } catch (err) {
    error.value = err
  } finally {
    isLoading.value = false
  }
}

fetchNextCountryHolidays()
</script>

<template>
  <div v-if="!isLoading" class="border p-3">
    <router-link :to="`/country/${country.name}/${country.countryCode}`">
      {{ country.name }}
    </router-link>
    <p>{{ nextCountryHolidaysName }} - {{ nextCountryHolidaysDate }}</p>
  </div>
  <random-countries-sceleton v-else />
</template>
