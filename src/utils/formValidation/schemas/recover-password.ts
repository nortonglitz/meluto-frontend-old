import { object, string } from 'yup'

export interface RecoverPasswordForm {
  email: string
}

const recoverPassword = object({
  email: string().email('E-mail inválido.').required('Digite seu e-mail.')
})

export default recoverPassword
