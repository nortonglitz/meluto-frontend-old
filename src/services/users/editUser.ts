import api from 'services/api'

export const editUser = async (userId: string, field: string, value: object) => {
  try {
    const res = await api.put(`/users/${userId}/${field}`, value)
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
