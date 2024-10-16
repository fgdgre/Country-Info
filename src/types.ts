export type Country = {
  name: string
  countryCode: string
}

export type CountryWithHolidays = {
  date: string
  types: string[]
} & Country
