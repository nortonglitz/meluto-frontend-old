import React from 'react'
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material'

interface SelectMenuProps {
  onChange?: (event: SelectChangeEvent<any>, child: React.ReactNode) => void
  label: string
  value: any
}

export const SelectMenu: React.FC<SelectMenuProps> = ({ label, value, onChange, children, ...props }) => {
  return (
      <FormControl fullWidth {...props}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          label={label}
          onChange={onChange}
        >
          {children}
        </Select>
      </FormControl>
  )
}
