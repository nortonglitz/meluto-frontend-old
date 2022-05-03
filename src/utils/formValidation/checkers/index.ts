import { string } from 'yup'

export const isEmail = async (value: string) => {
  try {
    await string()
      .email()
      .validate(value)
    return true
  } catch {
    return false
  }
}
