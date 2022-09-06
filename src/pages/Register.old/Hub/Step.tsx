import React, { ReactNode } from 'react'
import { ButtonBaseProps, ButtonBase, Typography, Box } from '@mui/material'
import { CheckCircle, Pencil } from 'mdi-material-ui'

interface StepProps extends ButtonBaseProps {
  icon: ReactNode
  desc: string
  title: string
  selected?: boolean
  done?: boolean
}

const Step: React.FC<StepProps> = ({ icon, title, desc, selected, done, onClick }) => {
  return (
    <ButtonBase
      disabled={!selected}
      onClick={onClick}
      sx={{
        display: 'flex',
        py: 1,
        px: 2,
        borderRadius: '5px',
        width: '100%',
        boxShadow: theme => selected ? theme.shadows[2] : undefined,
        backgroundColor: theme => selected ? theme.palette.background.paper : undefined
      }}>
      {icon}
      <Box sx={{ textAlign: 'left', flexGrow: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption" fontSize="1em" letterSpacing={0.1} color="text.secondary">{desc}</Typography>
      </Box>
      {done && !selected && <CheckCircle sx={{ ml: 2 }} color="success"/>}
      {selected && !done && <Pencil sx={{ ml: 2 }}/>}
    </ButtonBase>
  )
}

export default Step
