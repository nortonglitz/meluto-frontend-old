import { object } from 'yup'
import { descriptionField } from '../fields'

export interface EditDescriptionForm {
  description: string
}

const editDescription = object({
  description: descriptionField
})

export default editDescription
