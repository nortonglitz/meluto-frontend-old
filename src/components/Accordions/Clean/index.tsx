import React from 'react'
import { Accordion, AccordionProps } from '@mui/material'

export const AccordionClean: React.FC<AccordionProps> = ({ children, sx, ...props }) => {
  return (
    <Accordion
      {...props}
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      sx={{
        minWidth: '300px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: theme => `2px solid ${theme.palette.divider}`,
        borderRadius: theme => theme.shape.borderRadius,
        '&:before': {
          backgroundColor: 'transparent'
        },
        '&:last-of-type': {
          borderRadius: theme => theme.shape.borderRadius
        },
        '&:first-of-type': {
          borderRadius: theme => theme.shape.borderRadius
        },
        ...sx
      }}>
        {children}
    </Accordion>
  )
}
