import api from 'services/api'

export const verifyTemporaryUserEmail = async (email: string, code: string) => {
  try {
    const res = await api.put('/users/temporary/verify/email', {
      email,
      code
    })
    return { temporaryUser: res.data.temporaryUser }
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
