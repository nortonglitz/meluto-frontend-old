import React from 'react'
import { Button, ButtonProps, Typography } from '@mui/material'

interface ISelectTextButton extends ButtonProps {
  selected?: boolean
}

export const SelectTextButton: React.FC<ISelectTextButton> = ({ selected, sx, children, ...props }) => {
  return (
  <Button
    {...props}
    sx={{
      ...sx,
      textTransform: 'none',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: theme => selected ? theme.palette.secondary.main : theme.palette.text.disabled,
      padding: theme => theme.spacing(1),
      color: theme => selected ? theme.palette.text.primary : theme.palette.text.secondary,
      borderRadius: '10px',
      letterSpacing: '0.06em',
      '&:hover': {
        borderColor: theme => selected ? theme.palette.secondary.main : theme.palette.text.primary,
        backgroundColor: 'transparent'
      },
      '&:hover > p': {
        color: theme => theme.palette.text.primary
      }
    }}
  >
    <Typography variant="body1" fontWeight="medium" sx={{ transition: 'all 0.4s' }}>
      {children}
    </Typography>
  </Button>
  )
}
