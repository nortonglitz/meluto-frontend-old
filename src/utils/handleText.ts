export const capitalize = (text: string) => {
  return text.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

export const formatPhone = (number: string) => {
  if (number.length > 10) {
    return `(${number.slice(0, 2)}) ${number.slice(2, 7)} ${number.slice(7, 11)}`
  } else {
    return `(${number.slice(0, 2)}) ${number.slice(2, 6)} ${number.slice(6, 10)}`
  }
}
