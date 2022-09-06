export const capitalize = (text: string) => {
  const textArray = text.split(' ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.substring(1).toLocaleLowerCase())
  return textArray.join(' ')
}

export const formatPhone = (number: string) => {
  if (number.length > 10) {
    return `(${number.slice(0, 2)}) ${number.slice(2, 7)} ${number.slice(7, 11)}`
  } else {
    return `(${number.slice(0, 2)}) ${number.slice(2, 6)} ${number.slice(6, 10)}`
  }
}
