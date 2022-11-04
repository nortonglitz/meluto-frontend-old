import api from 'services/api'

type EmailCodeParams = {
  email: string
  code: string
}

export const validateEmailCode = async (params: EmailCodeParams) => {
  try {
    await api.put('/verifiers/email', params)
    return { error: null }
  } catch (err: any) {
    if (err.response.data) {
      return { error: err.response.data.error }
    } else if (!err.request.data) {
      return { error: 'ConnectionError' }
    } else {
      return { error: 'InternalError' }
    }
  }
}
