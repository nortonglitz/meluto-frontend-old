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

export const formatCurrency = (value: number, minFractionDigits: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: minFractionDigits
  }).format(value)
}

export const formatNumberUnits = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { useGrouping: true }).format(value)
}
