import React from 'react'
import { TextField, TextFieldProps, InputAdornment } from '@mui/material'
import NumberFormat, { NumberFormatValues, NumberFormatProps } from 'react-number-format'

export const TextFieldPrice: React.FC<NumberFormatProps<TextFieldProps>> = ({ ...props }) => {
  const handleFormatNumberMaxValue = ({ floatValue } : NumberFormatValues) => {
    if (floatValue) {
      return floatValue <= 1000000000
    } else {
      return true
    }
  }

  return (
    <NumberFormat
      {...props}
      isAllowed={handleFormatNumberMaxValue}
      customInput={TextField}
      thousandSeparator={'.'}
      decimalSeparator={','}
      allowNegative={false}
      InputProps={{
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        inputProps: { min: 0, step: 10000, inputMode: 'numeric', pattern: '[0-9]*' }
      }}
    />
  )
}
