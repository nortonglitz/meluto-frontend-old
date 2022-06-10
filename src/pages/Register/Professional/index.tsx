import React, { useEffect, useState, FormEventHandler } from 'react'
import { Fade, Grid, TextField, Box, Typography, Button, Hidden, Snackbar, Alert } from '@mui/material'
import { SelectSimpleTextMenu, TextFieldPassword } from 'components'
import { StorePlus } from 'mdi-material-ui'
import RegisterIllustration from 'assets/illustrations/register2.svg'
import { useFormValidation, RegisterProfessionalForm } from 'utils/formValidation'
import NumberFormat from 'react-number-format'
import CheckInBoxIllustration from 'assets/illustrations/register-check-inbox.svg'
import api from 'services/api'
import { capitalize } from 'utils/handleText'

interface RegisterMainProps {
  onSuccess: (email: string) => void
}

const RegisterMain: React.FC<RegisterMainProps> = ({ onSuccess }) => {
  const [type, setType] = useState('real estate')
  const [docType, setDocType] = useState('CNPJ')
  const [email, setEmail] = useState('')
  const [CRECINumber, setCRECINumber] = useState('')
  const [docNumber, setDocNumber] = useState('')
  const [companyOrFirstName, setCompanyOrFirstName] = useState('')
  const [tradingOrLastName, setTradingOrLastName] = useState('')
  const [CRECIState, setCRECIState] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [errorType, setErrorType] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const typeOptions = [
    { value: 'real estate', display: 'Imobiliária' },
    { value: 'realtor', display: 'Corretor' },
    { value: 'construction company', display: 'Construtora/Incorporadora' }
  ]
  const docOptions = [
    { value: 'CNPJ', display: 'CNPJ' },
    { value: 'CPF', display: 'CPF' }
  ]
  const statesOptions = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ].map(state => ({ value: state, display: state }))

  const form = {
    type,
    companyOrFirstName,
    tradingOrLastName,
    docType,
    docNumber,
    password,
    confirmPassword,
    email,
    CRECINumber,
    CRECIState
  }

  const {
    validateError: validateErrorProfessional,
    handleErrorMessage: handleErrorMessageProfessional
  } = useFormValidation<RegisterProfessionalForm>('registerProfessional')

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const isValid = await validateErrorProfessional(form)
    if (!isValid) return
    setError(!!errorType || !isValid)
    try {
      await api.post('users', {
        role: 'professional',
        subrole: type,
        firstName: companyOrFirstName,
        lastName: tradingOrLastName,
        companyName: companyOrFirstName,
        tradingName: tradingOrLastName,
        docType,
        docNumber,
        CRECINumber,
        CRECIState,
        email,
        password
      })
      setErrorType('')
      setError(false)
      onSuccess(email)
    } catch (err: any) {
      if (err.response.data) {
        setErrorType(err.response.data.error)
        setError(true)
      } else if (!err.request.data) {
        setErrorMsg('Erro de conexão com banco')
        setOpenSnackbar(true)
      } else {
        setErrorMsg('Erro interno')
        setOpenSnackbar(true)
      }
    }
  }

  const handleChooseType = (type: string) => {
    if (type !== 'realtor') {
      if (docType === 'CPF') {
        setDocNumber('')
        setTradingOrLastName('')
        setCompanyOrFirstName('')
        setDocType('CNPJ')
      }
    }
    setType(type)
  }

  const onCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <Fade in>
      <Box sx={{ pb: 8 }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={onCloseSnackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <Alert severity="error">
            {errorMsg}
          </Alert>
        </Snackbar>
        <Grid container justifyContent="center" sx={{ mt: { xs: 2, md: 6 }, p: 2 }}>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
            <Typography variant="h4">
              Aumente sua captação de clientes!
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
                Tenha sua própria página, descontos exclusivos e muito mais!
              </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
              <img src={RegisterIllustration} height="200px"/>
              <Typography variant="h4" sx={{ mt: 2 }}>Faça o seu cadastro</Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
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
                '& > button': {
                  mt: 4
                }
              }}>
                <SelectSimpleTextMenu value={type} onChoose={handleChooseType} options={typeOptions}/>
                <Box sx={{ display: type === 'construction company' ? 'none' : 'flex', width: '100%', mt: 3 }}>
                  <SelectSimpleTextMenu
                    sx={{ mr: 1.5, flexShrink: '0', width: '80px' }}
                    value={CRECIState}
                    label="UF"
                    onChoose={state => setCRECIState(state)}
                    options={statesOptions}
                    {...handleErrorMessageProfessional('CRECIState')}
                  />
                  <TextField fullWidth label="CRECI"
                    value={CRECINumber}
                    onChange={e => setCRECINumber(e.target.value)}
                    error={errorType === 'DuplicateCRECIError'}
                    InputProps={{
                      inputProps: {
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        maxLength: 6
                      }
                    }}
                    {...handleErrorMessageProfessional('CRECINumber', errorType === 'DuplicateCRECIError' ? 'CRECI já em uso.' : '')}
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                  <SelectSimpleTextMenu
                    sx={{ mr: 1.5, flexShrink: '0', width: '100px' }}
                    disabled={type !== 'realtor'}
                    label="Documento"
                    value={docType}
                    onChoose={docTypeValue => {
                      setDocNumber('')
                      setTradingOrLastName('')
                      setCompanyOrFirstName('')
                      setDocType(docTypeValue)
                    }}
                    options={docOptions}
                  />
                  <Box sx={{ width: '100%' }}>
                    <NumberFormat
                      fullWidth
                      customInput={TextField}
                      format={docType === 'CPF' ? '###.###.###-##' : '##.###.###/####-##'}
                      label="Número do Documento"
                      value={docNumber}
                      error={errorType === 'DuplicateCNPJError' || errorType === 'DuplicateCPFError'}
                      onValueChange={({ formattedValue, value }) => setDocNumber(value)}
                      {...handleErrorMessageProfessional('docNumber',
                        errorType === 'DuplicateCPFError' || errorType === 'DuplicateCNPJError' ? 'Documento em uso.' : ''
                      )}
                      InputProps={{
                        inputProps: {
                          inputMode: 'numeric'
                        }
                      }}
                    />
                  </Box>
                </Box>
                <TextField
                  sx={{ mt: 1.5 }}
                  onChange={e => setCompanyOrFirstName(capitalize(e.target.value))}
                  value={companyOrFirstName}
                  fullWidth
                  multiline
                  inputProps={{ maxLength: docType === 'CPF' ? 25 : 55 }}
                  label={docType === 'CPF' ? 'Nome' : 'Razão Social'}
                  {...handleErrorMessageProfessional('companyOrFirstName')}
                />
                <TextField
                  onChange={e => setTradingOrLastName(capitalize(e.target.value))}
                  value={tradingOrLastName}
                  fullWidth
                  sx={{ mt: 1.5 }}
                  multiline
                  inputProps={{ maxLength: docType === 'CPF' ? 25 : 55 }}
                  label={docType === 'CPF' ? 'Sobrenome' : 'Nome'}
                  {...handleErrorMessageProfessional('tradingOrLastName')}
                />
                <TextField
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  label="E-mail"
                  error={errorType === 'DuplicateEmailError'}
                  sx={{ mt: 4 }}
                  {...handleErrorMessageProfessional('email', errorType === 'DuplicateEmailError' ? 'E-mail já em uso.' : '')}
                />
                <TextFieldPassword
                  fullWidth
                  label="Senha"
                  sx={{ mt: 1.5 }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  {...handleErrorMessageProfessional('password', 'A senha precisa ter no mínimo 8 caracteres. Inclua ao menos uma letra maiúscula, uma minúscula, um número e um símbolo (!@#$&*).')}
                />
                <TextFieldPassword
                  fullWidth
                  label="Confirme a senha"
                  sx={{ mt: 1.5 }}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  {...handleErrorMessageProfessional('confirmPassword')}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  endIcon={<StorePlus/>}
                  color="secondary"
                >
                  Cadastrar
                </Button>
                <Typography variant="caption" color="error" sx={{ display: error ? 'flex' : 'none', mt: 1 }}>
                  Verifique o formulário.
                </Typography>
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
          Verifique a sua caixa de entrada para concluir o cadastro.
        </Typography>
      </Box>
    </Fade>
  )
}

export const RegisterProfessional: React.FC = () => {
  const [filled, setFilled] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'Cadastro - Profissional'
  })

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
