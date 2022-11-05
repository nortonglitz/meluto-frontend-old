import { object } from 'yup'
import { phoneField } from '../fields'

export interface EditPhoneForm {
  phone: string
}

const editName = object({
  phone: phoneField.required('Digite o seu telefone.')
})

export default editName
