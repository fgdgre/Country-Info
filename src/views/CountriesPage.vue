<script setup lang="ts">
import { ref } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import RandomCountriesWidjet from '@/components/RandomCountriesWidget.vue'
import CountriesList from '@/components/CountriesList.vue'
import CountriesListSceleton from '@/components/CountriesListSkeleton.vue'

import { API_URL } from '@/constants'
import type { Country } from '@/types'
import { getRandomNumber } from '@/utils'

import { useSearch } from '@/composables/useSearch'

const countries = ref<Country[]>([])
const randomCountries = ref<Country[]>([])

const isLoading = ref(false)
const error: any = ref(null)

const getRandomCountries = (countries: Country[], itemsCount: number) => {
  const result = []

  let to = itemsCount > countries.length ? countries.length : itemsCount

  for (let index = 0; index < to; index++) {
    const randomIndex = getRandomNumber(0, countries.length)
    result.push(countries[randomIndex])
  }
  return result
}

async function getCountries() {
  try {
    isLoading.value = true
    const result = await fetch(API_URL + '/AvailableCountries')
    const data = await result.json()

    if (data && data.length) {
      countries.value = data
      randomCountries.value = getRandomCountries(data, 3)
    }
  } catch (err) {
    error.value = err
  } finally {
    isLoading.value = false
  }
}

getCountries()

const searchQuery = ref('')

const { filteredData } = useSearch(countries, searchQuery)

const currentCountry = ref<Country>()

const setCurrentCountry = (newCountry: Country) => {
  currentCountry.value = newCountry
}
</script>

<template>
  <div class="grid grid-cols-2 gap-x-[25px] p-5">
    <div>
      <div class="flex justify-between mb-[25px]">
        <h1 class="text-[20px] text-center">Countries</h1>

        <search-input v-model="searchQuery" />
      </div>

      <countries-list
        v-if="!isLoading"
        :countries="filteredData"
        @select-country="setCurrentCountry"
      />

      <countries-list-sceleton v-else />
    </div>

    <random-countries-widjet :randomCountries />
  </div>
</template>
