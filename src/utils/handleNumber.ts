export const showNumberMetricAffixes = (number: number) => {
  if (number < 1000) return number
  if (number >= 1000 && number < 1000000) {
    const numberText = (number / 1000).toFixed(2).replace('.', ',')
    return numberText + 'k'
  }
  if (number >= 1000000 && number < 1000000000) {
    const numberText = (number / 1000000).toFixed(2).replace('.', ',')
    return numberText + 'M'
  }
}
