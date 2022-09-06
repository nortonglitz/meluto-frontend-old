import api from '../../api'
import { TemporaryUserModel } from 'types/temporaryUser'

interface CreateTemporaryUser {
  email: string
  role: string
}

export const createTemporaryUser = async (temporaryUser: CreateTemporaryUser) => {
  try {
    const res = await api.post('/users/temporary', temporaryUser)
    return { temporaryUser: res.data.temporaryUser as TemporaryUserModel }
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
