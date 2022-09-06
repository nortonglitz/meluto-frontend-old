import React, { useEffect } from 'react'
import { Fade, Box, Typography } from '@mui/material'
import { At, Briefcase, Lock, CardAccountDetails } from 'mdi-material-ui'
import Step from '../Step'

interface HubProfessiolProps {
  setStep: (step: string) => void
  nameCreated: boolean
  passwordCreated: boolean
  emailVerified: boolean
}

const HubProfessional: React.FC<HubProfessiolProps> = ({ setStep, emailVerified, nameCreated, passwordCreated }) => {
  useEffect(() => {
    document.title = 'Cadastro - Profissional'
  }, [])
  return (
    <Fade in>
      <Box>
        <Typography variant="h6">Cadastro - Profissional</Typography>
        <Typography variant="body1" sx={{ mb: 4 }} color="text.secondary">Você está prestes a acessar a nossa plataforma.</Typography>
        <Box
          sx={{ maxWidth: '400px', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '10px', p: 2 }}>
            <Step
              icon={<At sx={{ mr: 2 }}/>}
              title="Validar e-mail"
              desc="Será usado para recuperar sua conta."
              onClick={() => setStep('verifyEmail')}
              selected={!emailVerified && !nameCreated && !passwordCreated}
              done={emailVerified}
            />
            <Step
              icon={<Briefcase sx={{ mr: 2 }}/>}
              title="Dados profissionais"
              desc="Ninguém se passará por você."
              onClick={() => setStep('professionalData')}
              selected={!emailVerified && !nameCreated && !passwordCreated}
              done={emailVerified}
            />
            <Step
              icon={<CardAccountDetails sx={{ mr: 2 }}/>}
              title="Preencher nome"
              desc="Como devemos lhe chamar."
              onClick={() => setStep('createName')}
              selected={emailVerified && !nameCreated && !passwordCreated}
              done={nameCreated}
            />
            <Step
              icon={<Lock sx={{ mr: 2 }}/>}
              title="Criar senha"
              desc="Para acessar sua conta."
              onClick={() => setStep('createPassword')}
              selected={emailVerified && nameCreated && !passwordCreated}
              done={passwordCreated}
            />
        </Box>
      </Box>
    </Fade>
  )
}

export default HubProfessional
