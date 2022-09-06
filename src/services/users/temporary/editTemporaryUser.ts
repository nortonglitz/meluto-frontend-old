import api from 'services/api'

export const editTemporaryUser = async (temporaryUserId: string, field: string, value: object) => {
  try {
    const res = await api.put(`/users/temporary/${temporaryUserId}/${field}`, value)
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
