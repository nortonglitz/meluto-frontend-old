import { object, string } from 'yup'

export interface RegisterTemporaryRegular1Form {
  email: string
}

const registerTemporaryRegular1 = object({
  email: string().email('E-mail inválido.').required('Digite seu e-mail.')
})

export default registerTemporaryRegular1
