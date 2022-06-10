export interface UserModel {
  _id: string
  username: {
    value: string
    updatedAt: Date
  }
  password: {
    updatedAt: Date
  }
  email: {
    value: string
    verified: boolean
    updatedAt: Date
  }
  avatar: string
  names: {
    first: string
    last: string
    trading: string // nome fantasia
    company: string // razao social
    updatedAt: Date
  }
  socialMedias: {
    instagram: string
    youtube: string
    facebook: string
  }
  site: string
  description: string
  telephone: string
  businessActivity: 'real estate'
  whatsapp: string
  role: 'admin' | 'professional' | 'regular'
  birthdate: Date
  subrole: string
  address?: {
    state: string // rj
    city: string // rio de janeiro
    district: string // bairro
    postalCode: string // cep
    thoroughfare: string // rua
    number: string // número
    additionalInfo: string
    updatedAt: Date
  }
  docs: {
    CRECI: {
      value: string
      state: string
      verified: boolean
      updatedAt: Date
    }
    CPF: {
      value: string
      verified: boolean
      updatedAt: Date
    }
    CNPJ: {
      value: string
      verified: boolean
      updatedAt: Date
    }
  }
  verified: {
    value: boolean,
    updatedAt: Date
  }
  blocked: {
    value: boolean
    updatedAt: Date
  }
  createdAt: Date
  updatedAt: Date
}
