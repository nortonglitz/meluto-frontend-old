import { ValidationError } from 'yup'
import login, { LoginForm } from './schemas/login'
import registerRegular, { RegisterRegularForm } from './schemas/registerRegular'
import recoverPassword, { RecoverPasswordForm } from './schemas/recover-password'
import registerProfessional, { RegisterProfessionalForm } from './schemas/registerProfessional'
import editAllNames, { EditAllNamesForm } from './schemas/editAllNames'
import editUsername, { EditUsernameForm } from './schemas/editUsername'

const listSchemas = {
  login,
  registerRegular,
  recoverPassword,
  registerProfessional,
  editAllNames,
  editUsername
}

export type FormName = keyof typeof listSchemas

export type FormValues = LoginForm | RegisterRegularForm | RecoverPasswordForm | RegisterProfessionalForm | EditAllNamesForm | EditUsernameForm

const testSchema = async (
  schema: FormName,
  value: Partial<FormValues>
): Promise<true | ValidationError[]> => {
  try {
    const formSchema = listSchemas[schema]

    await formSchema.validate(value, {
      abortEarly: false
    })

    return true
  } catch (err: any) {
    return err.inner
  }
}

export default testSchema
