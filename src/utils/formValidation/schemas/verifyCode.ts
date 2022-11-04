import { object } from 'yup'
import { verifyCodeField } from '../fields'

export interface VerifyCodeForm {
  code: string
}

const verifyCode = object({
  code: verifyCodeField
})

export default verifyCode
