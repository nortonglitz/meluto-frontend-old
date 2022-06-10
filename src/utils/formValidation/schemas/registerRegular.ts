import { object, string, ref } from 'yup'
import { firstNameField, lastNameField, passwordField } from '../fields'

export interface RegisterRegularForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const registerRegular = object({
  firstName: firstNameField.required('Digite seu nome.'),
  lastName: lastNameField.required('Digite seu sobrenome.'),
  email: string().email('E-mail inválido.').required('Digite seu e-mail.'),
  password: passwordField.required('Digite sua senha.'),
  confirmPassword: string().equals([ref('password')], 'As senhas não conferem.').required('Confirme a senha.')
})

export default registerRegular
