import { object, string, ref } from 'yup'
import { firstNameField, companyNameField, tradingNameField, lastNameField, passwordField, cpfField, creciNumberField, cnpjField } from '../fields'

export interface RegisterProfessionalForm {
  type: string
  CRECINumber: string
  CRECIState: string
  docType: string
  docNumber: string
  email: string
  companyOrFirstName: string
  tradingOrLastName: string
  password: string
  confirmPassword: string
}

const registerProfessional = object({
  type: string().required(),
  docType: string().required(),
  docNumber: string().when('docType', {
    is: 'CPF',
    then: cpfField.required('Digite seu CPF.'),
    otherwise: cnpjField.required('Digite seu CNPJ.')
  }),
  CRECINumber: string().when('type', {
    is: (val: string) => val !== 'construction company',
    then: creciNumberField.required('Digite seu CRECI.')
  }),
  CRECIState: string().when('type', {
    is: (val: string) => val !== 'construction company',
    then: string().required('Selecione.')
  }),
  companyOrFirstName: string().when('docType', {
    is: 'CPF',
    then: firstNameField.required('Digite seu nome.'),
    otherwise: companyNameField.required('Digite a razão social.')
  }),
  tradingOrLastName: string().when('docType', {
    is: 'CPF',
    then: lastNameField.required('Digite seu sobrenome.'),
    otherwise: tradingNameField.required('Digite o nome.')
  }),
  email: string().email('E-mail inválido.').required('Digite seu e-mail.'),
  password: passwordField.required('Digite sua senha.'),
  confirmPassword: string().equals([ref('password')], 'As senhas não conferem.').required('Confirme a senha.')
})

export default registerProfessional
