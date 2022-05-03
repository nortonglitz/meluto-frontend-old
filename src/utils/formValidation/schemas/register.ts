import { object, string, ref } from 'yup'
import { nameField, passwordField } from '../fields'

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const register = object({
  name: nameField.required('Digite seu nome.'),
  email: string().email('E-mail inválido.').required('Digite seu e-mail.'),
  password: passwordField.required('Digite sua senha.'),
  confirmPassword: string().equals([ref('password')], 'As senhas não conferem.').required('Confirme a senha')
})

export default register
