import api from 'services/api'

export const verifyUserEmail = async (email: string, code: string) => {
  try {
    const res = await api.put('/users/verify/email', {
      email,
      code
    })
    return { user: res.data.user }
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
