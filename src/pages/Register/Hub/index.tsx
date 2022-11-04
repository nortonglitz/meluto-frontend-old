import React, { ReactNode } from 'react'
import { Box, Fade, Typography, Paper, Button, Divider } from '@mui/material'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { At, BadgeAccount, Cellphone, Lock, Check } from 'mdi-material-ui'
import { useNavigate } from 'react-router-dom'

interface ItemProps {
  title: string
  desc: string
  show?: boolean
  done?: boolean
  icon: ReactNode
  link: string
}

const Item: React.FC<ItemProps> = ({ title, icon, desc, show, done, link }) => {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: 2, my: 2 }}>
          <Box>
            <Typography>{title}</Typography>
            <Typography color="text.secondary" fontSize="0.85em">{desc}</Typography>
          </Box>
          <Check color="success" sx={{ display: done ? 'flex' : 'none' }}/>
        </Box>
      </Box>
      <Button
        sx={{
          mb: 3,
          fontWeight: 500,
          display: show ? 'flex' : 'none'
        }}
        variant="outlined"
        color="primary"
        onClick={() => navigate(`/register=${link}`)}
        >
        Validar
      </Button>
    </Box>
  )
}

export const Hub: React.FC = () => {
  const { temporaryUser } = useTemporaryUser()

  return (
    <Fade in>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 3, borderRadius: '10px', mt: 5 }}>
        <Typography variant="h6">Sua nova conta</Typography>
        <Typography sx={{ mb: 5 }}>Iremos validar seus dados para ter certeza de que é você.</Typography>
        <Item
          icon={<At/>}
          title="E-mail"
          desc="Para ser possível recuperar a sua conta."
          show={!temporaryUser.email.verified}
          done={temporaryUser.email.verified}
          link="email"
        />
        <Divider/>
        <Item
          icon={<BadgeAccount/>}
          title="Nome"
          desc="Como prefere ser chamado."
          show={temporaryUser.email.verified && !temporaryUser.name}
          done={!!temporaryUser.name}
          link="name"
        />
        <Divider/>
        <Item
          icon={<Cellphone/>}
          title="Telefone"
          desc="Para verificarmos se é você ao logar."
          show={temporaryUser.email.verified && !!temporaryUser.name && !temporaryUser.phone.verified}
          done={temporaryUser.phone.verified}
          link="phone"
        />
        <Divider/>
        <Item
          title="Senha"
          desc="Será necessária para acessar sua conta."
          show={temporaryUser.email.verified && !!temporaryUser.name && temporaryUser.phone.verified}
          icon={<Lock/>}
          link="password"
        />
      </Paper>
    </Box>
  </Fade>
  )
}
