import { object, string, ref } from 'yup'
import { passwordField } from '../fields'

export interface EditPasswordForm {
  password: string
  confirmPassword: string
}

const editPassword = object({
  password: passwordField.required('Digite a senha.'),
  confirmPassword: string().equals([ref('password')], 'As senhas não conferem.').required('Confirme a senha.')
})

export default editPassword
