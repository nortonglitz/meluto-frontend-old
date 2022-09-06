import api from '../api'

export const getLocalByCEP = async (CEP: string) => {
  try {
    const res = await api.get(`/maps/cep/${CEP}`)
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
