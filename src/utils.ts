export const getRandomNumber = (from: number, to: number) => {
  let randomNumber: number | null = null

  const minCeiled = Math.ceil(from)
  const maxFloored = Math.floor(to)
  randomNumber = Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled,
  )

  return randomNumber
}
