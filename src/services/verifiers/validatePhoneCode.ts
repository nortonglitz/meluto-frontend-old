import api from 'services/api'

type PhoneCodeParams = {
  phone: string
  code: string
}

export const validatePhoneCode = async (params: PhoneCodeParams) => {
  try {
    await api.put('/verifiers/phone', params)
    return { error: null }
  } catch (err: any) {
    if (err.response.data) {
      if (err.response.status === 404) {
        return { error: 'InternalError' }
      }
      return { error: err.response.data.error }
    } else if (!err.request.data) {
      return { error: 'ConnectionError' }
    } else {
      return { error: 'InternalError' }
    }
  }
}
