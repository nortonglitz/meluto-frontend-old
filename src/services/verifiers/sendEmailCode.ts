import api from 'services/api'

export const sendEmailCode = async (email: string) => {
  try {
    await api.post('/verifiers/email', {
      email
    })
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
