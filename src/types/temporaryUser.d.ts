export interface TemporaryUserModel {
  _id?: string
  role?: 'admin' | 'professional' | 'regular'
  subrole?: string
  taxInfo?: 'individual' | 'company'
  businessActivity?: 'real estate'
  email?: {
    value: string
    verified: boolean
  }
  password?: string
  names?: {
    first: string
    last: string
    trading: string // nome fantasia
    company: string // razao social
  }
  docs?: {
    CRECI: {
      value: string
      state: string
      files: string[]
      verified: boolean
    }
    CPF?: {
      value: string
      files: string[]
      verified: boolean
    }
    CNPJ?: {
      value: string
      files: string[]
      verified: boolean
    }
    createdAt?: Date
    updatedAt?: Date
  }
}
