import type { Country } from '@/types'
import { ref, watchEffect, type Ref } from 'vue'

export function useSearch(array: Ref<Country[]>, searchQuery: Ref<string>) {
  const filteredData = ref<Country[]>([])

  watchEffect(() => {
    if (!searchQuery.value) {
      filteredData.value = array.value
    } else {
      filteredData.value = [...array.value].filter(el => {
        if (el.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
          return el
        }
      })
    }
  })
  return { filteredData }
}
