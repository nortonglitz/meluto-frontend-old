import { ValidationError } from 'yup'
import login, { LoginForm } from './schemas/login'
import register, { RegisterForm } from './schemas/register'
import recoverPassword, { RecoverPasswordForm } from './schemas/recover-password'

const listSchemas = {
  login,
  register,
  recoverPassword
}

export type FormName = keyof typeof listSchemas

export type FormValues = LoginForm | RegisterForm | RecoverPasswordForm

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
