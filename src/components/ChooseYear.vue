<script setup lang="ts">
defineProps<{ selectedYear: number }>()

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
</script>

<template>
  <div class="flex justify-center gap-x-[5px] items-center">
    <button
      v-for="year in years"
      :key="year"
      class="border flex items-center justify-center shadow-sm rounded-md px-2 py-1 disabled:bg-gray-300 hover:bg-gray-100"
      :disabled="selectedYear === year"
      @click="$emit('yearChanged', year)"
    >
      {{ year }}
    </button>
  </div>
</template>
