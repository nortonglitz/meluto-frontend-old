import api from 'services/api'

export const sendTemporaryUserEmailCode = async (email: string) => {
  try {
    await api.post('/users/temporary/verify/email', {
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
