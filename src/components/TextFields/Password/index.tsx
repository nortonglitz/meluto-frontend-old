import React, { useState } from 'react'
import { TextField, IconButton, TextFieldProps } from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'

export const TextFieldPassword: React.FC<TextFieldProps> = ({ onFocus, onBlur, error, sx, InputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordIconColor, setPasswordIconColor] = useState<'disabled' | 'primary'>('disabled')
  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      error={error}
      onFocus={e => {
        setPasswordIconColor('primary')
        if (onFocus) onFocus(e)
      }}
      onBlur={e => {
        setPasswordIconColor('disabled')
        if (onBlur) onBlur(e)
      }}
      sx={{
        ...sx,
        '&:hover svg': {
          color: theme => error
            ? theme.palette.error.main
            : passwordIconColor === 'disabled'
              ? theme.palette.text.primary
              : theme.palette.primary.main
        },
        '& svg': {
          color: theme => error ? theme.palette.error.main : theme.palette.mode
        }
      }}
      InputProps={{
        ...InputProps,
        endAdornment:
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword
              ? <EyeOffOutline color={passwordIconColor}/>
              : <EyeOutline color={passwordIconColor}/>
            }
          </IconButton>
      }}
      {...props}
    />
  )
}
