import React, { useState, useEffect } from 'react'
import { Grid, Button, Accordion, AccordionSummary, AccordionDetails, Box, Typography, TextField, ButtonGroup, Fade, Alert } from '@mui/material'
import { ChevronDown, Instagram, Youtube, Facebook, BorderNoneVariant, Lock } from 'mdi-material-ui'
import { TextFieldTelephone, TextFieldSite } from 'components'
import { formatPhone } from 'utils/handleText'
import { useAuth } from 'contexts/auth'

const Empty: React.FC = () => <BorderNoneVariant color="error"/>

const Locked: React.FC = () => <Lock color="error"/>

const Disclaimer: React.FC = ({ children }) => (
  <Box
    sx={{
      borderRadius: '4px',
      backgroundColor: theme => theme.palette.surface[1],
      p: 1,
      mt: 2,
      textAlign: 'justify'
    }}>
    <Typography color="text.secondary">
      {children}
    </Typography>
  </Box>
)

const SaveButton: React.FC = () => {
  return (
    <Button variant="outlined" fullWidth sx={{ mt: 2 }}>Salvar</Button>
  )
}

const NotProfessional: React.FC = () => {
  return (
    <Disclaimer>
      Apenas profissionais tem acesso a esse recurso.
    </Disclaimer>
  )
}

interface AccordionProps {
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
}

const SettingsItem: React.FC<AccordionProps> = ({ title, desc, children }) => {
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} >
      <AccordionSummary sx={{ px: 2 }} expandIcon={<ChevronDown/>}>
        <Box>
          <Typography variant="overline" component="span" fontSize="0.85em" letterSpacing={0.8} lineHeight={0} color="text.secondary">{title}</Typography>
          <Typography variant="h6" fontWeight={400}>{desc}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

const ChooseSocialMedia: React.FC<{value: string, setValue: (value: string) => void}> = ({ value, setValue }) => {
  return (
    <ButtonGroup
      sx={{
        '& button': {
          borderColor: theme => theme.palette.divider,
          '&:hover': {
            backgroundColor: 'transparent',
            borderColor: theme => theme.palette.text.secondary
          }
        }
      }}>
      <Button onClick={() => setValue('instagram')}>
        <Box sx={{ transition: 'all 0.25s', display: 'flex', color: theme => value === 'instagram' ? '#E1306C' : 'text.secondary' }}>
          <Instagram/>
        </Box>
      </Button>
      <Button onClick={() => setValue('youtube')}>
        <Box sx={{ transition: 'all 0.25s', display: 'flex', color: theme => value === 'youtube' ? '#FF0000' : 'text.secondary' }}>
          <Youtube/>
        </Box>
      </Button>
      <Button onClick={() => setValue('facebook')}>
        <Box sx={{ transition: 'all 0.25s', display: 'flex', color: theme => value === 'facebook' ? '#4267B2' : 'text.secondary' }}>
          <Facebook/>
        </Box>
      </Button>
    </ButtonGroup>
  )
}

interface SocialMediaProps {
  instagram?: string
  facebook?: string
  youtube?: string
  available: boolean
}

const SocialMedia: React.FC<SocialMediaProps> = ({ instagram, facebook, youtube, available }) => {
  const [socialMedia, setSocialMedia] = useState('instagram')
  return (
    <SettingsItem title="Redes Sociais"
    desc={!available
      ? <Locked/>
      : <Box
            sx={{
              '& div': {
                display: 'flex',
                alignItems: 'center'
              },
              '& div > span': {
                display: 'flex',
                alignItems: 'center',
                ml: 0.5,
                mr: 1
              }
            }}>
            <Box><Instagram/><span>{instagram || <Empty/>}</span></Box>
            <Box><Youtube/><span>{youtube || <Empty/>}</span></Box>
            <Box><Facebook/><span>{facebook || <Empty/>}</span></Box>
          </Box>
      }>
      {!available
        ? <NotProfessional/>
        : <>
            <Typography>
              As redes sociais serão fornecidas em sua página.
            </Typography>
            <Disclaimer>
              Selecione a rede social que deseja alterar e em seguida preencha com o seu usuário.
            </Disclaimer>
            <Box sx={{ mt: 2 }}>
              <ChooseSocialMedia value={socialMedia} setValue={setSocialMedia}/>
            </Box>
            <TextField fullWidth label="Usuário" sx={{ mt: 2 }}/>
            <SaveButton/>
          </>
      }
    </SettingsItem>
  )
}

