import React, { useState, useEffect } from 'react'
import { AlertProps } from '../'
import { useNavigate } from 'react-router-dom'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { SendPhoneMessage } from './SendPhoneMessage'
import { ConfirmPhone } from './ConfirmPhone'

interface PhoneProps {
  setAlertMsg: (props: AlertProps) => void
}

export const Phone: React.FC<PhoneProps> = ({ setAlertMsg }) => {
  const [step, setStep] = useState('sendPhoneMessage')
  const { temporaryUser } = useTemporaryUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (temporaryUser.phone.verified) {
      navigate('/register=hub')
    }

    if (temporaryUser.phone.value && !temporaryUser.phone.verified) {
      setStep('confirmPhoneCode')
    }
  }, [temporaryUser])

  return (
    <>
      { step === 'sendPhoneMessage' && <SendPhoneMessage setAlertMsg={setAlertMsg}/>}
      { step === 'confirmPhoneCode' && <ConfirmPhone setAlertMsg={setAlertMsg}/>}
    </>
  )
}
