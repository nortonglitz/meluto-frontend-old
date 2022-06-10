import React from 'react'
import { Select, InputLabel, MenuItem, FormControl, SelectChangeEvent, SelectProps, FormHelperText } from '@mui/material'

interface SelectSimpleTextMenuProps extends SelectProps {
  onChoose: (value: string) => void
  value: string
  options: { value: string, display: string }[]
  helperText?: string
}

export const SelectSimpleTextMenu: React.FC<SelectSimpleTextMenuProps> = ({ onChoose, value, options, label, error, sx, helperText, ...props }) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChoose(event.target.value as string)
  }

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id="select-type-label">{label}</InputLabel>
      <Select label={label} labelId="select-type-label" error={error} value={value} onChange={handleChange} {...props}>
        {options.map(option => <MenuItem key={`item-${option.display}`} value={option.value}>{option.display}</MenuItem>)}
      </Select>
      { helperText && <FormHelperText
        sx={{
          color: theme => error ? theme.palette.error.main : 'inherit'
        }}>
        {helperText}
      </FormHelperText>
      }
    </FormControl>
  )
}
