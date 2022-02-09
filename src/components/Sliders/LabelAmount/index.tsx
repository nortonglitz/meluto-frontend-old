import React, { ReactNode } from 'react'
import { Box, Typography, Slider, SxProps, SliderProps } from '@mui/material'

interface ISliderLabelAmount extends SliderProps {
  icon?: ReactNode,
  label?: string,
  sx?: SxProps,
}

export const SliderLabelAmount: React.FC<ISliderLabelAmount> = ({ sx, icon, label, value, ...props }) => {
  return (
  <Box sx={sx}>
    <Box sx={{
      display: 'flex',
      ml: 1,
      alignItems: 'center',
      '&:hover > svg': {
        color: theme => theme.palette.text.primary
      },
      '&:hover > p': {
        color: theme => theme.palette.text.primary
      }
    }}>
      {icon}
      <Typography
        sx={{
          fontSize: '1rem',
          letterSpacing: '0.05em'
        }}
      >
        {label}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, width: '100%' }}>
      <Box sx={{ mr: 2 }}>
        <Typography
          color="secondary"
          component="span"
          sx={{
            fontWeight: 500,
            fontSize: '1.1rem',
            border: theme => `2px solid ${theme.palette.text.disabled}`,
            borderRadius: '50%',
            p: 1
          }}>
          {`${value}+`}
        </Typography>
      </Box>
      <Slider
        {...props}
        sx={{ ml: 1, mr: 2 }}
        marks
        value={value}
      />
    </Box>
  </Box>
  )
}
