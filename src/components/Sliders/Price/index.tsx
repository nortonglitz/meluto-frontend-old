import React, { useState } from 'react'
import { Slider } from '@mui/material'

const numberHandle = (number: number) => {
  if (number <= 10) {
    return Number((Number((number / 10).toFixed(1)) * 10000).toFixed(2))
  }

  if (number > 10 && number <= 50) {
    const result = Number((Number(((number - 10) / 40).toFixed(2)) * 100000).toFixed(2))
    if (result < 10000) {
      return 10000
    } else {
      return result
    }
  }

  if (number > 50 && number <= 100) {
    const result = Number((Number(((number - 50) / 50).toFixed(2)) * 1000000).toFixed(2))
    if (result < 100000) {
      return 100000
    } else {
      return result
    }
  }

  if (number > 100 && number <= 150) {
    const result = Number((Number(((number - 100) / 50).toFixed(2)) * 10000000).toFixed(2))
    if (result < 1000000) {
      return 1000000
    } else {
      return result
    }
  }

  if (number > 150 && number <= 160) {
    const result = Number((Number(((number - 150) / 10).toFixed(2)) * 20000000).toFixed(2))
    if (result < 10000000) {
      return 10000000
    } else {
      return result
    }
  }

  if (number > 180) {
    return 1000000000
  }
  const result = Number((Number(((number - 160) / 20).toFixed(2)) * 100000000).toFixed(2))
  if (result < 20000000) {
    return 20000000
  } else {
    return result
  }
}

interface ISliderPrice {
  setPrice: (price: number[]) => void
}

export const SliderPrice: React.FC<ISliderPrice> = ({ setPrice }) => {
  const [value, setValue] = useState([0, 1000])
  const handleChange = (value: number[]) => {
    setValue(value)
    setPrice([numberHandle(value[0]), numberHandle(value[1])])
  }
  return (
    <Slider
      value={value}
      onChange={(_, num) => handleChange(num as number[])}
      step={1}
      max={181}
      min={0}
    />
  )
}
