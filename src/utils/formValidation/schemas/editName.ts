import { object } from 'yup'
import { firstNameField } from '../fields'

export interface EditNameForm {
  name: string
}

const editName = object({
  name: firstNameField.required('Digite o seu nome.')
})

export default editName
