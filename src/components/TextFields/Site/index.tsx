import React from 'react'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

export const TextFieldSite: React.FC<TextFieldProps> = ({ ...props }) => {
  return (
    <TextField {...props} InputProps={{
      startAdornment: <InputAdornment position="start">www.</InputAdornment>
    }}/>
  )
}
