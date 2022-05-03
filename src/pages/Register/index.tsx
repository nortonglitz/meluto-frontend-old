import React, { FormEventHandler, useState, useEffect } from 'react'
import { AccountPlus } from 'mdi-material-ui'
import { Fade, Box, TextField, Grid, Typography, Button, Hidden } from '@mui/material'
import { TextFieldPassword } from 'components'
import RegisterIllustration from 'assets/illustrations/register2.svg'
import { useFormValidation, RegisterForm } from 'utils/formValidation'
import { capitalize } from 'utils/handleText'
import CheckInBoxIllustration from 'assets/illustrations/register-check-inbox.svg'

interface RegisterMainProps {
  onSuccess: (email: string) => void
}

export const RegisterMain: React.FC<RegisterMainProps> = ({ onSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const form = { name, email, password, confirmPassword }
  const { validateError, handleErrorMessage } = useFormValidation<RegisterForm>('register')

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const result = await validateError(form)
    if (result) {
      onSuccess(email)
    }
  }

  useEffect(() => {
    document.title = 'Cadastrar'
  })

  return (
    <Fade in>
      <Box>
        <Grid container justifyContent="center" sx={{ mt: { xs: 2, md: 6 }, p: 2 }}>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
            <Typography variant="h4">
              Junte-se a nós!
            </Typography>
              <Typography
                variant="h6"
                letterSpacing="0.03em"
                fontWeight="regular"
                sx={{
                  backgroundColor: theme => theme.palette.background.paper + 'C0',
                  boxShadow: theme => theme.shadows[2],
                  width: 'fit-content',
                  borderRadius: '10px',
                  p: 1,
                  mt: 1,
                  mx: 2
                }}
              >
                  Salve seus imóveis favoritos, anuncie e tenha acesso ao cadastro profissional!
              </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} sm={6} lg={4} xl={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
              <img src={RegisterIllustration} height="200px"/>
              <Typography variant="h4" sx={{ mt: 2 }}>Faça o seu cadastro</Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
              <form
                onSubmit={handleFormSubmit}
                style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
              >
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '350px',
                  '& > div': {
                    mt: 1.5
                  },
                  '& > button': {
                    mt: 4
                  }
                }}>
                  <TextField
                    fullWidth
                    label="Nome"
                    value={name}
                    onChange={e => setName(capitalize(e.target.value))}
                    {...handleErrorMessage('name')}
                    />
                  <TextField
                    fullWidth
                    label="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    {...handleErrorMessage('email')}
                  />
                  <TextFieldPassword
                    fullWidth
                    label="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    {...handleErrorMessage('password', 'A senha precisa ter no mínimo 8 caracteres. Inclua ao menos uma letra maiúscula, uma minúscula, um número e um símbolo (!@#$&*).')}
                  />
                  <TextFieldPassword
                    fullWidth
                    label="Confirme a senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    {...handleErrorMessage('confirmPassword')}
                  />
                  <Button type="submit" variant="outlined" color="secondary" size="large" endIcon={<AccountPlus/>}>
                    Cadastrar
                  </Button>
                </Box>
              </form>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

interface RegisterSuccessProps {
  email?: string
}

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ email }) => {
  return (
    <Fade in>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 10 }}>
        <img src={CheckInBoxIllustration} width={300}/>
        <Typography align="center" sx={{ maxWidth: '600px', mt: 2 }} variant="h6" fontWeight="regular">
          Enviamos um link para <Typography component="span" color="primary" variant="h6" fontWeight="bold">{email}</Typography>.<br/>
          Verifique a sua caixa de entrada para proceder com o cadastro.
        </Typography>
      </Box>
    </Fade>
  )
}

export const Register: React.FC = () => {
  const [filled, setFilled] = useState(false)
  const [email, setEmail] = useState('')

  const handleSuccess = (email: string) => {
    setFilled(true)
    setEmail(email)
  }

  return (
    <Fade in>
      <Box>
        {filled
          ? <RegisterSuccess email={email}/>
          : <RegisterMain onSuccess={handleSuccess}/>
        }
      </Box>
    </Fade>
  )
}
