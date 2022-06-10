import { object } from 'yup'
import { usernameField } from '../fields'

export interface EditUsernameForm {
  username: string
}

const editUsername = object({
  username: usernameField.required('Digite o usuário.')
})

export default editUsername
