import { ValidationError } from 'yup'
import login, { LoginForm } from './schemas/login'
import recoverPassword, { RecoverPasswordForm } from './schemas/recover-password'
import editAllNames, { EditAllNamesForm } from './schemas/editAllNames'
import editUsername, { EditUsernameForm } from './schemas/editUsername'
import editPassword, { EditPasswordForm } from './schemas/editPassword'
import editDescription, { EditDescriptionForm } from './schemas/editDescription'
import registerEmail, { RegisterEmailForm } from './schemas/registerEmail'
import verifyCode, { VerifyCodeForm } from './schemas/verifyCode'
import editName, { EditNameForm } from './schemas/editName'
import editPhone, { EditPhoneForm } from './schemas/editPhone'

const listSchemas = {
  login,
  recoverPassword,
  editAllNames,
  editUsername,
  editPassword,
  editDescription,
  registerEmail,
  editName,
  verifyCode,
  editPhone
}

export type FormName = keyof typeof listSchemas

export type FormValues = EditPasswordForm | LoginForm
| RecoverPasswordForm | EditAllNamesForm | EditUsernameForm |
EditDescriptionForm | RegisterEmailForm | VerifyCodeForm | EditNameForm |
EditPhoneForm

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
