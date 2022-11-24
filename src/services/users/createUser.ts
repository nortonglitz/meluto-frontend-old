import api from 'services/api'
import { UserModel } from 'types/user'

type CreateUser = {
  password: string
  name: string
}

export const createUser = async (params: CreateUser) => {
  try {
    const res = await api.post('/users', params)
    return { user: res.data.user as UserModel }
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
