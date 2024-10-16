<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import type { CountryWithHolidays } from '@/types'
import { API_URL } from '@/constants'

import ChooseYear from '@/components/ChooseYear.vue'
import CountryPageSceleton from '@/components/CountryPageSkeleton.vue'

const route = useRoute()

const selectedYear = ref<number>(new Date().getFullYear())

const updateYear = (year: any) => {
  selectedYear.value = year
  getCountryHolidays(year, route.params.countryCode as string)
}

const countryHolidays = ref<CountryWithHolidays[]>([])

const isLoading = ref(false)
const error = ref<any>()

getCountryHolidays(selectedYear.value, route.params.countryCode as string)

async function getCountryHolidays(year: number, code: string) {
  try {
    isLoading.value = true
    const result = await fetch(API_URL + `/PublicHolidays/${year}/${code}`)
    const data = await result.json()

    countryHolidays.value = data
  } catch (err: unknown) {
    error.value = err
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <ul
    class="flex flex-col items-center gap-y-[5px] h-[300px] overflow-y-auto mb-[25px]"
  >
    <li
      v-if="!isLoading"
      class="flex flex-col items-center justify-center border rounded-md shadow-sm w-fit px-3 py-2 min-w-[400px] max-w-[700px]"
      v-for="holiday in countryHolidays"
    >
      {{ holiday.name }} - {{ holiday.date }}
      <p v-for="holidayType in holiday.types">{{ holidayType }}</p>
    </li>
    <country-page-sceleton v-if="isLoading" type="countryPage" />
  </ul>

  <choose-year :selectedYear @yearChanged="updateYear" />
</template>
