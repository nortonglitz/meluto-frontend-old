import { object, string } from 'yup'

export interface RegisterEmailForm {
  email: string
}

const registerEmail = object({
  email: string().email('E-mail inválido.').required('Digite seu e-mail.')
})

export default registerEmail
