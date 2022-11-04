import { string } from 'yup'

export const cpfField = string().length(11, 'CPF inválido.').test(
  'cpf',
  'CPF inválido.',
  value => {
    if (!value) {
      return false
    }
    let firstArray = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    firstArray = firstArray.map((num, i) => num * Number(value.charAt(i)))
    let firstDigit = (firstArray.reduce((prev, next) => prev + next) * 10) % 11
    if (firstDigit === 10) {
      firstDigit = 0
    }
    if (firstDigit !== Number(value.charAt(9))) {
      return false
    }

    let secondArray = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    secondArray = secondArray.map((num, i) => num * Number(value.charAt(i)))
    let secondDigit = (secondArray.reduce((prev, next) => prev + next) * 10) % 11
    if (secondDigit === 10) {
      secondDigit = 0
    }
    if (secondDigit !== Number(value.charAt(10))) {
      return false
    }
    return true
  }
)
export const cnpjField = string().length(14, 'CNPJ inválido.').test(
  'cnpj',
  'CNPJ inválido.',
  value => {
    if (!value) {
      return false
    }
    let firstArray = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    firstArray = firstArray.map((num, i) => num * Number(value.charAt(i)))
    let firstDigit = (firstArray.reduce((prev, next) => prev + next) * 10) % 11
    if (firstDigit === 10) {
      firstDigit = 0
    }
    if (firstDigit !== Number(value.charAt(12))) {
      return false
    }

    let secondArray = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    secondArray = secondArray.map((num, i) => num * Number(value.charAt(i)))
    let secondDigit = (secondArray.reduce((prev, next) => prev + next) * 10) % 11
    if (secondDigit === 10) {
      secondDigit = 0
    }
    if (secondDigit !== Number(value.charAt(13))) {
      return false
    }
    return true
  }
)
export const verifyCodeField = string().matches(/^[\d]{6}$/, 'Código inválido.')
export const creciNumberField = string().matches(/^[\d]{6}$/, 'CRECI inválido.')
export const firstNameField = string()
  .min(3, 'Tamanho mínimo de 3 caracteres.')
  .max(25, 'Tamanho máximo de 25 caracteres.')
  .matches(/^[A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ ]+$/, 'Somente utilize letras.')
export const lastNameField = string()
  .min(3, 'Tamanho mínimo de 3 caracteres.')
  .max(25, 'Tamanho máximo de 25 caracteres.')
  .matches(/^[A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ ]+$/, 'Somente utilize letras.')
export const tradingNameField = string()
  .min(3, 'Tamanho mínimo de 3 caracteres.')
  .max(55, 'Tamanho máximo de 55 caracteres.')
  .matches(/^[A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ0-9 ]+$/, 'Somente utilize letras e números.')
export const companyNameField = string()
  .min(3, 'Tamanho mínimo de 3 caracteres.')
  .max(55, 'Tamanho máximo de 55 caracteres.')
  .matches(/^[A-Za-z0-9 ]+$/, 'Somente utilize letras e números.')
export const usernameField = string()
  .min(3, 'Tamanho mínimo de 3 caracteres.')
  .max(25, 'Tamanho máximo de 25 caracteres.')
  .matches(/^[a-z0-9]+$/, 'Somente utilize letras e números, sem espaços.')
export const descriptionField = string()
  .max(150, 'Tamanho máximo de 150 caracteres.')
  .matches(/^[0-9A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ ]+$/, { excludeEmptyString: true, message: 'Somente utilize letras e números.' })
export const passwordField = string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'A senha precisa ter no mínimo 8 caracteres. Inclua ao menos uma letra maiúscula, uma minúscula, um número e um símbolo (!@#$&*).')
