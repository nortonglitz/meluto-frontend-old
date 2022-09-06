import api from 'services/api'
import { UserModel } from 'types/user'
export const createUserRegular = async (temporaryUserId: string) => {
  try {
    const res = await api.post('/users/regular', { temporaryUserId })
    return { user: res.data.temporaryUser as UserModel }
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