const Whatsapp: React.FC<{whatsapp?: string}> = ({ whatsapp }) => {
  return (
    <SettingsItem title="Whatsapp" desc={whatsapp ? formatPhone(whatsapp) : <Empty/>}>
      <Typography sx={{ mb: 2 }}>
        O Whatsapp é o meio de comunicação mais utilizado. Verifique se o número inserido o possui.
      </Typography>
      <TextFieldTelephone fullWidth label="Novo Whatsapp"/>
      <Disclaimer>
        Adicione o DDD ao número do telefone.
      </Disclaimer>
      <SaveButton/>
    </SettingsItem>
  )
}

const MainPhone: React.FC<{mainPhone?: string}> = ({ mainPhone }) => {
  return (
    <SettingsItem title="Telefone de Contato" desc={mainPhone ? formatPhone(mainPhone) : <Empty/>}>
      <Typography sx={{ mb: 2 }}>
        Esse número será fornecido a interessados que desejam realizar uma ligação. É importante que seja de maior disponibilidade.
      </Typography>
      <TextFieldTelephone fullWidth label="Novo Telefone"/>
      <Disclaimer>
        Adicione o DDD ao número do telefone.
      </Disclaimer>
      <SaveButton/>
    </SettingsItem>
  )
}

const Site: React.FC<{url?: string, available: boolean}> = ({ url, available }) => {
  return (
    <SettingsItem title="site" desc={!available ? <Locked/> : url || <Empty/>}>
      {!available
        ? <NotProfessional/>
        : <>
            <Typography sx={{ mb: 2 }}>
              Preencha com o site de sua empresa. Essa informação estará disponível na sua página.
            </Typography>
            <TextFieldSite fullWidth label="Novo Site" prefix="www."/>
            <Disclaimer>
              Não é necessário utilizar o endereço completo. Preencha o que seguir após www.
            </Disclaimer>
            <SaveButton/>
          </>
      }
    </SettingsItem>
  )
}

const Email: React.FC<{email: string}> = ({ email }) => {
  return (
    <SettingsItem title="E-mail" desc={email}>
      <Typography sx={{ mb: 1 }}>
        Utilize um e-mail ao qual você tenha acesso. Com ele é possível recuperar sua senha em caso de perda.
      </Typography>
      <TextField label="Novo E-mail" fullWidth/>
      <Disclaimer>
        Verifique a caixa de entrada do e-mail antigo e após clicar no link enviado será gerado um outro para o novo.
      </Disclaimer>
      <SaveButton/>
    </SettingsItem>
  )
}

export const SettingsContact: React.FC = () => {
  const { user } = useAuth()

  const available = user.role === 'professional' && user.verified.value
  const professionalNotVerified = user.role === 'professional' && !user.verified.value

  useEffect(() => {
    document.title = 'Configurações - Contato'
  }, [])
  return (
    <Fade in>
      <Box>
        <Alert severity="warning" sx={{ display: professionalNotVerified ? 'flex' : 'none', justifyContent: 'center' }}>
          Sua conta está sendo verificada e em breve você poderá usar os recursos profissionais.
        </Alert>
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
            <Email email={user.email.value}/>
            <MainPhone mainPhone={user.telephone}/>
            <Whatsapp whatsapp={user.whatsapp}/>
            <SocialMedia available={available} />
            <Site available={available} url={user.site}/>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}
