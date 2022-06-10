import { object, string } from 'yup'

export interface LoginForm {
  userInput: string
  password: string
}

const login = object({
  userInput: string().required('Digite seu usuário ou e-mail.'),
  password: string().required('Digite sua senha.')
})

export default login
