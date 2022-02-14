import React, { ReactNode } from 'react'
import { Button, ButtonProps, Typography, ButtonGroup, SxProps, Box } from '@mui/material'

interface IOptions extends ButtonProps {
  selected?: boolean
}

export const Option: React.FC<IOptions> = ({ selected, children, ...props }) => {
  return (
    <Button
      {...props}
      size="small"
      variant="outlined"
      sx={{
        color: theme => theme.palette.text.primary,
        borderColor: theme => theme.palette.divider,
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: theme => theme.palette.text.secondary
        }
      }}
    >
      <Box sx={{
        color: theme => selected ? theme.palette.secondary.main : theme.palette.text.secondary
      }}>
      {children}
      </Box>
    </Button>
  )
}

interface ISelectGroup {
  sx?: SxProps,
  options: { value: string | number, label: string }[]
  setChosen: (value: number | string) => void
  chosen: string | number
  icon?: ReactNode
  label?: string
}

export const SelectGroup: React.FC<ISelectGroup> = ({ sx, icon, options, setChosen, chosen, label }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', '& > svg': { mr: 0.5 } }}>
        {icon}
        <Typography variant="h6" fontWeight="regular">{label}</Typography>
      </Box>
      <ButtonGroup sx={{ mt: 1 }}>
        {options.map(option => (
          <Option
            key={`options-${option.label}`}
            onClick={() => setChosen(option.value)}
            selected={chosen === option.value}
          >
            <Typography variant="h6">
              {option.label}+
            </Typography>
          </Option>
        ))}
      </ButtonGroup>
    </Box>
  )
}
