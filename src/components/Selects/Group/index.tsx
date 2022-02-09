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
      <Typography color={selected ? 'secondary' : 'text.secondary'} fontWeight="medium">
        {children}
      </Typography>
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
      <Box sx={{ display: 'flex', alignItems: 'start', '& > svg': { mr: 0.5 } }}>
        {icon}
        <Typography sx={{
          fontSize: '1rem',
          letterSpacing: '0.05em'
        }}>{label}</Typography>
      </Box>
      <ButtonGroup sx={{ mt: 1 }}>
        {options.map(option => (
          <Option
            key={`options-${option.label}`}
            onClick={() => setChosen(option.value)}
            selected={chosen === option.value}
          >
            {option.label}+
          </Option>
        ))}
      </ButtonGroup>
    </Box>
  )
}
