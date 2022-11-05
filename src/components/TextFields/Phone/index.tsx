import React, { useState } from 'react'
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format'
import { TextField, TextFieldProps } from '@mui/material'

type TextFieldPhoneProps = NumberFormatProps<TextFieldProps> & { onPhoneChange: (phone: string) => void }

export const TextFieldPhone: React.FC<TextFieldPhoneProps> = ({ onPhoneChange, ...props }) => {
  const [landline, setLandline] = useState(false)

  const handleFormatOnValue = ({ value }: NumberFormatValues) => {
    if (value.length > 10) {
      setLandline(false)
    } else {
      setLandline(true)
    }
    onPhoneChange(value)
  }
  return (
    <NumberFormat
      {...props}
      format={landline ? '(##) #### #####' : '(##) ##### ####'}
      onValueChange={handleFormatOnValue}
      customInput={TextField}
      allowNegative={false}
      InputProps={{
        inputProps: { inputMode: 'numeric' }
      }}
    />
  )
}
