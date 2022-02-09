import React from 'react'
import { Button, Typography, ButtonProps } from '@mui/material'

interface ISelectIllustrationButton extends ButtonProps {
  label?: string
  selected?: boolean
}

export const SelectIllustrationButton: React.FC<ISelectIllustrationButton> = ({ sx, children, label, selected, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        ...sx,
        borderWidth: '2px',
        borderRadius: '10px',
        borderColor: theme => selected ? theme.palette.secondary.main : theme.palette.text.disabled,
        borderStyle: 'solid',
        display: 'flex',
        textTransform: 'none',
        flexDirection: 'column',
        color: theme => theme.palette.text.primary,
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: theme => selected ? theme.palette.secondary.main : theme.palette.text.primary
        },
        '&:hover > p': {
          color: theme => theme.palette.text.primary
        }
      }}
      >
        {children}
      <Typography
        variant="body1"
        fontWeight="medium"
        sx={{
          mt: 1,
          color: theme => selected ? theme.palette.text.primary : theme.palette.text.secondary,
          letterSpacing: '0.06em'
        }}>
        {label}
      </Typography>
    </Button>
  )
}
