export interface TemporaryUserModel {
  email: {
    value?: string
    verified?: boolean
  }
  name?: string
  phone: {
    value?: string
    verified?: boolean
  }
}
