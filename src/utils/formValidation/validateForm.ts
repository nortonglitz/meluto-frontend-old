import { ValidationError } from 'yup'
import testSchema, { FormName, FormValues } from './testSchema'

type ErrorList = {
  item?: string
  message: string
}[]

export interface ErrorInterface {
  formTested: FormName
  errors: ErrorList
}

const formatErrorList = (yupErrors: ValidationError[]) => {
  const errorList: ErrorList = []
  yupErrors.forEach(yupError => {
    const error = {
      item: yupError.path,
      message: yupError.message
    }

    errorList.push(error)
  })

  return errorList
}

const validateForm = async (
  value: Partial<FormValues>,
  formName: FormName
): Promise<ErrorInterface | undefined> => {
  const validationResult = await testSchema(formName, value)
  if (validationResult === true) return
  const errorsList = formatErrorList(validationResult)

  return { formTested: formName, errors: errorsList }
}

export default validateForm
