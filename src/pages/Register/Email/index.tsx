import React, { useState, useEffect } from 'react'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { useNavigate } from 'react-router-dom'
import { AlertProps } from '../'
import { SendEmail } from './SendEmail'
import { ConfirmEmail } from './ConfirmEmail'

interface EmailProps {
  setAlertMsg: (props: AlertProps) => void
}

export const Email: React.FC<EmailProps> = ({ setAlertMsg }) => {
  const [step, setStep] = useState('sendEmail')
  const { temporaryUser } = useTemporaryUser()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Cadastro - E-mail'
  }, [])

  useEffect(() => {
    if (temporaryUser.email.verified) {
      navigate('/register=hub')
    }

    if (temporaryUser.email.value && !temporaryUser.email.verified) {
      setStep('confirmEmail')
    }
  }, [temporaryUser])

  return (
    <>
      {step === 'sendEmail' && <SendEmail setAlertMsg={setAlertMsg}/>}
      {step === 'confirmEmail' && <ConfirmEmail setAlertMsg={setAlertMsg}/>}
    </>
  )
}
