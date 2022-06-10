import { object, string } from 'yup'
import { firstNameField, lastNameField, tradingNameField } from '../fields'

export interface EditAllNamesForm {
  type: string
  tradingOrFirstName: string
  lastName: string
}

const editAllNames = object({
  type: string().required(),
  tradingOrFirstName: string().when('type', {
    is: 'company',
    then: tradingNameField.required('Digite o nome.'),
    otherwise: firstNameField.required('Digite o nome.')
  }),
  lastName: string().when('type', {
    is: (val: string) => val !== 'company',
    then: lastNameField.required('Digite seu sobrenome.')
  })
})

export default editAllNames
