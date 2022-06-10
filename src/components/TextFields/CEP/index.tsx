import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

export const TextFieldCEP: React.FC<NumberFormatProps<TextFieldProps>> = ({ ...props }) => {
  return (
    <NumberFormat
      {...props}
      customInput={TextField}
      allowNegative={false}
      format={'#####-###'}
      label="CEP"
      InputProps={{
        inputProps: { step: 1, inputMode: 'numeric', pattern: '[0-9]*' }
      }}
    />
  )
}
