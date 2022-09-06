import React, { useEffect } from 'react'
import { Box, Typography, ButtonBaseProps, ButtonBase, useTheme, Divider, Fade } from '@mui/material'
import { AccountTie, Account } from 'mdi-material-ui'
import { useTemporaryUser } from 'contexts/temporaryUser'

interface TypeButtonProps extends ButtonBaseProps {
  title?: string
  icon?: React.ReactNode
}

const TypeButton: React.FC<TypeButtonProps> = ({ title, icon, children, ...props }) => {
  const theme = useTheme()
  return (
    <ButtonBase
        sx={{
          display: 'flex',
          m: 2,
          width: '250px',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '10px',
          border: '2px solid rgba(0, 0, 0, 0)',
          transition: 'all 0.25s',
          p: 1,
          '& > div > svg': {
            color: theme.palette.primary.main,
            fontSize: '10em',
            transition: 'all 0.25s'
          },
          '&:hover': {
            borderColor: theme.palette.secondary.main
          },
          '&:hover > div > svg': {
            color: theme.palette.primary.light
          }
        }} {...props}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '170px', width: '100%' }}>
          {icon}
          <Typography variant="h6" lineHeight={0} sx={{ mt: 1 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Divider/>
          <Box
            sx={{
              textAlign: 'left',
              fontSize: '1.1em',
              letterSpacing: '0.05em',
              fontStyle: 'italic'
            }}>
              {children}
          </Box>
        </Box>
    </ButtonBase>
  )
}

const Role: React.FC = () => {
  const theme = useTheme()
  const regularBenefits = ['Salve seus imóveis favoritos', 'Anuncie seus imóveis']
  const professionalBenefits = ['Planos exclusivos', 'Página própria', 'Salve seus imóveis favoritos', 'Anuncie seus imóveis']
  const { setTemporaryUser } = useTemporaryUser()

  const handleClick = (role: 'professional' | 'regular') => {
    setTemporaryUser({ role })
  }

  useEffect(() => {
    document.title = 'Cadastro - Escolha o tipo de cadastro'
  }, [])

  return (
    <Fade in>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Escolha o tipo de conta</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <TypeButton title="Pessoa Física" icon={<Account/>} onClick={() => handleClick('regular')}>
            <Box sx={{ mt: 2 }}>
              {regularBenefits.map((item, i) => (
                <Box key={`person-item-${i}`}>
                  <span style={{ marginRight: '4px', color: theme.palette.success.light }}>✔</span>
                  {item}<br/>
                </Box>
              ))}
            </Box>
          </TypeButton>
          <TypeButton title="Profissional" icon={<AccountTie/>} onClick={() => handleClick('professional')}>
            <Box sx={{ mt: 2 }}>
              {professionalBenefits.map((item, i) => (
                <Box key={`professional-item-${i}`}>
                  <span style={{ marginRight: '4px', color: theme.palette.success.light }}>✔</span>
                  {item}<br/>
                </Box>
              ))}
            </Box>
          </TypeButton>
        </Box>
      </Box>
    </Fade>
  )
}

export default Role
