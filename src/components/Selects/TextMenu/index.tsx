import React, { useState } from 'react'
import { Close } from 'mdi-material-ui'
import { Select, InputLabel, FormControl, SelectProps, MenuItem, ListSubheader, IconButton, SelectChangeEvent } from '@mui/material'

interface ISelect extends SelectProps {
  label?: string
  options: any[]
  value: any
  onChoose: (chosen: string | string[]) => void
}

export const SelectTextMenu: React.FC<ISelect> = ({ label, value, options, onChoose, multiple, sx }) => {
  const [open, setOpen] = useState(false)

  const handleChange = (e: SelectChangeEvent) => {
    const { value } = e.target
    if (Array.isArray(value)) {
      const index = value.indexOf('')
      if (index !== -1) {
        value.splice(index, 1)
      }
    }
    onChoose(value)
  }

  return (
    <FormControl sx={{ width: '100%', ...sx }}>
      <InputLabel id="input-label">{label}</InputLabel>
      <Select
        labelId="input-label"
        value={value}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onChange={handleChange}
        label={label}
        multiple={multiple}
        MenuProps={{
          sx: {
            maxHeight: '80vh',
            '.MuiList-root': {
              paddingTop: 0
            }
          }
        }}
      >
        <ListSubheader
          value=""
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'primary.main',
            fontSize: '1em',
            mb: 1,
            borderBottom: theme => `2px solid ${theme.palette.primary.dark}`
          }}
          >
          {label}
          <IconButton
            sx={{ width: 'fit-content', height: 'fit-content' }}
            onClick={() => setOpen(false)}
          >
            <Close sx={{ color: 'GrayText' }}/>
          </IconButton>
        </ListSubheader>
        {options.map(option =>
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
