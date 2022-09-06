import React, { useEffect, useState, FormEventHandler } from 'react'
import { Fade, Box, Typography, TextField, Button, Hidden } from '@mui/material'
import { LockReset } from 'mdi-material-ui'
import { useFormValidation, RecoverPasswordForm } from 'utils/formValidation'

const bucket = process.env.REACT_APP_BUCKET_URL

export const RecoverPassword: React.FC = () => {
  const { handleErrorMessage, validateError } = useFormValidation<RecoverPasswordForm>('recoverPassword')
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'Recuperar senha'
  })

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const isFormValid = await validateError({ email })
  }

  return (
    <Fade in>
      <Box sx={{ display: 'flex', mt: 10, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ mb: 5 }} align="center">Você esqueceu sua senha?</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', '& > img': { mr: 5, mt: 5 } }}>
            <Hidden mdDown>
              <img src={`${bucket}/illustrations/recover-password.svg`} style={{ width: '250px' }}/>
            </Hidden>
            <Box sx={{ maxWidth: '400px', p: 2 }}>
              <Typography align="justify">Digite no campo abaixo o seu e-mail verificado e nós iremos enviar um link para gerar uma nova senha.</Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  label="E-mail"
                  sx={{ my: 2 }}
                  fullWidth
                  {...handleErrorMessage('email')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="submit" endIcon={<LockReset/>} variant="outlined">Redefinir</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}
